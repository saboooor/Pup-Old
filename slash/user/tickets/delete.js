function minTwoDigits(n) {
	return (n < 10 ? '0' : '') + n;
}
const hastebin = require('hastebin');
module.exports = {
	name: 'delete',
	description: 'Delete a ticket',
	guildOnly: true,
	permissions: 'ADMINISTRATOR',
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
		if (!client.channels.cache.get(interaction.channel_id).topic) {
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
		if (client.channels.cache.get(interaction.channel_id).name.includes('ticket-')) {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'This ticket needs to be closed first!',
						flags: 64,
					},
				},
			});
		}
		if (srvconfig.ticketlogchannel != 'false') {
			const trans = await client.channels.cache.get(interaction.channel_id).send('Creating transcript...');
			const messages = await client.channels.cache.get(interaction.channel_id).messages.fetch({ limit: 100 });
			const logs = [];
			await messages.forEach(async msg => {
				const time = new Date(msg.createdTimestamp).toLocaleString('default', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
				logs.push(`[${time}] ${msg.author.tag}\n${msg.content}`);
			});
			logs.reverse();
			const link = await hastebin.createPaste(logs.join('\n\n'), { server: 'https://bin.birdflop.com' });
			const users = [];
			client.tickets.get(interaction.channel_id).users.forEach(userid => users.push(client.users.cache.get(userid)));
			const Embed = new Discord.MessageEmbed()
				.setColor(Math.floor(Math.random() * 16777215))
				.setTitle(`Closed ${client.channels.cache.get(interaction.channel_id).name}`)
				.addField('**Users in ticket**', users)
				.addField('**Transcript**', `${link}.txt`)
				.addField('**Closed by**', client.users.cache.get(interaction.member.user.id));
			await client.channels.cache.get(srvconfig.ticketlogchannel).send(Embed);
			await trans.delete();
			const rn = new Date();
			const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
			console.log(`[${time} INFO]: Created transcript of ${client.channels.cache.get(interaction.channel_id).name}: ${link}.txt`);
		}
		await client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: 'Deleting ticket...',
					flags: 64,
				},
			},
		});
		client.tickets.delete(interaction.channel_id);
		client.channels.cache.get(interaction.channel_id).delete();
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		console.log(`[${time} INFO]: Deleted ticket #${client.channels.cache.get(interaction.channel_id).name}`);
	},
};