export default {
	async onDiscountTypeChange()
	{
		this.iniComponents();
		if(select_discount_type.selectedOptionValue === 'FIXED_AMOUNT')
		{
			input_discount_percent.setValue("");
			input_max_discount_amount.setValue("");
			select_currency.setDisabled(false);
			input_discount_amount.setDisabled(false);
			input_discount_percent.setDisabled(true);
			select_max_currency.setDisabled(true);
			input_max_discount_amount.setDisabled(true);
		}
		else if(select_discount_type.selectedOptionValue === 'PERCENTAGE')
		{
			input_discount_amount.setValue("");
			select_currency.setDisabled(true);
			input_discount_amount.setDisabled(true);
			input_discount_percent.setDisabled(false);
			select_max_currency.setDisabled(false);
			input_max_discount_amount.setDisabled(false);
			console.log('percentage done');
		}
		else //null
		{
			select_currency.setDisabled(true);
			input_discount_amount.setDisabled(true);
			input_discount_percent.setDisabled(true);
			select_max_currency.setDisabled(true);
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
		if(select_discount_type.selectedOptionValue === 'PERCENTAGE') //remove PRODUCT if it is a percentage coupon
		{
			select_coupon_type.setSelectedOption("DELIVERY");
			const types = appsmith.store.couponTypes || [];
			storeValue("couponTypes", types.filter(item => !(item.name === "PRODUCT" && item.code === "PRODUCT")));
			console.log('store edited');
		}
	}
}