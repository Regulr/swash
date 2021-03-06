import {configManager} from './configManager.js';

let communityHelper = (function() {

	let wallet;
	let communityConfig;
	let timestamp = 0;
	let lastUpdate = 0;
	
	function init() {
		communityConfig = configManager.getConfig('community');	
	}
	
	const provider = ethers.getDefaultProvider();
	let client;
	const overrides = {};

	function etherjsErrorMapping(error) {
		if(error.indexOf('insufficient funds') >= 0)
			return "Insufficient ETH to pay for the gas fee";
		return error;
	}
	
	function createWallet() {
		wallet = ethers.Wallet.createRandom();
		return wallet;
	}

	async function getEncryptedWallet(password) {
		if (!wallet) return {error: "Wallet is not provided"};
		let options = {
		  scrypt: {
			N: (1 << 10)
		  }
		};
		return await wallet.encrypt(password, options);
	}

	async function loadWallet(encryptedWallet, password) {
		wallet = await ethers.Wallet.fromEncryptedJson(encryptedWallet, password);
		wallet = wallet.connect(provider);
	}

	async function decryptWallet(encryptedWallet, password) {
		wallet = await ethers.Wallet.fromEncryptedJson(encryptedWallet, password);
		return {
			address: wallet.address,
			privateKey: wallet.privateKey
		}
	}

	function getWalletInfo() {
		return {
			address: wallet.address,
			privateKey: wallet.privateKey
		}
	}

	function getStreamrClient() {
		if (!client) clientConnect();
		return client
	}

	function clientConnect() {
		if (!wallet) return;
		client = new StreamrClient({
			auth: {
				privateKey: wallet.privateKey,
			},
			publishWithSignature: 'never'
		});
	}

	async function getEthBalance(address) {
		if (!provider) return {error: "provider is not provided"};;
		let balance = await provider.getBalance(address);
		return ethers.utils.formatEther(balance);
	}

	// In UI: "current DATA balance in your wallet", your DATA + withdrawn tokens
	async function getDataBalance(address) {
		if (!provider) return {error: "provider is not provided"};;
		const datacoin = new ethers.Contract(communityConfig.datacoinAddress, communityConfig.datacoinAbi, provider);
		const balance = await datacoin.balanceOf(address);
		return ethers.utils.formatEther(balance);
	}

	// In UI: "current DATA balance in the community", latest and biggest known figure, some of it is not recorded yet
	// Balance = Earnings - Withdrawn
	async function getCommunityBalance() {
		if (!wallet) return {error: "Wallet is not provided"};;
		if (!client) clientConnect();
		const stats = await client.getMemberStats(communityConfig.communityAddress, wallet.address);
		if(stats.error) return {error: "Member status error"};
		const contract = new ethers.Contract(communityConfig.communityAddress, communityConfig.communityAbi, provider);
		const withdrawnBN = await contract.withdrawn(wallet.address);
		const earningsBN = ethers.BigNumber.from(stats.earnings);
		const balanceBN = earningsBN.sub(withdrawnBN);
		return ethers.utils.formatEther(balanceBN);
	}

	// In UI: "current DATA balance in the community", actually withdrawable number, what you get if you withdraw now
	async function getAvailableBalance() {
		if (!wallet) return {error: "Wallet is not provided"};
		if (!client) clientConnect();
		const stats = await client.getMemberStats(communityConfig.communityAddress, wallet.address);
		if(stats.error) return {error: "Member status error"};
		const contract = new ethers.Contract(communityConfig.communityAddress, communityConfig.communityAbi, provider);
		const withdrawnBN = await contract.withdrawn(wallet.address);
		const earningsBN = ethers.BigNumber.from(stats.withdrawableEarnings);
		const unwithdrawnEarningsBN = earningsBN.sub(withdrawnBN);
		return ethers.utils.formatEther(unwithdrawnEarningsBN);
	}

	// In UI: "lifetime DATA earnings in the community", latest and biggest known figure, some of it is not recorded yet
	async function getCumulativeEarnings() {
		if (!wallet) return {error: "Wallet is not provided"};
		if (!client) clientConnect();
		const stats = await client.getMemberStats(communityConfig.communityAddress, wallet.address);
		if(stats.error) return {error: "Member status error"};
		return ethers.utils.formatEther(stats.earnings);
	}

	// on-chain balance + available balance
	async function getTotalBalance() {
		if (!wallet) return {error: "Wallet is not provided"};
		let balance = ethers.utils.parseEther(await getDataBalance(wallet.address));
		let aBalance = ethers.utils.parseEther(await getAvailableBalance());
		return ethers.utils.formatEther(balance.add(aBalance));
	}

	async function withdrawEarnings() {
		return withdrawEarningsFor(wallet.address);
	}

	// Click Transfer button in Wallet
	async function withdrawAllTo(targetAddress) {
		if (!wallet || !provider) return {error: "Wallet is not provided"};
		if (!client) clientConnect();

		const member = await client.getMemberStats(communityConfig.communityAddress, wallet.address);
		if (member.error || member.withdrawableEarnings < 1) {
			return {error: "Nothing to withdraw"};
		}
		wallet = wallet.connect(provider);
		const contract = new ethers.Contract(communityConfig.communityAddress, communityConfig.communityAbi, wallet);
		try {
			let resp = await contract.withdrawAllTo(
				targetAddress,
				member.withdrawableBlockNumber,
				member.withdrawableEarnings,
				member.proof,
				overrides
			);
			return resp;
		}
		catch(err) {
			return {error: etherjsErrorMapping(err.reason)};
		}
	}

	// Click Transfer button in Wallet with specified amount
	async function withdrawTo(targetAddress, amount) {
		// TODO check with ebi
		if (!wallet || !provider) return {error: "Wallet is not provided"};;
		if (!client) clientConnect();
		let memberAddress = wallet.address;
		const amountBN = ethers.BigNumber.from(ethers.utils.parseEther(amount));

		wallet = wallet.connect(provider);
		const contract = new ethers.Contract(communityConfig.communityAddress, communityConfig.communityAbi, wallet);
		const withdrawn = await contract.withdrawn(memberAddress)

		const member = await client.getMemberStats(communityConfig.communityAddress, memberAddress);
		if (member.error || member.withdrawableEarnings < 1) {			
			return {error: "Nothing to withdraw"};
		}
		if (ethers.BigNumber.from(member.withdrawableEarnings).sub(withdrawn).lt(amountBN)){
			return {error: "Insufficient balance"};
		}

		// have we proven enough earnings previously?
		try {
			const provenEarnings = await contract.earnings(memberAddress)		
			if (provenEarnings.sub(withdrawn).lt(amountBN)) {
				// function prove(uint blockNumber, address account, uint balance, bytes32[] memory proof)

				await contract.prove(
					member.withdrawableBlockNumber,
					memberAddress,
					member.withdrawableEarnings,
					member.proof,
					overrides
				)								
			}

			let resp = await contract.withdrawTo(
				targetAddress,				
				amountBN,
				overrides
			);
			return resp;
		}
		catch(err) {
			return {error: etherjsErrorMapping(err.reason)};
		}
	}

	async function withdrawEarningsFor(memberAddress) {
		if (!wallet || !provider) return {error: "Wallet is not provided"};
		if (!client) clientConnect();

		const member = await client.getMemberStats(communityConfig.communityAddress, memberAddress);
		if (member.error || member.withdrawableEarnings < 1) {
			return {error: "Nothing  to withdraw"};
		}
		wallet = wallet.connect(provider);
		const contract = new ethers.Contract(communityConfig.communityAddress, communityConfig.communityAbi, wallet);
		try {
			let resp = await contract.withdrawAllFor(
				memberAddress,
				member.withdrawableBlockNumber,
				member.withdrawableEarnings,
				member.proof,
				overrides
			);
			return resp;
		}
		catch(err) {
			return {error: etherjsErrorMapping(err.reason)};
		}
	}

	async function getWithdrawAllToTransactionFee(targetAddress) {
		try {
			if (!wallet || !provider) return 0;
			if (!client) clientConnect();
			wallet = wallet.connect(provider);

			const member = await client.getMemberStats(communityConfig.communityAddress, wallet.address);
			if (member.error || member.withdrawableEarnings < 1) return 0;
			const contract = new ethers.Contract(communityConfig.communityAddress, communityConfig.communityAbi, wallet);

			const gasPrice = await provider.getGasPrice();
			const estimatedGas = await contract.estimateGas.withdrawAllTo(
				targetAddress,
				member.withdrawableBlockNumber,
				member.withdrawableEarnings,
				member.proof,
				overrides
			);
			return ethers.utils.formatEther(estimatedGas.mul(gasPrice));
		}
		catch(err) {
			return 0;
		}
	}

	async function getSignCheckForSponsorWithdraw(targetAddress) {
		if (!wallet || !provider) throw Error("Wallet is not provided");
		if (!client) clientConnect();
		wallet = wallet.connect(provider);
		const contract = new ethers.Contract(communityConfig.communityAddress, communityConfig.communityAbi, wallet);
		const withdrawn = await contract.withdrawn(wallet.address)
		const memberStats = await client.getMemberStats(communityConfig.communityAddress, wallet.address);
		if (memberStats.error || memberStats.withdrawableEarnings < 1) {
			throw Error("Nothing  to withdraw");
		}
		const withdrawnHexString = ethers.utils.hexZeroPad(withdrawn.toHexString(), 32).slice(2).toString()
		const message = targetAddress + "0".repeat(64) + communityConfig.communityAddress.slice(2) + withdrawnHexString

		const hashData = ethers.utils.arrayify(message);
		return await wallet.signMessage(hashData);
	}

	async function getSponsoredWithdrawTransactionFee(targetAddress) {
		try {
			if (!wallet || !provider) return 0;
			if (!client) clientConnect();
			wallet = wallet.connect(provider);
			const memberAddress = wallet.address;

			const contract = new ethers.Contract(communityConfig.communityAddress, communityConfig.communityAbi, wallet);
			const withdrawn = await contract.withdrawn(memberAddress)
			const memberStats = await client.getMemberStats(communityConfig.communityAddress, memberAddress);
			if (memberStats.error || memberStats.withdrawableBlockNumber == null) {
				return 0;
			}
			const withdrawnHexString = ethers.utils.hexZeroPad(withdrawn.toHexString(), 32).slice(2).toString()
			const message = targetAddress + "0".repeat(64) + communityConfig.communityAddress.slice(2) + withdrawnHexString

			const hashData = ethers.utils.arrayify(message);
			const signature = await wallet.signMessage(hashData)

			const gasPrice = await provider.getGasPrice();
			const estimatedGas = await contract.estimateGas.withdrawAllToSigned(targetAddress, memberAddress, signature, memberStats.withdrawableBlockNumber, memberStats.withdrawableEarnings, memberStats.proof);
			return ethers.utils.formatEther(estimatedGas.mul(gasPrice));
		}
		catch (err) {
			return 0;
		}
	}

	async function updateTimestamp() {
		if (lastUpdate === 0 || lastUpdate + communityConfig.tokenExpiration < Date.now()) {
			const resp = await fetch('https://swashapp.io/api/v1/sync/timestamp', {method: 'GET'})
			if (resp.status === 200) {
				timestamp = (await resp.json()).timestamp
				lastUpdate = Date.now()
			} else {
				throw Error("Could not update timestamp")
			}
		}
	}

	async function generateJWT() {
		try {
			await updateTimestamp();
			const payload = {
				address: wallet.address,
				publicKey: ethers.utils.computePublicKey(wallet.publicKey, true),
				timestamp: timestamp
			}
			return new jsontokens.TokenSigner('ES256K', wallet.privateKey.slice(2)).sign(payload);
		} catch (err) {
			console.log(err)
		}
	}

	return {
		init,
		createWallet,
        loadWallet,
		getEncryptedWallet,
		withdrawEarnings,
		withdrawEarningsFor,
		withdrawTo,
		withdrawAllTo,
		getWalletInfo,
		getDataBalance,
		decryptWallet,
		getAvailableBalance,
		getCumulativeEarnings,
		getTotalBalance,
		getStreamrClient,
		getEthBalance,
		generateJWT,
		getSignCheckForSponsorWithdraw,
		getWithdrawAllToTransactionFee,
		getSponsoredWithdrawTransactionFee,
    };
}())


export {communityHelper};

