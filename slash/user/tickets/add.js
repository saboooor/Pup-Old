function minTwoDigits(n) {
	return (n < 10 ? '0' : '') + n;
}
module.exports = {
	name: 'add',
	description: 'Add someone to a ticket.',
	guildOnly: true,
	options: [{
		type: 6,
		name: 'user',
		description: 'User to add to ticket',
		required: true,
	}],
	async execute(interaction, args, client, Client, Discord) {
		return client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: 'Slash commands for tickets are currently disabled for now, please use the old commands',
				},
			},
		});
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
		if (client.channels.cache.get(interaction.channel_id).topic == null) {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'This is not a valid ticket!',
					},
				},
			});
		}
		let user = await client.users.cache.find(u => client.channels.cache.get(interaction.channel_id).topic.includes(u.id));
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
						content: 'This ticket is closed!',
					},
				},
			});
		}
		user = client.users.cache.get(args[0].value);
		client.channels.cache.get(interaction.channel_id).updateOverwrite(user, { VIEW_CHANNEL: true });
		const Embed = new Discord.MessageEmbed()
			.setColor(15105570)
			.setDescription(`${interaction.member.user.username} added ${user} to the ticket`);
		await client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					embeds: [Embed],
				},
			},
		});
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		console.log(`[${time} INFO]: Added ${user.username} to #${client.channels.cache.get(interaction.channel_id).name}`);
	},
};