using Gateway.API.Services;
using Gateway.GraphQL;
using GraphQL;
using GraphQL.Server;
using GraphQL.Server.Ui.Playground;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Gateway
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // CORS
            services.AddCors(options => options.AddPolicy("AllowAllOrigins", builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader()));

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // GraphQL
            services.AddScoped<IDependencyResolver>(s => new FuncDependencyResolver(s.GetRequiredService));
            services.AddScoped<InvestCircleSchema>();
            services.AddGraphQL(o => { o.ExposeExceptions = true; })
               .AddGraphTypes(ServiceLifetime.Scoped);

            // Wallet
            services.AddHttpClient<IWalletService, WalletService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseCors("AllowAllOrigins");
            app.UseGraphQL<InvestCircleSchema>();
            app.UseGraphQLPlayground(new GraphQLPlaygroundOptions());
            app.UseMvc();
        }
    }
}
