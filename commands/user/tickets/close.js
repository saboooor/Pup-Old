function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
function minTwoDigits(n) {
	return (n < 10 ? '0' : '') + n;
}
const hastebin = require('hastebin');
module.exports = {
	name: 'close',
	description: 'Close a ticket',
	async execute(message, args, client, Client, Discord, reaction) {
		if (reaction) {
			if (message.author.id != client.user.id) return;
			message.author = Client;
		}
		const srvconfig = client.settings.get(message.guild.id);
		if (srvconfig.tickets == 'false') return message.reply('Tickets are disabled!');
		if (!message.channel.topic) return message.reply('This is not a valid ticket!');
		if (!message.channel.topic.includes('Ticket Opened by')) return message.reply('This is not a valid ticket!');
		if (message.channel.name.includes('closed-')) return message.reply('This ticket is already closed!');
		if (client.tickets.get(message.channel.id).users.includes(message.author.id)) {
			if (message.author.id != client.tickets.get(message.channel.id).opener) return message.reply('You can\'t close this ticket!');
		}
		if (srvconfig.ticketlogchannel != 'false') {
			const trans = await message.channel.send('Creating transcript...');
			const messages = await message.channel.messages.fetch({ limit: 100 });
			const logs = [];
			await messages.forEach(async msg => {
				const time = new Date(msg.createdTimestamp).toLocaleString('default', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
				logs.push(`[${time}] ${msg.author.tag}\n${msg.content}`);
			});
			logs.reverse();
			const link = await hastebin.createPaste(logs.join('\n\n'), { server: 'https://bin.birdflop.com' });
			const users = [];
			client.tickets.get(message.channel.id).users.forEach(userid => users.push(client.users.cache.get(userid)));
			const Embed = new Discord.MessageEmbed()
				.setColor(Math.floor(Math.random() * 16777215))
				.setTitle(`Closed ${message.channel.name}`)
				.addField('**Users in ticket**', users)
				.addField('**Transcript**', `${link}.txt`)
				.addField('**Closed by**', message.author);
			await client.channels.cache.get(srvconfig.ticketlogchannel).send(Embed);
			await trans.delete();
			const rn = new Date();
			const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
			console.log(`[${time} INFO]: Created transcript of ${message.channel.name}: ${link}.txt`);
		}
		message.channel.setName(message.channel.name.replace('ticket', 'closed'));
		await sleep(1000);
		if (message.channel.name.includes('ticket-')) return message.channel.send('Failed to close ticket, please try again in 10 minutes');
		client.tickets.set(message.channel.id, 'false', 'resolved');
		client.tickets.get(message.channel.id).users.forEach(userid => {
			message.channel.updateOverwrite(client.users.cache.get(userid), { VIEW_CHANNEL: false });
		});
		const Embed = new Discord.MessageEmbed()
			.setColor(15105570)
			.setDescription(`Ticket Closed by ${message.author}`);
		message.channel.send(Embed);
		Embed.setColor(3447003).setDescription(`🔓 Reopen Ticket \`${srvconfig.prefix}open\` \`/open\`\n⛔ Delete Ticket \`${srvconfig.prefix}delete\` \`/delete\``);
		const msg = await message.channel.send(Embed);
		msg.react('🔓');
		msg.react('⛔');
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		console.log(`[${time} INFO]: Closed ticket #${message.channel.name}`);
	},
};