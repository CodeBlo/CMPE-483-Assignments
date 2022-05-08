const TLToken = artifacts.require("TLToken");

contract("TLToken", accounts => {
    it("should put 10^25 TL in the first account", () =>
      TLToken.deployed()
        .then(instance => instance.balanceOf(accounts[0]))
        .then(balance => {
          assert.equal(
            balance.valueOf(),
            10 ** 43,
            "10^25 TL wasn't in the first account"
          );
        })
    );

    it("should total supply be 20^25 TL", () =>
      TLToken.deployed()
        .then(instance => instance.totalSupply())
        .then(balance => {
          assert.equal(
            balance.valueOf(),
            2 * 10 ** 43,
            "20^25 TL wasn't in the first account"
          );
        })
    );
  }
)