export default {
	async onIniPage()
	{
		try
		{
			await api_get_coupon.run();
		}
		catch (error)
		{
			showAlert('Error! '+api_get_coupon.data.message,'error');
		}
		this.iniComponents();
		if(api_get_coupon.data.discountType === 'FIXED_AMOUNT')
		{
			input_discount_percent.setValue("");
			input_max_discount_amount.setValue("");
			select_currency.setDisabled(false);
			input_discount_amount.setDisabled(false);
			input_discount_percent.setDisabled(true);
			input_max_discount_amount.setDisabled(true);
		}
		else if(api_get_coupon.data.discountType === 'PERCENTAGE')
		{
			input_discount_amount.setValue("");
			select_currency.setDisabled(true);
			input_discount_amount.setDisabled(true);
			input_discount_percent.setDisabled(false);
			input_max_discount_amount.setDisabled(false);
			console.log('percentage done');
		}
		else //null
		{
			select_currency.setDisabled(true);
			input_discount_amount.setDisabled(true);
			input_discount_percent.setDisabled(true);
			input_max_discount_amount.setDisabled(true);
		}
	},
	iniComponents()
	{
		//Coupon Types
		storeValue("couponTypes", 
		[
			{"name": "PRODUCT","code": "PRODUCT"},
			{"name": "DELIVERY","code": "DELIVERY"}
		]);
		console.log('store created');
		if(api_get_coupon.data.discountType === 'PERCENTAGE') //remove PRODUCT if it is a percentage coupon
		{
			select_coupon_type.setSelectedOption("DELIVERY");
			const types = appsmith.store.couponTypes || [];
			storeValue("couponTypes", types.filter(item => !(item.name === "PRODUCT" && item.code === "PRODUCT")));
			console.log('store edited');
		}
		//count existing codes
		const inputText = input_code.text;
		const items = inputText.split('\n');
		code_count.setValue(items.filter(item => item.trim() !== '').length);
	}
}