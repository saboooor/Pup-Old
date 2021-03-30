function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
module.exports = {
	name: 'close',
	description: 'Close a ticket',
	guildOnly: true,
	async execute(interaction, args, client, Client, Discord) {
		if (client.settings.get(interaction.guild_id).tickets == 'false') {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'Tickets are disabled!',
					},
				},
			});
		}
		const user = await client.users.cache.find(u => client.channels.cache.get(interaction.channel_id).topic.includes(u.id));
		if (!user) {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'This is not a valid ticket!',
					},
				},
			});
		};
		if (client.channels.cache.get(interaction.channel_id).name.includes('closed-')) {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'This ticket is already closed!',
					},
				},
			});
		}
		client.channels.cache.get(interaction.channel_id).setName(message.channel.name.replace('ticket', 'closed'));
		await sleep(1000);
		if (client.channels.cache.get(interaction.channel_id).name.includes('ticket-')) {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'Failed to close ticket, try again in 5-10 minutes',
					},
				},
			});
		}
		client.channels.cache.get(interaction.channel_id).updateOverwrite(user, { VIEW_CHANNEL: false });
		const srvconfig = client.settings.get(interaction.guild_id);
		const Embed = new Discord.MessageEmbed()
			.setColor(15105570)
			.setDescription(`Ticket Closed by ${interaction.member.user.username}\nMake sure to remove people from this ticket with ${srvconfig.prefix}remove or /remove if you've added them with ${srvconfig.prefix}add or /add!`);
		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					embeds: [Embed],
				},
			},
		});
		Embed.setColor(3447003).setDescription(`🔓 Reopen Ticket \`${srvconfig.prefix}open or /open\`\n⛔ Delete Ticket \`${srvconfig.prefix}delete or /delete\``);
		const msg = await client.channels.cache.get(interaction.channel_id).send(Embed);
		msg.react('🔓');
		msg.react('⛔');
		return;
	},
};