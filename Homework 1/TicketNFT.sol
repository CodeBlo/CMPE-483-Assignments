pragma solidity ^0.8.0;

import "./ITicketNFT.sol";

contract TicketNFT is ERC721 {

    mapping (address=>uint256) balances;
    mapping (address=>uint256) tokens;
    mapping (uint256=>address) owners;

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory data) external payable {
        require(owners[_tokenId] != _from, "You are not the owner of the token");
        require(_to == address(0), "0 address is not valid");
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable {
        safeTransferFrom(_from, _to, _tokenId, "");
    }


    function balanceOf(address _owner) external view returns (uint256 balance){
        return balances[_owner];
    }

    function ownerOf(uint256 _tokenId) external view returns (address){
        return owners[_tokenId];
    }
}
