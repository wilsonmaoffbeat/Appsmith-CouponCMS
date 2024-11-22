export default {
	async login () {

		await api_refresh_token.run();
		const data = api_refresh_token.data;

		storeValue("testAdminToken", data.token, true)
		storeValue("testRefreshToken", data.refreshToken, true)
		storeValue("testAdminApiRoot", "https://admin-api.everutm.link", true)
		storeValue("testApiRoot", "https://admin-api.everutm.link", true)

		navigateTo('CouponList');
	}
}