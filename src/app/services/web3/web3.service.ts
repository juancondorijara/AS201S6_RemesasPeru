import {Inject, Injectable} from '@angular/core';
import {WEB3} from '../../core/web3';
import {Subject} from 'rxjs';
import Web3 from 'web3';
import AccountWeb3Model from "../../model/account.web3.model";

declare let window: any;

@Injectable({
    providedIn: 'root'
})
export class Web3Service {
    public accountsObservable = new Subject<AccountWeb3Model[]>();
    private accountsLoaded: AccountWeb3Model[] = [];

    private contractsLoaded: Map<string, any> = new Map<string, any>();

    public web3js: any;

    constructor(@Inject(WEB3) public web3: Web3) {
        window.addEventListener('load', () => {
            console.log("Observing accounts!!")
            setInterval(() => this.refreshAccounts(), 100);
        });
    }

    async connectAccount(): Promise<Web3> {
        if (window.ethereum) {
            await window.ethereum.enable().then(() => {
                this.web3js = new Web3(window.ethereum);
            });
        } else if (window.web3) {
            this.web3js = new Web3(window.web3.currentProvider);
        } else {
            alert('No web3? You should consider trying MetaMask!');
        }
        return this.web3js;
    }

    public isConnected(): Promise<Boolean> {
        return new Promise((resolve, reject) => {
            if (this.web3js) {
                resolve(true);
            }
            resolve(false);
        })
    }

    private async refreshAccounts() {
        const accs = await this.web3.eth.getAccounts();

        if (accs.length === 0) {
            console.warn('No account connected');
            return;
        }

        if (this.accountsLoaded.length == 0 || this.accountsLoaded.length !== accs.length || this.accountsLoaded[0].address !== accs[0]) {
            console.log('Observed new accounts!');

            let accountsTmp: AccountWeb3Model[] = [];

            for (let i = 0; i < accs.length; i++) {
                const currentBalance = await this.web3.eth.getBalance(accs[i]);
                accountsTmp.push(new AccountWeb3Model().build(accs[i], Number(currentBalance)));
            }

            this.accountsLoaded = accountsTmp;

            this.accountsObservable.next(this.accountsLoaded);
            console.log(this.accountsLoaded);
        }
    }

    public loadContract(identifier: string, abiContractJson: any): void {
        this.isConnected().then(async connected => {
            if (connected) {
                const netId = await this.web3js.eth.net.getId();
                const deployedNetwork = abiContractJson.networks[netId];
                const contract = new this.web3js.eth.Contract(abiContractJson.abi, deployedNetwork.address);
                contract.setProvider(this.web3js.currentProvider);
                this.contractsLoaded.set(identifier, contract);
            } else {
                console.error('Unable to load contract because it is not connected')
            }
        })

    }

    public getContract(identifier: string): any {
        if (this.contractsLoaded.size < 1) {
            throw Error("No contracts loaded");
        }
        return this.contractsLoaded.get(identifier);
    }

}

