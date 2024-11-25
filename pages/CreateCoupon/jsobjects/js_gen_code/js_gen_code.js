export default {
	generateCodes()
	{
		const numCodes = parseInt(input_auto_gen_count.text); // Get the number of codes from the input
		const characters = "ABCDEFGHJKMNPQRTUVWXYZabcdefghjklmnpqrstuvwxyz23456789";
		const codeLength = 8;
		let codes = [];
		for (let i = 0; i < numCodes; i++) {
				let code = "";
				for (let j = 0; j < codeLength; j++) {
						const randomIndex = Math.floor(Math.random() * characters.length);
						code += characters[randomIndex];
				}
				codes.push(code);
		}
		// Populate the textarea with the generated codes
		const currentCodes = input_code.text;
		const newCodes = currentCodes + (currentCodes ? "\n" : "") + codes.join("\n");
		input_code.setValue(newCodes);
		
		const inputText = input_code.text;
		const items = inputText.split('\n');
		code_count.setValue(items.filter(item => item.trim() !== '').length);
	}
}