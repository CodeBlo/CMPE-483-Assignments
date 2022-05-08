const TLToken = artifacts.require("TLToken");

contract("TLToken", accounts => {
    it("should put 10^25 TL in the first account", () =>
      TLToken.deployed()
        .then(instance => instance.getBalance.call(accounts[0]))
        .then(balance => {
          assert.equal(
            balance.valueOf(),
            10 ** 25,
            "10^25 wasn't in the first account"
          );
        }));
    }
);