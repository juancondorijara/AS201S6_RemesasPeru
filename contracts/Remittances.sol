// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Remittances {

    //Contract --> Address  -- sendRemittance
    function sendRemittance(address payable _to, uint _amount) external {
        _to.transfer(_amount);
    }

    //Address --> Contract -- deposit
    function deposit() external payable {
    }

    //Contract --> Address  -- withdrawal
    function withdraw(address payable _to, uint _amount) external {
        _to.transfer(_amount);
    }

    function getBalance() external view returns(uint) {
        return address(this).balance;
    }

    function getAddress() external view returns(address) {
        return address(this);
    }

}