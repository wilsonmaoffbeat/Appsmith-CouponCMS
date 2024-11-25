export default {
	onDiscountTypeChange()
	{
		this.iniCouponType();
		if(select_discount_type.selectedOptionValue === 'FIXED_AMOUNT')
		{
			input_discount_percent.setValue("");
			input_max_discount_amount.setValue("");
			select_currency.setDisabled(false);
			input_discount_amount.setDisabled(false);
			input_discount_percent.setDisabled(true);
			input_max_discount_amount.setDisabled(true);
		}
		else if(select_discount_type.selectedOptionValue === 'PERCENTAGE')
		{
			input_discount_amount.setValue("");
			select_currency.setDisabled(true);
			input_discount_amount.setDisabled(true);
			input_discount_percent.setDisabled(false);
			input_max_discount_amount.setDisabled(false);
		}
		else //null
		{
			select_currency.setDisabled(true);
			input_discount_amount.setDisabled(true);
			input_discount_percent.setDisabled(true);
			input_max_discount_amount.setDisabled(true);
		}
	},
	iniCouponType()
	{
		storeValue("couponTypes", 
		[
			{"name": "PRODUCT","code": "PRODUCT"},
			{"name": "DELIVERY","code": "DELIVERY"}
		]);
		if(select_discount_type.selectedOptionValue === 'PERCENTAGE') //remove PRODUCT if it is a percentage coupon
		{
			select_coupon_type.setSelectedOption("DELIVERY");
			const types = appsmith.store.couponTypes || [];
			storeValue("couponTypes", types.filter(item => !(item.name === "PRODUCT" && item.code === "PRODUCT")));
		}
	}
}