﻿using HealthChecks.UI.Client;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Filters;
using Swashbuckle.AspNetCore.Swagger;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using Wallet.API.Swagger;

namespace Wallet
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            Configuration = configuration;
            Environment = environment;
        }

        public IConfiguration Configuration { get; }
        public IHostingEnvironment Environment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(config =>
            {
                if (!Environment.EnvironmentName.StartsWith("test")) {
                    var policy = new AuthorizationPolicyBuilder()
                                     .RequireAuthenticatedUser()
                                     .AddAuthenticationSchemes(new string[] { "Bearer" })
                                     .Build();
                    config.Filters.Add(new AuthorizeFilter(policy));
                }
            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // Authentication
            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
            .AddIdentityServerAuthentication(options =>
            {
                options.Authority = Configuration["InvestCircle:Identity:AuthorityUrl"];
                options.ApiName = Configuration["InvestCircle:Identity:ApiName"];
            });

            // Health checks
            services.AddHealthChecks();

            // Swagger
            services.AddSwaggerExamplesFromAssemblyOf<GetListOfWalletsResponse>();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("Wallet", new Info
                {
                    Title = "Wallet",
                    Version = "v1.0.0",
                    Description = "Wallet Invest Circle API",
                    Contact = new Contact
                    {
                        Name = "Contact",
                        Email = "j.kosciesza@codeandpepper.com",
                        Url = "https://investcircle.org/"
                    }

                });
                c.AddSecurityDefinition("Bearer", new ApiKeyScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\". Remember to include Bearer word before token.",
                    Name = "Authorization",
                    In = "header",
                    Type = "apiKey"
                });
                // https://github.com/domaindrivendev/Swashbuckle.AspNetCore/issues/603
                c.AddSecurityRequirement(new Dictionary<string, IEnumerable<string>>
                {
                    { "Bearer", new string[] { } }
                });
                // c.CustomSchemaIds(x => x.FullName);
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
                c.ExampleFilters();
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            if (Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseHealthChecks("/hc", new HealthCheckOptions()
            {
                Predicate = _ => true,
                ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
            });
            app.UseAuthentication();
            app.UseMvc();
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/Wallet/swagger.json", "Wallet");
            });
        }
    }
}
