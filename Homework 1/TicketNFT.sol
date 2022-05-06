pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TicketNFT is ERC721 {
    constructor() ERC721("Tickets", "TKT") {
    }

     function mint(address owner, uint256 tokenId) external {
        _safeMint(owner, tokenId);
    }
}
