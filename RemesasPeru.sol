// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/// @title un simulador de Envío de Remesas
/// @author Juan Condori :D
/// @author Jhianpol Ramos :D
/// @author Victor Ramos :D
/// @notice puede usar este contrato solo para la simulación de envío de una o multiples remesas

contract MultipleRemesa {
    address private owner;
    
    modifier isOwner() {
        require(msg.sender == owner, "No estas autorizado");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function multipleRemesa(address payable[] memory addresses, uint256[] memory amounts) public payable isOwner {
        require(addresses.length == amounts.length, "La longitud de los dos arrays debe ser iguales");

        uint256 totalAmounts = 0;
        
        for(uint256 i=0; i < amounts.length; i++) {
            totalAmounts += amounts[i] * 1 wei;
        }

        require(totalAmounts == msg.value, "El valor no coincide");

        for(uint256 i=0; i < addresses.length; i++) {
            uint256 receiverAmount = amounts[i] * 1 wei;

            addresses[i].transfer(receiverAmount);
        }
    }
}