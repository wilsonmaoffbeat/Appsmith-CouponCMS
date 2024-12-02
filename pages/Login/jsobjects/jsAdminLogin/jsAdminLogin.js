export default {
	async login (email, password) {
		const domainMapping = new Map([
			['development', 'everuts.link'],
			['test', 'everutm.link'],
			['production', 'everuts.com'],
		])
		const keyMapping = new Map([
			['development', { keyName: 'GOdZg5z6', keyValue: 'NuclBOp07h7eD8RD5dqYC5rkEpbJViXb' }],
			['test', { keyName: 'vRtBgYjg', keyValue: 'ffb94vTOicyZ1WaAeu2qghyucIjWBSkH' }],
			['production', { keyName: 'LAmXHcaY', keyValue: 'ZMqtpiyWfPOMBhPLwk3R1necmnmEkyls' }],
		])
		
		const env = selectEnv.selectedOptionValue;
		const client = "app"

		const timestamp = new Date().getTime() / 1000 | 0;
		const keyName = keyMapping.get(env).keyName;
		const keyValue = keyMapping.get(env).keyValue;

		const payload = [client, keyName, email, password, timestamp].join("");
		const signature = CryptoJS.HmacSHA256(payload, keyValue).toString();

		
		if(this.checkAuth())
		{
			const data = await fetch(`https://admin-api.${domainMapping.get(env)}/internal-identities/auth/password`, {
				method: "POST",
				body: JSON.stringify({
					client,
					email,
					password,
					credential: keyName,
					timestamp,
					signature
				}),
				headers: {
					"Content-Type": "application/json"
				}
			}).then((it) => {
				return it.ok ? it.json() : Promise.reject(it.statusText)
			})
		
			storeValue('everutsAdminToken', data.token, true);
			storeValue('everutsRefreshToken', data.refreshToken, true);
			storeValue('everutsAdminApiRoot', `https://admin-api.${domainMapping.get(env)}`, true);

			//login
			storeValue("testAdminToken", data.token, true);
			storeValue("testRefreshToken", data.refreshToken, true);
			storeValue("testAdminApiRoot", `https://admin-api.${domainMapping.get(env)}`, true);
			storeValue("testApiRoot", `https://api.${domainMapping.get(env)}`, true);
			//storeValue("testAdminApiRoot", "https://admin-api.everutm.link", true);
			//storeValue("testApiRoot", "https://api.everutm.link", true);

			navigateTo('CouponList');
		}
		else
		{
			showAlert('Wrong account info/Your account is not authorized!', 'error');
		}
	},
	checkAuth() //check if user is wthin the list
	{
		const emailList = this.genEmailArray();
		const canAuth = emailList.includes(uiLoginEmailInput.text.toLowerCase());
		if(emailList.length > 0 && uiLoginEmailInput.text !== '' && uiLoginEmailInput.text !== null && canAuth === true)
			return true;
		else
			return false;
	},
	genEmailArray() //return auth list
	{
		return [
			'dion.lam@offbeattech.com',
			'wilson.ma@offbeattech.com',
			'katrina.choy@offbeattech.com',
			'bertha.wong@offbeattech.com',
			'qubie.cheng@offbeattech.com',
			'carole.ma@offbeattech.com',
			'oscar.kwok@offbeattech.com',
			'jamie.ong@offbeattech.com',
			'joyce.lin@offbeattech.com',
			'rex.lam@offbeattech.com',
			'yolanda.wong@offbeattech.com'
		]
	}
}