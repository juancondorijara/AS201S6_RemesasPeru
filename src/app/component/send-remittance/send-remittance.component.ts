import { Component, OnInit, Inject } from '@angular/core';
import { Web3Service } from 'src/app/service/web3/web3.service';
import AccountWeb3Model from "src/app/model/account.web3.model";
import { RemittanceService } from "src/app/service/contract/remittance/remittance.service";
import Web3 from 'web3';
import {WEB3} from 'src/app/core/web3';

declare let window: any;

@Component({
  selector: 'app-send-remittance',
  templateUrl: './send-remittance.component.html',
  styleUrls: ['./send-remittance.component.css']
})
export class SendRemittanceComponent implements OnInit {

  ngOnInit(): void {
    this.web3Service.refreshAccounts();
  }

  account: AccountWeb3Model = new AccountWeb3Model();
  private web3js: any;

  constructor(
    private web3Service: Web3Service,
    private remittanceService: RemittanceService,
    @Inject(WEB3) public web3: Web3
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
  
  percentage(): void {
    this.account.commission = (this.account.remittanceAmount * 3) / 100;
    console.log(this.account.commission);

    this.account.gas = 0.00048123; //(21000 * 200) / 1000000000
    console.log(this.account.gas);

    this.account.total = this.account.remittanceAmount + this.account.commission + this.account.gas;
    console.log(this.account.total);
  }

  sendRemittance(): void{
    this.remittanceService.sendRemittance(this.account.address, this.account.remittanceRecipient, this.account.remittanceAmount);
    console.log(this.account.address);
    console.log(this.account.remittanceRecipient);
    console.log(this.account.remittanceAmount);
    this.cleanData();
  }

  cleanData(): void{
    this.account.remittanceRecipient='';
    this.account.remittanceAmount=0;
    this.account.commission=0;
    this.account.gas=0;
    this.account.total=0;
  }

}
