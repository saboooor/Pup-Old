function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
module.exports = {
	name: 'close',
	guildOnly: true,
	async execute(message, args, client, config, Client, Discord, reaction) {
		if (reaction) {
			if (message.author.id != config.botid) return;
			message.author = Client;
		}
		const user = await client.users.cache.find(u => message.channel.topic.includes(u.id));
		if (!user) return message.reply('This is not a valid ticket!');
		if (message.channel.name.includes('closed-')) return message.reply('This ticket is already closed!');
		if (!message.channel.name.includes('ticket-')) return message.reply('This is not a valid ticket!');
		message.channel.setName(message.channel.name.replace('ticket', 'closed'));
		await sleep(1000);
		if (message.channel.name.includes('ticket-')) return message.channel.send('Failed to close ticket, please try again in 10 minutes');
		message.channel.updateOverwrite(user, { VIEW_CHANNEL: false });
		const Embed = new Discord.MessageEmbed()
			.setColor(15105570)
			.setDescription(`Ticket Closed by ${message.author.username}`);
		message.channel.send(Embed);
		const srvconfig = client.settings.get(message.guild.id);
		Embed.setColor(3447003).setDescription(`🔓 Reopen Ticket \`${srvconfig.prefix}open\`\n⛔ Delete Ticket \`${srvconfig.prefix}delete\``);
		const msg = await message.channel.send(Embed);
		msg.react('🔓');
		msg.react('⛔');
		return;
	},
};