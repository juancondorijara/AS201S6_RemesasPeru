let account;
let accountToSend;
let amountToSend;

let amount2;
let gas2;

let commission;
let gas;
let total;


const connectMetamask = async() => {
    if (window.ethereum !== "undefined") {
        const accounts = await ethereum.request({
            method: "eth_requestAccounts"
        });
        account = accounts[0];
        document.getElementById("userArea").innerHTML = `User Account: ${account}`;
    }
}


const connectContract = async() => {
    const ABI = [{
        "inputs": [],
        "name": "deposit",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }, {
        "inputs": [{
            "internalType": "address payable",
            "name": "_to",
            "type": "address"
        }, {
            "internalType": "uint256",
            "name": "_amount",
            "type": "uint256"
        }],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getAddress",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "getBalance",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    }];
    //const Address = "0x8170A5681150230E1c87701c86443ac2Dc5F138c";
    //const Address = "0x00541f62640f9779275AFcFAa56A17e0d22A55c7"; //seguridad
    accountToSend = document.getElementById("addressInput").value;
    const Address = accountToSend;
    window.web3 = await new Web3(window.ethereum);
    window.contract = await new window.web3.eth.Contract(ABI, Address);
    document.getElementById("contractArea").innerHTML = "Connected to Contract";
}


const getContractAccount = async() => {
    const data = await window.contract.methods.getAddress().call();
    document.getElementById("contractAccount").innerHTML = `Contract Account: ${data}`;
}


const getBalanceApple = async() => {
    const data = await window.contract.methods.getBalance().call();
    document.getElementById("balanceArea").innerHTML = `Contract Balance: ${data}`;
}


const depositContract = async() => {
    const amount = document.getElementById("depositInput").value;
    await window.contract.methods.deposit().send({
        from: account,
        value: amount
    });
}


const withdraw = async() => {
    accountToSend = document.getElementById("addressInput").value;
    amountToSend = document.getElementById("amountInput").value;
    const address = accountToSend;
    const amount = amountToSend;
    //var amount = eval(amountToSend * 1000000000000000000 1e18);
    //const amount = document.getElementById("amountInput").value;
    //const address = document.getElementById("addressInput").value;
    await window.contract.methods.withdraw(address, amount).send({
        from: account,
        value: amount * 1e18
    });
}


const sendRemittance = async() => {
    connectMetamask();
    connectContract();
    withdraw();
}


const percentage = async() => {
    const amount = document.getElementById("amountInput").value;
    let amount2 = amount * 1;
    let commission = (amount * 3) / 100;
    let gas = document.getElementById("gasOutput").value;
    let gas2 = gas * 1;
    let total = amount2 + commission + gas2;

    document.getElementById("commissionOutput").innerHTML = `${commission}`;
    document.getElementById("totalOutput").innerHTML = `${total}`;

    console.log('Calculando: ', amount, commission, gas2, total);
}


const percentageSeguridad = async() => {
    const amount = document.getElementById("amountInput").value;
    let amount2 = amount * 1;
    let commission = (amount * 3) / 100;
    let gas = (21000 * 200) / 1e9;
    let total = amount2 + commission + gas;

    document.getElementById("commissionOutput").innerHTML = `${commission}`;
    document.getElementById("gasOutput").innerHTML = `${gas}`;
    document.getElementById("totalOutput").innerHTML = `${total}`;

    console.log('Calculando: ', amount, commission, gas, total);
}