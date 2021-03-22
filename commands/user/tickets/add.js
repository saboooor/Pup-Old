module.exports = {
	name: 'add',
	guildOnly: true,
	args: true,
	usage: '<User Mention or ID>',
	async execute(message, args, client, config, Client, Discord, reaction) {
		if (reaction) {
			if (message.author.id != client.user.id) return;
			message.author = Client;
		}
		if (client.settings.get(message.guild.id).tickets == 'false') return message.reply('Tickets are disabled!');
		let user = await client.users.cache.find(u => message.channel.topic.includes(u.id));
		if (!user) return message.reply('This is not a valid ticket!');
		if (message.channel.name.includes('closed-')) return message.reply('This ticket is closed!');
		if (!message.channel.name.includes('ticket-')) return message.reply('This is not a valid ticket!');
		user = client.users.cache.find(u => u.id === args[0].replace('<@', '').replace('!', '').replace('>', ''));
		message.channel.updateOverwrite(user, { VIEW_CHANNEL: true });
		const Embed = new Discord.MessageEmbed()
			.setColor(15105570)
			.setDescription(`${message.author.username} added ${user} to the ticket`);
		message.channel.send(Embed);
		return;
	},
};