module.exports = {
	name: 'eval',
	aliases: ['ec'],
	guildOnly: false,
	args: true,
	argamnt: 1,
	usage: '<Code>',
	async execute(message, args, client, sleep, config, Client, Discord) {
		if (message.author.id !== '249638347306303499') return message.reply('You can\'t do that!');
		eval(args.join(' ').catch(e => message.channel.send(`\`${`${e}`.split('at')[0]}\``)));
		return;
	},
};