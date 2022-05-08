const Lottery = artifacts.require("Lottery");
const TLToken = artifacts.require("TLToken");
const TicketNFT = artifacts.require("TicketNFT");

module.exports = function(deployer) {
    deployer.deploy(TLToken).then(function() {
        return deployer.deploy(TicketNFT).then(function () {
            return deployer.deploy(Lottery, TLToken.address, TicketNFT.address);
        });
    });
};