function minTwoDigits(n) {
	return (n < 10 ? '0' : '') + n;
}
module.exports = {
	name: 'remove',
	description: 'Remove someone to a ticket.',
	guildOnly: true,
	options: [{
		type: 6,
		name: 'user',
		description: 'User to remove from ticket',
		required: true,
	}],
	async execute(interaction, args, client, Client, Discord) {
		if (client.settings.get(interaction.guild_id).tickets == 'false') {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'Tickets are disabled!',
						flags: 64,
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
						flags: 64,
					},
				},
			});
		}
		if (client.channels.cache.get(interaction.channel_id).name.includes('closed-')) {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'This ticket is closed!',
						flags: 64,
					},
				},
			});
		}
		const user = client.users.cache.get(args[0].value);
		if (client.tickets.get(interaction.channel_id).users.includes(user.id)) {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'This user isn\'t in this ticket!',
						flags: 64,
					},
				},
			});
		}
		if (user.id == client.tickets.get(interaction.channel_id).opener) {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'You can\'t remove the ticket opener!',
						flags: 64,
					},
				},
			});
		}
		client.tickets.remove(interaction.channel_id, user.id, 'users');
		client.channels.cache.get(interaction.channel_id).updateOverwrite(user, { VIEW_CHANNEL: false });
		const Embed = new Discord.MessageEmbed()
			.setColor(15105570)
			.setDescription(`${client.users.cache.get(interaction.member.user.id)} removed ${user} from the ticket`);
		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					embeds: [Embed],
				},
			},
		});
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		console.log(`[${time} INFO]: Removed ${user.username} from #${client.channels.cache.get(interaction.channel_id).name}`);
	},
};