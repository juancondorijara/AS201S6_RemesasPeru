export default class AccountWeb3Model {

    address: string;
    balance: number;

    remittanceRecipient!: string;
    remittanceAmount!: number;

    gas!: number;
    commission!: number;
    total!: number;

    constructor() {
        this.address = "0x0000000000000000000000000000000000000000";
        this.balance = 0
    }
    
    build(address: string, balance:number) {
        this.address = address;
        this.balance = balance;
        return this;
    }

}
