module.exports = {
	name: 'react',
	description: 'React to a message with pup',
	cooldown: 1,
	args: true,
	argamnt: 2,
	usage: '<Message ID> <Emoji>',
	permissions: 'SEND_MESSAGES',
	execute(message, args, client, Client, Discord) {
		message.delete();
		message.channel.messages.react(args[0], args[1]);
	},
};