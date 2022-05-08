// https://eips.ethereum.org/EIPS/eip-20
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TLToken is ERC20 {
    constructor() ERC20("Turkish Lira", "TL") {
        _mint(address(this), 10 ** (decimals()+25));
        _mint(msg.sender, 10 ** (decimals()+25));
    }
}