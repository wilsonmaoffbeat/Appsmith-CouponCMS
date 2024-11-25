export default {
	onDiscountTypeChange()
	{
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
	}
}