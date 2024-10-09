import { Inject, Injectable } from '@angular/core';
import { Web3Service } from 'src/app/service/web3/web3.service';
import Web3 from 'web3';
import {WEB3} from 'src/app/core/web3';
import * as RemesasPeruJson from "src/app/abi/RemesasPeru.json";

declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class RemittanceService {

  abiRemesasPeru: any = (RemesasPeruJson as any).default;
  web3js: any;

  constructor(@Inject(WEB3) public web3: Web3, private web3Service: Web3Service) {
    this.web3Service.isConnected().then(connected => {
      if (!connected) {
        this.web3Service.connectAccount().then(web3js => {
          this.web3js = web3js;
        });
      }
    })
  }

  async sendRemittance(addressFrom: string, addressTo: string, ammount: number): Promise<any> {
    window.web3 = new Web3(window.ethereum);
    window.contract = new window.web3.eth.Contract(this.abiRemesasPeru, addressTo);
    await window.contract.methods.sendRemittance(addressTo, ammount).send({
      from: addressFrom,
      value: ammount * 1e18
    });
  };



}
