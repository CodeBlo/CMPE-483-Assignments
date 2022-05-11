const Lottery = artifacts.require("Lottery");
const TLToken = artifacts.require("TLToken");
const TicketNFT = artifacts.require("TicketNFT");
const crypto = require("crypto")
const timeMachine = require('ganache-time-traveler');

const getTl = (tlAmount) => "1" + "0".repeat(18 + tlAmount)
const week = 604800;
const day = 86400;
const minutes = 60;


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
      let lotteryInstance;;
      
      return Lottery.deployed()
        .then(instance => lotteryInstance = instance)
        .then(() => TLToken.deployed().then(instance => tlTokenInstance = instance)
        .then(() => tlTokenInstance.approve(lotteryInstance.address, getTl(2))))
        .then(() => lotteryInstance.depositTL(getTl(2)))
        .then(() => tlTokenInstance.balanceOf(lotteryInstance.address))
        .then(balance => {
          assert.equal(
            balance.valueOf(),
            getTl(2),
            "TL is not deposited"
          )
        });
    });

    it("should throw insufficient funds when buying", () => {
      let account = accounts[1];
      
      return Lottery.deployed()
        .then(instance =>  instance.buyTicket("0xca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb", {from: account}))
        .then(assert.fail)
        .catch(error => {
          assert.include(
            error.message,
            "Insufficient funds",
            "Does not throw insufficient"
          )
        })
        
    });


    it("should not calcuate total money at the beginning", ()=> {
      let lotteryInstance;
      return Lottery.deployed()
        .then(instance => {
          lotteryInstance = instance;
        })
        .then(() => lotteryInstance.getTotalLotteryMoneyCollected(0))
        .catch((err) => {
          assert.include(err.message, "not finished", "The error message should contain 'error' sdgsdg " + err.message );
        });
      
    });


    it("Should bought ticket", () => {
      let tlTokenInstance;
      let lotteryInstance;
      
      return Lottery.deployed()
        .then(instance => lotteryInstance = instance)
        .then(() => TLToken.deployed().then(instance => tlTokenInstance = instance))
        .then(() => lotteryInstance.getHash(25))
        .then((hash) => lotteryInstance.buyTicket(hash))
        .then(() => lotteryInstance.getLastOwnedTicketNo(0))
        .then((ticket) => assert.equal(ticket[0], 1));
    });


    it("Should not reveal ticket in purchase", () => {
      let tlTokenInstance;
      let lotteryInstance;
      
      return Lottery.deployed()
        .then(instance => lotteryInstance = instance)
        .then(() => TLToken.deployed().then(instance => tlTokenInstance = instance))
        .then(() => lotteryInstance.getLastOwnedTicketNo(0))
        .then((ticketNo) => lotteryInstance.revealRndNumber(ticketNo[0], 25))
        .catch(err => {
          assert.include(
            err.message,
            "Not in reveal state"
          )
        });
    });

    it("Should buy tickets for each accounts", async () => {
      let tlTokenInstance;
      await Lottery.deployed()
      .then(instance => lotteryInstance = instance)
      .then(() => TLToken.deployed().then(instance => tlTokenInstance = instance));

      for(let i = 1; i < accounts.length; i++) {
        let account = accounts[i];
        await tlTokenInstance
                .transfer(account, getTl(1))
                .then(() => tlTokenInstance.approve(lotteryInstance.address, getTl(1), {from: account}))
                .then(() => lotteryInstance.depositTL(getTl(1), {from: account}))
                .then(() => lotteryInstance.getHash(25, {from: account}))
                .then((hash) => lotteryInstance.buyTicket(hash, {from: account}));
      }

      return lotteryInstance.getLastOwnedTicketNo(0, {from: accounts[accounts.length-1]})
        .then((ticket) => assert.equal(ticket[0], 10));
    })
    

    it("Should reveal tickets", async () => {
      await timeMachine.advanceTime(5 * day)
      await timeMachine.advanceBlock()
      await Lottery.deployed()
      .then(instance => lotteryInstance = instance);

      for(let i = 0; i < accounts.length; i++) {
        let account = accounts[i];
        await lotteryInstance.getLastOwnedTicketNo(0, {from: account})
                .then((ticketNo) => lotteryInstance.revealRndNumber(ticketNo[0], 25, {from: account}));
      }
    })

    it("Should total lottary prize be account length * 10", async () => {
      await timeMachine.advanceTime(3 * day)
      await timeMachine.advanceBlock()
      return Lottery.deployed()
      .then(instance => instance.getTotalLotteryMoneyCollected(0))
      .then(totalMoney => assert.equal(totalMoney.valueOf(), ));

      
    })

    it("Should collect prize", async () => {
      let tlTokenInstance;

      await Lottery.deployed()
      .then(instance => lotteryInstance = instance)
      .then(() => TLToken.deployed().then(instance => tlTokenInstance = instance));

      for(let i = 0; i < accounts.length; i++) {
        let account = accounts[i];
        let oldBalance;
        await tlTokenInstance.balanceOf(account)
                .then(balance => oldBalance = balance)
                .then(() => lotteryInstance.getLastOwnedTicketNo(0, {from: account}))
                .then((ticketNo) => lotteryInstance.collectTicketPrize(ticketNo[0], {from: account}))
                .then(() => tlTokenInstance.balanceOf(account))
                .then(balance => {
                    assert.isAbove(
                      balance,
                      oldBalance,
                      "Should collect ticket prize"
                    )
                })
                ;
      }
    })
    
  
});