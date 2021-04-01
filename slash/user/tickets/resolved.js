function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
function minTwoDigits(n) {
	return (n < 10 ? '0' : '') + n;
}
module.exports = {
	name: 'resolved',
	description: 'Mark a ticket as resolved (Deletes ticket at 12AM ET)',
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
		if (user == client.users.cache.get(interaction.member.user.id)) {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'You cannot resolve this ticket! Try closing the ticket instead',
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
		if (client.channels.cache.get(interaction.channel_id).topic.includes('Ticket marked as resolved.')) {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'This ticket is already marked as resolved!',
					},
				},
			});
		}
		client.channels.cache.get(interaction.channel_id).setTopic(client.channels.cache.get(interaction.channel_id).topic + ' Ticket marked as resolved.');
		await sleep(1000);
		if (!client.channels.cache.get(interaction.channel_id).topic.includes('Ticket marked as resolved.')) {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'Failed to resolve ticket, try again in 5-10 minutes',
					},
				},
			});
		}
		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: `${user}, this ticket has been marked as resolved and will close at 12AM ET if you don't respond.\nIf you still have an issue, please explain it here. Otherwise, you can do \`/close\`, \`-close\`, or react to the original message to close the ticket now.`,
				},
			},
		});
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		console.log(`[${time} INFO]: Marked ticket #${client.channels.cache.get(interaction.channel_id).name} as resolved`);
	},
};