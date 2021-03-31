function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
module.exports = {
	name: 'open',
	description: 'Repen a ticket',
	guildOnly: true,
	aliases: ['reopen'],
	async execute(message, args, client, Client, Discord, reaction) {
		if (reaction) {
			if (message.author.id != client.user.id) return;
			message.author = Client;
		}
		if (client.settings.get(message.guild.id).tickets == 'false') return message.reply('Tickets are disabled!');
		const user = await client.users.cache.find(u => message.channel.topic.includes(u.id));
		if (!user) return message.reply('This is not a valid ticket!');
		if (message.channel.name.includes('ticket-')) return message.reply('This ticket is already opened!');
		await message.channel.setName(message.channel.name.replace('closed', 'ticket'));
		await sleep(1000);
		if (message.channel.name.includes('closed-')) return message.channel.send('Failed to open ticket, please try again in 10 minutes');
		message.channel.updateOverwrite(user, { VIEW_CHANNEL: true });
		const Embed = new Discord.MessageEmbed()
			.setColor(15105570)
			.setDescription(`Ticket Opened by ${message.author.username}`);
		message.channel.send(Embed);
		return;
	},
};