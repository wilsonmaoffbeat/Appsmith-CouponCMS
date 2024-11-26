export default {
	async submit()
	{
		let canSubmit = this.checkValid();
		if(canSubmit === false)
		{
			showAlert('Please enter all the required info!','error');
		}
		else
		{
			try 
			{
				await api_post_coupon_code_sets.run();
				showAlert('Coupon created!', 'success');
				navigateTo('CouponList');
			}
			catch (error)
			{
				showAlert('Error! '+api_post_coupon_code_sets.data.message,'error');
			}
		}
	},
	checkValid()
	{
		//Overall validation
		if(code_count.text > 0 &&
			 input_title_en !== "" && input_title_zh !== "" && input_desc_en !== "" && label_desc_zh !== "" &&
			 //input_remarks_en !== "" && input_remarks_zh !== "" &&
			 select_coupon_type.selectedOptionValue !== "" && select_discount_type.selectedOptionValue !== "" && 
			 select_registration_type.selectedOptionValues.length > 1 &&
			 input_redemption_limit.text > 0 && input_limit_per_code.text > 0 && input_limit_per_user.text > 0 &&
			 datepicker_start.selectedDate !== "" && datepicker_end.selectedDate !== "")
			{
				//validation for Discount Type and its value
				if((select_discount_type.selectedOptionValue === 'FIXED_AMOUNT' && input_discount_amount.text > 0) || 
					 (select_discount_type.selectedOptionValue === 'PERCENTAGE' && input_discount_percent.text !== null && input_discount_percent.text !== ''))
					return true;
				else
					return false;
			}
		else
			return false;
	}
}