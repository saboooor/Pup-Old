const hastebin = require('hastebin');
module.exports = {
	name: 'binflop',
	description: 'Upload text to binflop',
	cooldown: 10,
	args: true,
	usage: '<Text>',
	async execute(message, args, client, Client, Discord) {
		const messages = await message.channel.messages.fetch({ limit: 100 });
		const logs = [];
		await messages.forEach(async msg => {
			const time = new Date(msg.createdTimestamp).toLocaleString('default', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
			logs.push(`[${time}] ${msg.author.tag}\n${msg.content}`);
		});
		logs.reverse();
		const link = await hastebin.createPaste(logs.join('\n\n'), { server: 'https://bin.birdflop.com' });
		await message.reply(`${link}.txt`);
	},
};