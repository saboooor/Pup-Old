function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
module.exports = {
	name: 'ticket',
	guildOnly: true,
	aliases: ['new'],
	async execute(message, args, client, config, Client, Discord, reaction) {
		if (reaction) {
			if (message.author.id != config.botid) return;
			message.author = Client;
		}
		const parent = message.guild.channels.cache.find(c => c.name.toLowerCase().includes('tickets') && c.type == 'category');
		const role = message.guild.roles.cache.find(r => r.name.toLowerCase().includes('staff'));
		const channel = message.guild.channels.cache.find(c => c.name.toLowerCase() == `ticket-${message.author.username.toLowerCase().replace(' ', '-')}`);
		if (channel !== undefined) {
			message.guild.channels.cache.get(channel.id).send(`❗ **<@${message.author.id}> Ticket already exists!**`);
			const msg = await message.reply(`You've already created a ticket at <#${channel.id}>!`);
			await sleep(5000);
			await msg.delete();
			return;
		}
		if (parent === undefined) return message.reply('You need to create a category with the word "tickets" in it!');
		if (role === undefined) return message.reply('You need to create a role with the word "staff" in it!');
		const ticket = await message.guild.channels.create(`ticket-${message.author.username.toLowerCase().replace(' ', '-')}`, {
			type: 'text',
			parent: parent.id,
			topic: `Ticket Opened by ${message.author.tag} ID: ${message.author.id}`,
			permissionOverwrites: [
				{
					id: message.guild.id,
					deny: ['VIEW_CHANNEL'],
				},
				{
					id: message.author.id,
					allow: ['VIEW_CHANNEL'],
				},
				{
					id: role.id,
					allow: ['VIEW_CHANNEL'],
				},
			],
		}).catch(console.error);
		const msg = await message.reply(`Ticket created at <#${ticket.id}>!`);
		await sleep(1000);
		const srvconfig = client.settings.get(message.guild.id);
		const Embed = new Discord.MessageEmbed()
			.setColor(3447003)
			.setTitle('Ticket Created')
			.setDescription('Please explain your issue and we\'ll be with you shortly.')
			.setFooter(`To close this ticket do ${srvconfig.prefix}close or react with 🔒`);
		if (args) Embed.addField('Description', args.join(' '));
		const embed = await ticket.send(`<@${message.author.id}>`, Embed);
		embed.react('🔒');
		const ping = await ticket.send('@everyone');
		await ping.delete();
		await sleep(4000);
		await msg.delete();
	},
};