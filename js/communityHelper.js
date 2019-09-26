import {communityConfig} from './communityConfig.js';
var communityHelper = (function() {

	let wallet
	let contract
	const provider = ethers.getDefaultProvider();
	let client;

	function createWallet() {
		wallet = ethers.Wallet.createRandom();
	}

	async function getEncryptedWallet(password) {
		if (!wallet) return;
		let encryptedWallet = await wallet.encrypt(password);
		return encryptedWallet;		
	}
	
	async function loadWallet(encryptedWallet, password) {
		wallet = await ethers.Wallet.fromEncryptedJson(encryptedWallet, password);
		wallet.connect(provider)
		contract = new ethers.Contract(communityConfig.communityAddress, communityConfig.abi, wallet);
	}

	function getWalletInfo() {
		return {
			address: wallet.address,
			privateKey: wallet.privateKey
		}
	}
	
	function clientConnect() {
		if (!wallet) return;
		client = new StreamrClient({
			auth: {
				privateKey: wallet.privateKey,
			}
		})
	}

	function join() {		
		if (!wallet) return;
		if (!client) clientConnect();
		client.joinCommunity(communityConfig.communityAddress, wallet.address, communityConfig.secret)
	}

	function part() {
		if (!wallet) return;
		if (!client) clientConnect();
		//client.partCommunity(communityConfig.communityAddress, wallet.address, communityConfig.secret)
	}

	function getBalance() {
		if (!wallet || !provider) return;
		let streamrContract = new ethers.Contract(communityConfig.streamrAddress, communityConfig.abi, provider);
		return streamrContract.balanceOf(wallet.address);
	}

	async function getAvailableBalance() {
		if (!client) clientConnect();
		const stats = await client.memberStats(communityConfig.communityAddress, wallet.address);
		return stats.withdrawableEarnings;
	}

	function withdrawEarnings() {
		if (!wallet) return;
		if (!client) clientConnect();
		client.withdraw(communityConfig.communityAddress, wallet.address, wallet)
		return withrawEarningsFor(wallet.address)
	}

	function withdrawEarningsFor(recipient) {
		if (!contract) return;

		const member = await client.memberStats(communityConfig.communityAddress, recipient);
		if (member.withdrawableEarnings < 1) {
			throw new Error("Nothing to withdraw")
		}

		return contract.withdrawAll(
			member.withdrawableBlockNumber,
			member.withdrawableEarnings,
			member.proof
		).then(tx => tx.wait(1))
	}

	return {
		createWallet,
        loadWallet,
		getEncryptedWallet,
		join,
		part,
		withdrawEarnings,
		withdrawEarningsFor,
		getWalletInfo,
		getBalance
    };
}())


export {communityHelper};
