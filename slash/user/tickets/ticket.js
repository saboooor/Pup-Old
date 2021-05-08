function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
function minTwoDigits(n) {
	return (n < 10 ? '0' : '') + n;
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
		const srvconfig = client.settings.get(interaction.guild_id);
		if (srvconfig.tickets == 'false') {
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
		let parent = client.guilds.cache.get(interaction.guild_id).channels.cache.get(srvconfig.ticketcategory);
		const role = client.guilds.cache.get(interaction.guild_id).roles.cache.get(srvconfig.supportrole);
		const channel = client.guilds.cache.get(interaction.guild_id).channels.cache.find(c => c.name.toLowerCase() == `ticket-${interaction.member.user.username.toLowerCase().replace(' ', '-')}`);
		if (channel) {
			client.guilds.cache.get(interaction.guild_id).channels.cache.get(channel.id).send(`❗ **<@${interaction.member.user.id}> Ticket already exists!**`);
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: '❗ **Ticket already exists!**',
						flags: 64,
					},
				},
			});
		}
		if (!role) {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'You need to set a role with /settings supportrole <Role ID>!',
						flags: 64,
					},
				},
			});
		}
		if (!parent) parent = { id: null };
		if (parent.type != 'category') parent = { id: null };
		const ticket = await client.guilds.cache.get(interaction.guild_id).channels.create(`ticket-${interaction.member.user.username.toLowerCase().replace(' ', '-')}`, {
			type: 'text',
			parent: parent.id,
			topic: `Ticket Opened by ${interaction.member.user.username}#${interaction.member.user.discriminator} ID: ${interaction.member.user.id}`,
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
		client.tickets.set(ticket.id, interaction.member.user.id, 'opener');
		client.tickets.push(ticket.id, interaction.member.user.id, 'users');
		await client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: `Ticket created at ${ticket}!`,
					flags: 64,
				},
			},
		});
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		console.log(`[${time} INFO]: Ticket created at #${ticket.name}`);
		await sleep(1000);
		const Embed = new Discord.MessageEmbed()
			.setColor(3447003)
			.setTitle('Ticket Created')
			.setDescription('Please explain your issue and we\'ll be with you shortly.')
			.setFooter(`To close this ticket do ${srvconfig.prefix}close, /close or react with 🔒`);
		if (args) Embed.addField('Description', args.join(' '));
		const embed = await ticket.send(`${client.users.cache.get(interaction.member.user.id)}`, Embed);
		embed.react('🔒');
		if (srvconfig.ticketmention == 'true') {
			const ping = await ticket.send('@everyone');
			await ping.delete();
		}
	},
};