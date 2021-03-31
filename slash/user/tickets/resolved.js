function minTwoDigits(n) {
	return (n < 10 ? '0' : '') + n;
}
module.exports = {
	name: 'resolved',
	description: 'Mark a ticket as resolved',
	aliases: ['resolve'],
	async execute(interaction, args, client, Client, Discord) {
		const srvconfig = client.settings.get(interaction.guild_id);
		if (srvconfig.tickets == 'false') {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'Tickets are disabled!',
					},
				},
			});
		}
		const user = await client.users.cache.find(u => interaction.channel.topic.includes(u.id));
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
		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: `${user}, this ticket has been marked as resolved and will close after 12 hours if you don't respond.\nIf you still have an issue, please explain it here. Otherwise, you can do \`/close\`, \`-close\`, or react to the original message to close the ticket now.`,
				},
			},
		});
		client.channels.cache.get(interaction.channel_id).setTopic(client.channels.cache.get(interaction.channel_id).topic + ' Ticket marked as resolved.');
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		console.log(`[${time} INFO]: Marked ticket #${client.channels.cache.get(interaction.channel_id).name} as resolved`);
	},
};