pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TicketNFT is ERC721 {
    uint256 current_token_id;
    constructor() ERC721("Tickets", "TKT") {
        current_token_id = 0;
    }

    function mint(address owner) external returns (uint256) {
        current_token_id += 1;
        _safeMint(owner, current_token_id);
        return current_token_id;
    }
}
