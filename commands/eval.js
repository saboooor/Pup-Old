/* eslint-disable no-unused-vars */
module.exports = {
	name: 'eval',
	aliases: ['ec'],
	guildOnly: false,
	args: true,
	argamnt: 1,
	usage: '<Code>',
	async execute(message, args, client, sleep, config, Client, Discord) {
		if (message.author.id !== '249638347306303499') return message.reply('You can\'t do that!');
		try {
			eval(args.join(' '));
		}
		catch(error) {
			message.reply(`${error}`.split('at')[0]);
		}
		return;
	},
};