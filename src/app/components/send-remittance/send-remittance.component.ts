import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Web3Service } from 'src/app/services/web3/web3.service';
import AccountWeb3Model from "src/app/model/account.web3.model";
import { PaymentService } from "src/app/services/contract/payment/payment.service";

@Component({
  selector: 'app-send-remittance',
  templateUrl: './send-remittance.component.html',
  styleUrls: ['./send-remittance.component.css']
})
export class SendRemittanceComponent implements OnInit {

  ngOnInit(): void {
  }
  
  account: AccountWeb3Model = new AccountWeb3Model();
  private web3js: any;

  constructor(
    private web3Service: Web3Service,
    private paymentService: PaymentService,
    private router: Router
  ) {
    this.web3Service.isConnected().then(connected => {
      if (!connected) {
        this.web3Service.connectAccount().then(async web3js => {
          this.web3js = web3js;
        })
      }
      this.web3Service.accountsObservable.subscribe(account => {
        this.updateAccountInfo();
      });
    })
  }

  async updateAccountInfo() {
    const accounts = await this.web3js.eth.getAccounts();
    const weiBalance = await this.web3js.eth.getBalance(accounts[0]);
    const ethBalance = Number(this.web3js.utils.fromWei(weiBalance, 'ether'));
    this.account = new AccountWeb3Model().build(accounts[0], ethBalance);
  }

  nuevaTransaccion() {
    //this.paymentService.nuevaTransaccion(this.account.address, "0xc6AC2A10b84173b5ef294b8FC5e21a06237F1a72", 2);
    this.paymentService.nuevaTransaccion(this.account.address, "0x00541f62640f9779275AFcFAa56A17e0d22A55c7", 2);
  }

  callView() {
    this.paymentService.verBalanceCuenta();
  }

  percentage(): void {
    this.account.commission = (this.account.balanceToSend * 3) / 100;
    console.log(this.account.commission);

    this.account.gas = (21000 * 200) / 1000000000;
    console.log(this.account.gas);

    this.account.total = this.account.balanceToSend + this.account.commission + this.account.gas;
    console.log(this.account.total);
  }
  
}
