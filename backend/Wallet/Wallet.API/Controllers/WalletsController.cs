using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Filters;
using System.Collections.Generic;
using Wallet.API.Swagger;

namespace Wallet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WalletsController : ControllerBase
    {
        // GET api/wallets
        [HttpGet]
        [ProducesResponseType(typeof(List<Models.Wallet>), StatusCodes.Status200OK)]
        [SwaggerResponseExample(StatusCodes.Status200OK, typeof(GetListOfWalletsResponse))]
        public IActionResult GetListOfWallets()
        {
            var wallets = new List<Models.Wallet>
            {
                new Models.Wallet
                {
                    Id = 1,
                    Name = "Private",
                    Balance = 999.95m
                }
            };

            return Ok(wallets);
        }
    }
}
