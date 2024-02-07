import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Web3Service } from 'src/app/service/web3/web3.service';
import AccountWeb3Model from "src/app/model/account.web3.model";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  ngOnInit(): void {
    this.web3Service.refreshAccounts();
  }
  
  account: AccountWeb3Model = new AccountWeb3Model();
  private web3js: any;

  constructor(
    private web3Service: Web3Service,
    private router: Router
    ) 
    {
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

  goSendRemittance() {
    this.router.navigate(['/send-remittance']).then();
  }

}
