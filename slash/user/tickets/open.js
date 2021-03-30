function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
module.exports = {
	name: 'open',
	description: 'Repen a ticket',
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
		}
		if (client.channels.cache.get(interaction.channel_id).name.includes('ticket-')) {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'This ticket is already opened!',
					},
				},
			});
		}
		client.channels.cache.get(interaction.channel_id).setName(client.channels.cache.get(interaction.channel_id).name.replace('closed', 'ticket'));
		await sleep(1000);
		if (client.channels.cache.get(interaction.channel_id).name.includes('closed-')) {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'Failed to open ticket, try again in 5-10 minutes',
					},
				},
			});
		}
		client.channels.cache.get(interaction.channel_id).updateOverwrite(user, { VIEW_CHANNEL: true });
		const Embed = new Discord.MessageEmbed()
			.setColor(15105570)
			.setDescription(`Ticket Opened by ${interaction.member.user.username}`);
		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					embeds: [Embed],
				},
			},
		});
		return;
	},
};