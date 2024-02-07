// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

/// @title un simulador de Envío de Remesas
/// @author Juan Condori :D
/// @notice puede usar este contrato solo para la simulación de envío de remesas

contract RemesasPeru {
    
    function sendRemittance(address payable _remittanceRecipient, uint256 _remittanceAmount) public payable {        
        _remittanceRecipient.transfer(_remittanceAmount);
    }

}

