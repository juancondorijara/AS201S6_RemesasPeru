import { Injectable } from '@angular/core';
import { Web3Service } from "../../web3/web3.service";

import * as paymentJson from "../../../abi/Payment.json";

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    abiPayment: any = (paymentJson as any).default;
    web3js: any;

    constructor(private web3Service: Web3Service) {
        this.web3Service.isConnected().then(connected => {
            if (!connected) {
                this.web3Service.connectAccount().then(web3js => {
                    this.web3Service.loadContract('payment', this.abiPayment);
                    this.web3js = web3js;
                });
            }
        })
    }

    public nuevaTransaccion(addressFrom: string, addressTo: string, ammount: number): boolean {
        let bigNumber = this.web3Service.web3.utils.toBN(ammount);
        return this.web3Service.getContract('payment')
            .methods.nuevaTransaccion(addressTo).send({
                from: addressFrom,
                value: this.web3Service.web3.utils.toWei(bigNumber, 'ether'),
                gasPrice: '21000000000'
            })
            // .on('error', (error: any) => {
            //     console.error('OnError: ', error)
            // })
            // .on('transactionHash', (transactionHash: any) => {
            //     console.error('OnTransactionHash: ', transactionHash)
            // })
            // .on('confirmation', (confirmation: any) => {
            //     console.log('OnConfirmation: ', confirmation);
            // })
            .then((result: any) => {
                console.log('Then result:', result);
            }).catch((error: any) => console.log(error.message));
    }

    public verBalanceCuenta(): any {
        return this.web3Service.getContract('payment')
            .methods.verBalanceCuenta().call().then((result: any) => {
                console.log('result view:', result);
            })
    }

}
