function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
module.exports = {
	name: 'delete',
	description: 'Delete a ticket',
	guildOnly: true,
	async execute(interaction, args, client, Client, Discord, reaction) {
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
		if (client.channels.cache.get(interaction.channel_id).name.includes('ticket-')) {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'This ticket needs to be closed first!',
					},
				},
			});
		}
		await client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: 'Deleting ticket...',
				},
			},
		});
		await sleep(1000);
		client.channels.cache.get(interaction.channel_id).delete();
	},
};