function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
module.exports = {
	name: 'ticket',
	description: 'Create a ticket',
	guildOnly: true,
	options: [{
		type: 3,
		name: 'message',
		description: 'The message to send on the ticket',
	}],
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
		const parent = client.guilds.cache.get(interaction.guild_id).channels.cache.find(c => c.name.toLowerCase().includes('tickets') && c.type == 'category');
		const role = client.guilds.cache.get(interaction.guild_id).roles.cache.find(r => r.name.toLowerCase().includes('staff'));
		const channel = client.guilds.cache.get(interaction.guild_id).channels.cache.find(c => c.name.toLowerCase() == `ticket-${interaction.member.user.username.toLowerCase().replace(' ', '-')}`);
		if (channel !== undefined) {
			client.guilds.cache.get(interaction.guild_id).channels.cache.get(channel.id).send(`❗ **<@${interaction.member.user.id}> Ticket already exists!**`);
			await client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: `You've already created a ticket at <#${channel.id}>!`,
					},
				},
			});
			const msg = await client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({ data: {} });
			const pp = new Discord.Message(client, msg, client.channels.cache.get(msg.channel_id));
			await sleep(5000);
			await pp.delete();
			return;
		}
		if (parent === undefined) {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'You need to create a category with the word "tickets" in it!',
					},
				},
			});
		}
		if (role === undefined) {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'You need to create a role with the word "staff" in it!',
					},
				},
			});
		}
		const ticket = await client.guilds.cache.get(interaction.guild_id).channels.create(`ticket-${interaction.member.user.username.toLowerCase().replace(' ', '-')}`, {
			type: 'text',
			parent: parent.id,
			topic: `Ticket Opened by ${interaction.member.user.tag} ID: ${interaction.member.user.id}`,
			permissionOverwrites: [
				{
					id: interaction.guild_id,
					deny: ['VIEW_CHANNEL'],
				},
				{
					id: interaction.member.user.id,
					allow: ['VIEW_CHANNEL'],
				},
				{
					id: role.id,
					allow: ['VIEW_CHANNEL'],
				},
			],
		}).catch(error => console.error(error));
		await client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: `Ticket created at <#${ticket.id}>!`,
				},
			},
		});
		await sleep(1000);
		const srvconfig = client.settings.get(interaction.guild_id);
		const Embed = new Discord.MessageEmbed()
			.setColor(3447003)
			.setTitle('Ticket Created')
			.setDescription('Please explain your issue and we\'ll be with you shortly.')
			.setFooter(`To close this ticket do ${srvconfig.prefix}close, /close, or react with 🔒`);
		if (args) Embed.addField('Description', args[0].value);
		const embed = await ticket.send(`<@${interaction.member.user.id}>`, Embed);
		embed.react('🔒');
		const ping = await ticket.send('@.everyone');
		await ping.delete();
	},
};