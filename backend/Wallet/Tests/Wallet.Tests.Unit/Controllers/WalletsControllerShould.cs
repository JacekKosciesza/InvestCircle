using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Wallet.Controllers;
using Xunit;

namespace Wallet.Tests.Unit.Controllers.Acceptance
{
    public class WalletsControllerShould
    {
        [Fact]
        public void ReturnListOfWallets()
        {
            // Arrange
            var controller = new WalletsController();

            // Act
            var response = controller.GetListOfWallets();

            // Assert
            var okResult = response as OkObjectResult;
            Assert.NotNull(okResult);
            Assert.Equal(200, okResult.StatusCode);
            var wallets = okResult.Value as List<Models.Wallet>;
            Assert.Single(wallets);
            Assert.Collection(wallets, wallet => Assert.Equal(999.95m, wallet.Balance));
        }
    }
}
