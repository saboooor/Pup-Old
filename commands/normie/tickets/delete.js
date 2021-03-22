function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
module.exports = {
	name: 'delete',
	guildOnly: true,
	async execute(message, args, client, config, Client, Discord, reaction) {
		if (reaction) {
			if (message.author.id != config.botid) return;
			message.author = Client;
		}
		const user = await client.users.cache.find(u => message.channel.topic.includes(u.id));
		if (!user) return message.reply('This is not a valid ticket!');
		if (message.channel.name.includes('ticket-')) return message.reply('This ticket needs to be closed first!');
		message.channel.send('Deleting Ticket...');
		await sleep(1000);
		message.channel.delete();
	},
};