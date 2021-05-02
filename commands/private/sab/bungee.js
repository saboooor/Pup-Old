function minTwoDigits(n) {
	return (n < 10 ? '0' : '') + n;
}
module.exports = {
	name: 'bungee',
	description: 'Chopsticks proxy console',
	aliases: ['b'],
	args: true,
	usage: '<Command>',
	async execute(message, args, client, Client, Discord) {
		if (!client.guilds.cache.get('837116518730694678').members.cache.get(message.member.id)) return message.reply('You can\'t do that!');
		if (!client.guilds.cache.get('837116518730694678').members.cache.get(message.member.id).roles.cache.has('837119752232632380')) return message.reply('You can\'t do that!');
		Client.login('https://panel.birdflop.com', client.config.panelapikey, (logged_in, err) => {
			if (logged_in == false) return message.reply(`Something went wrong, please use https://panel.birdflop.com\n${err}`);
		});
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		Client.sendCommand('68505ddb', args.join(' ')).catch((error) => {
			console.error(`[${time} ERROR]: ${error}`);
		});
	},
};