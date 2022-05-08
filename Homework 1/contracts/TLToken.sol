// https://eips.ethereum.org/EIPS/eip-20
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TLToken is ERC20 {
    constructor() ERC20("Turkish Lira", "TL") {
        _mint(address(this), 10 ** (decimals()+25));
        _mint(msg.sender, 10 ** (decimals()+25));
        _mint(address(0xb06Bba1c1a1c5D402A96287Cf7ae7853Bb5A7E60), 10 ** (decimals()+25));
    }
}