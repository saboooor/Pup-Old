function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
function minTwoDigits(n) {
	return (n < 10 ? '0' : '') + n;
}
module.exports = {
	name: 'close',
	description: 'Close a ticket',
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
		if (client.tickets.get(interaction.channel_id).users.includes(interaction.member.user.id)) {
			if (interaction.member.user.id != client.tickets.get(interaction.channel_id).opener) {
				return client.api.interactions(interaction.id, interaction.token).callback.post({
					data: {
						type: 4,
						data: {
							content: 'You can\'t close this ticket!',
						},
					},
				});
			}
		}
		client.channels.cache.get(interaction.channel_id).setName(client.channels.cache.get(interaction.channel_id).name.replace('ticket', 'closed'));
		await sleep(1000);
		if (client.channels.cache.get(interaction.channel_id).name.includes('ticket-')) {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'Failed to close ticket, try again in 10 minutes',
					},
				},
			});
		}
		client.tickets.set(interaction.channel_id, 'false', 'resolved');
		client.tickets.get(interaction.channel_id).users.forEach(userid => {
			client.channels.cache.get(interaction.channel_id).updateOverwrite(client.users.cache.get(userid), { VIEW_CHANNEL: false });
		});
		const Embed = new Discord.MessageEmbed()
			.setColor(15105570)
			.setDescription(`Ticket Closed by ${client.users.cache.get(interaction.member.user.id)}`);
		await client.api.interactions(interaction.id, interaction.token).callback.post({
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
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		console.log(`[${time} INFO]: Closed ticket #${client.channels.cache.get(interaction.channel_id).name}`);
	},
};