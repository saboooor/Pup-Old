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
	async execute(message, args, client, Client, Discord, reaction) {
		if (reaction) {
			if (message.author.id != client.user.id) return;
			message.author = Client;
		}
		if (client.settings.get(message.guild.id).tickets == 'false') return message.reply('Tickets are disabled!');
		const user = await client.users.cache.find(u => message.channel.topic.includes(u.id));
		if (!user) return message.reply('This is not a valid ticket!');
		if (message.channel.name.includes('closed-')) return message.reply('This ticket is already closed!');
		message.channel.setName(message.channel.name.replace('ticket', 'closed'));
		await sleep(1000);
		if (message.channel.name.includes('ticket-')) return message.channel.send('Failed to close ticket, please try again in 10 minutes');
		message.channel.updateOverwrite(user, { VIEW_CHANNEL: false });
		const srvconfig = client.settings.get(message.guild.id);
		const Embed = new Discord.MessageEmbed()
			.setColor(15105570)
			.setDescription(`Ticket Closed by ${message.author.username}\nMake sure to remove people from this ticket with ${srvconfig.prefix}remove if you've added them with ${srvconfig.prefix}add!`);
		message.channel.send(Embed);
		Embed.setColor(3447003).setDescription(`🔓 Reopen Ticket \`${srvconfig.prefix}open\`\n⛔ Delete Ticket \`${srvconfig.prefix}delete\``);
		const msg = await message.channel.send(Embed);
		msg.react('🔓');
		msg.react('⛔');
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		console.log(`[${time} INFO]: Closed ticket #${message.channel.name}`);
	},
};