export default class AccountWeb3Model {

    address: string;
    balance: number;

    addressToSend: string | undefined;
    balanceToSend: number | undefined;

    gas: number | undefined;
    commission: number | undefined;
    total: number | undefined;

    constructor() {
        this.address = "0x0000000000000000000000000000000000000000",
        this.balance = 0
    }
    
    build(address: string, balance:number) { //, addressToSend: string, balanceToSend:number
        this.address = address;
        this.balance = balance;
        //this.addressToSend = addressToSend;
        //this.balanceToSend = balanceToSend;
        return this;
    }

}
