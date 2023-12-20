const contractAddress = "0x4B0233BE781380Ed94204337EE5F261ba854bD54";
const abi = [
	{
		"inputs": [],
		"name": "enter",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "pickWinner",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_manager",
				"type": "address"
			}
		],
		"name": "setmanager",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getParticipants",
		"outputs": [
			{
				"internalType": "address payable[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getWinnerInfo",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "lotteryHistory",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lotteryId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "manager",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "Owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "participants",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "participantsHistory",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winner",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "winnings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
let contract;
let web3;
let accounts;
 
window.addEventListener('load', async () => {
    if(window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
            initApp();
        } catch (error) {
            console.error("Access to your Ethereum account rejected.");
        }
    } 
	else {
        console.error("Please install MetaMask!");
		alert("Please Install metamask");
    }
});
 
function initApp() {
    contract = new web3.eth.Contract(abi, contractAddress);
    document.getElementById('connectWallet').addEventListener('click', async () => {
        accounts = await web3.eth.getAccounts();
		manageraddress = await contract.methods.manager().call();
        document.getElementById('connectWallet').innerText = 'Connected';
            if (accounts && accounts.length > 0) {
                const truncatedAddress = `${accounts[0].slice(0, 5)}...${accounts[0].slice(-5)}`;
                document.getElementById('connectWallet').innerText = `Connected (${truncatedAddress})`;
                document.getElementById('connectWallet').disabled = true;
		
        
            console.log('Wallet Connected',accounts[0]);
            console.log("First 5 characters:", accounts[0].slice(0, 5));
            console.log("Last 5 characters:", accounts[0].slice(-5));
		alert("Wallet Connected");
		
    }});


    document.getElementById('enterLottery').addEventListener('click', () => {
        contract.methods.enter().send({ from: accounts[0], value: web3.utils.toWei("0.01", "ether") })
        .then(() => console.log("Entered the lottery!"))
        .catch(console.error);
		alert("Lottery Entered, click CONFIRM");
    });
 

    document.getElementById('pickWinner').addEventListener('click', () => {
      let tx1 = contract.methods.getParticipants().call();
	  let tx2 = tx1.length;
	  let tx3 = tx2*10**16;
      contract.methods.pickWinner().send({ from: accounts[0], value: tx3})
        .then(() => console.log("Winner picked!"))
        .catch(console.error);
		alert("Winner Picked");
    });


     // Fetch and display participants
	 contract.methods.getParticipants().call()
	 .then(displayParticipants)
	 .catch(console.error);

}
  

   function displayParticipants(participants) {
    const participantsList = document.getElementById('participantsList');
    participantsList.innerHTML = participants.map(address => `<li>${address}</li>`).join('');}


async function test(){
  let aa = await contract.methods.getParticipants().call();
let bb= aa.length;
let cc = tx2*10**16;
  alert(aa);
  alert(bb);
  alert(cc);
}

async function randomWinner(){
	let tx1 = await contract.methods.getParticipants().call();
	  let tx2 = tx1.length;
	  let tx3 = tx2*10**16;	
	contract.methods.pickWinner().send({ from: accounts[0], value: tx3})
        .then(() => console.log("Winner picked!"))
        .catch(console.error);
		alert("Winner Picked");
}
