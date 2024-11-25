export default {
	onGenerateMethodChange()
	{
		if(radio_generate_method.selectedOptionValue === 'Y') //self-defined codes
		{
			input_code.setDisabled(false);
			input_auto_gen_count.setValue(0);
			input_auto_gen_count.setDisabled(true);
		}
		else //sys-gen codes
		{
			input_code.setValue("");
			input_code.setDisabled(true);
			input_auto_gen_count.setDisabled(false);
		}
		js_on_code_input.onCodeInput();
	}
}