const Lottery = artifacts.require("Lottery");
const TLToken = artifacts.require("TLToken")
const PREFIX = "Returned error: VM Exception while processing transaction: ";

contract("Lottery", accounts => {
    it("should start at lottery no 0", () =>
      Lottery.deployed()
        .then(instance => instance.getLotteryNo(Math.floor(Date.now() / 1000)))
        .then(lotteryNo => {
          assert.equal(
            lotteryNo.valueOf(),
            0,
            "Lottery no is not 0"
          );
        })
    );

    it("should deposit 10 TL", () => {
      let tlTokenInstance;
      let lotteryInstance;
      let account = accounts[0];
      TLToken.deployed()
        .then(instance => tlTokenInstance = instance);
      
      Lottery.deployed()
        .then(instance => {
          lotteryInstance = instance;
          tlTokenInstance.approve(lotteryInstance.address, 10 ** 10, { from: account })
        })
        .then(() => lotteryInstance.depositTL(10 ** 9))
        .then(() => tlTokenInstance.balanceOf(lotteryInstance.address))
        .then(balance => {
          assert.equal(
            balance.valueOf(),
            10 ** 9,
            "TL is not deposited"
          )
        });
    });

    it("should throw insufficient funds", () => {
      let tlTokenInstance;
      let lotteryInstance;
      let account = accounts[1];
      TLToken.deployed()
        .then(instance => tlTokenInstance = instance);
      
      Lottery.deployed()
        .then(instance => {
          lotteryInstance = instance;
          tlTokenInstance.approve(lotteryInstance.address, 10, { from: account })
        })
        .then(() => {
          lotteryInstance.depositTL(1000, {from: account});  
          // try {
          //   lotteryInstance.depositTL(1000);  
          // } catch (error) {
          //   //assert(error, "Expected an error but did not get one");
          //   assert(error.message.startsWith("asdhjghjgadshjgasdhgjadshj"), "resutl" + error.message )
          // }
        })
    });


    

    // it("should not calcuate total money at the beginning", ()=> {
    //   let lotteryInstance;
    //   Lottery.deployed()
    //     .then(instance => {
    //       lotteryInstance = instance;
    //     })
    //     .then(() => {
    //       try {
    //         lotteryInstance.getTotalLotteryMoneyCollected(0);
    //         assert.fail("The transaction should have thrown an error");
    //       }
    //       catch (err) {
    //         assert.include(err.message, "not finished", "The error message should contain 'error' sdgsdg " + err.message );
    //       }
    //     })
      
    // });


    it("should bought tickket", () => {
      let tlTokenInstance;
      let lotteryInstance;
      let account = accounts[0];
      TLToken.deployed()
        .then(instance => tlTokenInstance = instance);
      
      Lottery.deployed()
        .then(instance => {
          lotteryInstance = instance;
        })
        .then(() => lotteryInstance.depositTL(10 ** 10))
        .then(() => lotteryInstance.buyTicket(getHash(25)))
        .then(() => assert.equal(lotteryInstance.getLastOwnedTicketNo(0), 1));
    });
    

    
  
});