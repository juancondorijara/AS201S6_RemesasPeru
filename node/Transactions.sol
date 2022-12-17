//SPDX-License-Identifier:  MIT
pragma solidity >=0.8.0;

contract Transactions {

    address private owner;

    modifier isOwner() {
        require(msg.sender == owner, "No estas autorizado");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function withdraw(address payable _to, uint _amount) external isOwner {
        _to.transfer(_amount);
    }

    function deposit() external payable {
    }

    function getBalance() external view returns(uint) {
        return address(this).balance;
    }

    function getAddress() external view returns(address) {
        return address(this);
    }

}