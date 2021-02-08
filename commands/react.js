module.exports = {
	name: 'react',
	cooldown: 1,
	guildOnly: true,
	args: true,
	argamnt: 2,
	usage: '<Message ID> <Emoji>',
	permissions: 'SEND_MESSAGES',
	async execute(message, args, client, sleep, config, Client, Discord) {
		await message.delete();
		const msg = await message.channel.messages.fetch({ around: args[0], limit: 1 });
		const fetchedMsg = msg.first();
		fetchedMsg.react(args[1]);
	},
};