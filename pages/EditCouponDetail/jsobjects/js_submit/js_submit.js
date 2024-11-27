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
				await api_patch_coupon.run({data:this.createBody(radio_full_edit.selectedOptionValue)});
				showAlert('Coupon edited!', 'success');
				navigateTo('CouponList');
			}
			catch (error)
			{
				showAlert('Error! '+api_patch_coupon.data.message,'error');
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
			 select_registration_type.selectedOptionValues.length >= 1 &
			 input_limit_per_code.text > 0 && input_limit_per_user.text > 0 &&
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
	},
	createBody(isFullEdit)
	{
		if(isFullEdit === 'Y') //full edit mode
		{
			const data =
			{
				"couponCodes": input_code.text.split(/\r?\n/).filter(it => !!it),
				"detail" : 
				{
					"description": {
						"en": input_desc_en.text,
						"zh-HK": input_desc_zh.text
					},
					"endDate" : datepicker_end.selectedDate,
					
					"kind": {
					"discount": 
						select_discount_type.selectedOptionValue === 'FIXED_AMOUNT' ? 
						{
							"currency": select_currency.selectedOptionValue,
							"value": Number(input_discount_amount.text)
						} : (input_discount_percent.text.includes('%') ? 
     				input_discount_percent.text.replace('%', '') + "%" : 
    			  input_discount_percent.text + "%"
    				),	
					"discountType": select_discount_type.selectedOptionValue,
					"minimumProductAmount": 
					{
						"currency": select_currency.selectedOptionValue,
						"value": Number(input_min_product_value.text)
					},
					"maximumDiscountAmount": 
					input_max_discount_amount.text ? 
					{
						"currency": select_max_currency.selectedOptionValue,
						"value": input_max_discount_amount.text
					} : null,
					"type": select_coupon_type.selectedOptionValue
					},
					
					"redemptionLimit" : Number(input_redemption_limit.text),
					"redemptionLimitPerCode" : Number(input_limit_per_code.text),
					"redemptionLimitPerUser" : Number(input_limit_per_user.text),
					"registrationTypes": select_registration_type.selectedOptionValues,
					"remarks": {
						"en": input_remarks_en.text,
						"zh-HK": input_remarks_zh.text
					},
					"startDate": datepicker_start.selectedDate,
					"title": {
						"en": input_title_en.text,
						"zh-HK": input_title_zh.text
					}
				},
				"type" : "FULL"
			}
			//console.log(JSON.stringify(data, null, 2));
			return data;
		}
		else //partial edit mode
		{
			const data =
			{
				"detail" : 
				{
					"endDate" : datepicker_end.selectedDate,
					"redemptionLimit" : Number(input_redemption_limit.text),
					"redemptionLimitPerCode" : Number(input_limit_per_code.text),
					"redemptionLimitPerUser" : Number(input_limit_per_user.text),
				},
				"type" : "PARTIAL"
			}
			return data;
		}
	}
}