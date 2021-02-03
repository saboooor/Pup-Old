module.exports = {
	name: 'tada',
	description: 'tada',
	async execute(message) {
		await message.react('🎉');
	},
};