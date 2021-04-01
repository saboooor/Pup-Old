function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
function minTwoDigits(n) {
	return (n < 10 ? '0' : '') + n;
}
module.exports = {
	name: 'resolved',
	description: 'Mark a ticket as resolved (Deletes ticket at 12AM ET)',
	aliases: ['resolve'],
	async execute(message, args, client, Client, Discord) {
		const srvconfig = client.settings.get(message.guild.id);
		if (srvconfig.tickets == 'false') return message.reply('Tickets are disabled!');
		const user = await client.users.cache.find(u => message.channel.topic.includes(u.id));
		if (!user) return message.reply('This is not a valid ticket!');
		if (user == message.author) return message.reply('You cannot resolve this ticket! Try closing the ticket instead');
		if (message.channel.name.includes('closed-')) return message.reply('This ticket is already closed!');
		if (message.channel.topic.includes('Ticket marked as resolved.')) return message.reply('This ticket is already marked as resolved!');
		message.channel.setTopic(message.channel.topic + ' Ticket marked as resolved.');
		await sleep(1000);
		if (!message.channel.topic.includes('Ticket marked as resolved.')) return message.reply('Failed to resolve ticket, try again in 5-10 minutes');
		message.channel.send(`${user}, this ticket has been marked as resolved and will close at 12AM ET if you don't respond.\nIf you still have an issue, please explain it here. Otherwise, you can do \`/close\`, \`-close\`, or react to the original message to close the ticket now.`);
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		console.log(`[${time} INFO]: Marked ticket #${message.channel.name} as resolved`);
	},
};