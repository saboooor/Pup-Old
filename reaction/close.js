module.exports = {
	name: 'close',
	description: '',
	async execute(reaction, user, client, config, message) {
		if (message.author.id != config.botid) return;
		const e = await client.users.cache.find(u => u.tag == message.channel.topic);
		await message.channel.setName(message.channel.name.replace(/ticket/, 'closed'));
		await setTimeout(function() {
			if (message.channel.name.includes('ticket-')) return message.channel.send('Failed to close ticket, please try again in 10 minutes');
			message.channel.updateOverwrite(e, { VIEW_CHANNEL: false });
			message.reply({ embed: {
				color: 15105570,
				description: `Ticket Closed by ${user.username}`,
			} });
			message.reply({ embed: {
				color: 3447003,
				description: '🔓 Reopen Ticket\n⛔ Delete Ticket',
			} })
				.then(sentEmbed => {
					sentEmbed.react('🔓');
					sentEmbed.react('⛔');
				});
		}, 1000);
		return;
	} };