module.exports = {
	name: 'support',
	description: 'Support Channel',
	async execute(reaction, user, client, config, message) {
		const channel = message.guild.channels.cache.find(c => c.name.toLowerCase() == `ticket-${user.username.toLowerCase().replace(' ', '-')}`);
		const parent = message.guild.channels.cache.find(c => c.name.toLowerCase().includes('tickets') && c.type == 'category');
		const role = message.guild.roles.cache.find(r => r.name.toLowerCase().includes('staff'));
		message.channel.messages.fetch({ around: message.id, limit: 1 }).then(msg => {
			const fetchedMsg = msg.first();
			if (fetchedMsg.author.id != config.botid) return;
		});
		if (reaction.emoji.name != '🎫') return;
		await reaction.users.remove(user.id);
		if (channel !== undefined) return message.guild.channels.cache.get(channel.id).send('❗ **Ticket already exists!**');
		if (parent === undefined) return message.reply('You need to create a category with the word "tickets" in it!');
		if (role === undefined) return message.reply('You need to create a role with the word "staff" in it!');
		const ticket = await message.guild.channels.create(`ticket-${user.username.toLowerCase().replace(' ', '-')}`, {
			type: 'text',
			parent: parent.id,
			topic: user.tag,
			permissionOverwrites: [
				{
					id: message.guild.id,
					deny: ['VIEW_CHANNEL'],
				},
				{
					id: user.id,
					allow: ['VIEW_CHANNEL'],
				},
				{
					id: role.id,
					allow: ['VIEW_CHANNEL'],
				},
			],
		}).catch(console.error);
		const mesg = await ticket.send(`<@${user.id}>`, { embed: {
			color: 3447003,
			title: 'Ticket Created',
			description: 'Please explain your issue and we\'ll be with you shortly.',
			footer: {
				text: 'To close this ticket react with 🔒',
			},
		} });
		await mesg.react('🔒');
		const ping = await ticket.send('@everyone');
		await ping.delete();
	},
};