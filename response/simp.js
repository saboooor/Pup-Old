module.exports = {
	name: 'simp',
	description: 'SIMP',
	execute(message) {
		if (message.author.bot) return;
		message.react('🇸');
		message.react('🇮');
		message.react('🇲');
		message.react('🇵');
	},
};