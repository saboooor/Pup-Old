function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
function minTwoDigits(n) {
	return (n < 10 ? '0' : '') + n;
}
module.exports = {
	name: 'resolved',
	description: 'Mark a ticket as resolved (Deletes ticket at 12AM ET)',
	guildOnly: true,
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
		if (!client.channels.cache.get(interaction.channel_id).topic.includes('Ticket Opened by')) {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'This is not a valid ticket!',
					},
				},
			});
		}
		if (client.tickets.get(interaction.channel_id).users.includes(interaction.member.user.id)) {
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
		if (client.tickets.get(interaction.channel_id).resolved == 'true') {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'This ticket is already marked as resolved!',
					},
				},
			});
		}
		const users = [];
		client.tickets.get(interaction.channel_id).users.forEach(userid => users.push(client.users.cache.get(userid)));
		client.tickets.set(interaction.channel_id, 'true', 'resolved');
		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: `${users}, this ticket has been marked as resolved and will close at 12AM ET if you don't respond.\nIf you still have an issue, please explain it here. Otherwise, you can do \`/close\`, \`-close\`, or react to the original message to close the ticket now.`,
				},
			},
		});
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		console.log(`[${time} INFO]: Marked ticket #${client.channels.cache.get(interaction.channel_id).name} as resolved`);
	},
};