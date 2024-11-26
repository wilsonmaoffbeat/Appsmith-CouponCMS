export default {
	onCodeInput()
	{
		const inputText = input_code.text;
		const items = inputText.split('\n');
		code_count.setValue(items.filter(item => item.trim() !== '').length);
	}
}