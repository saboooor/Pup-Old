const settings = require('../settings.json');
module.exports = {
	name: 'settings',
	guildOnly: true,
	args: true,
	argamnt: 2,
	usage: '<Setting> <true/false>',
	permissions: 'ADMINISTRATOR',
	async execute(message, args, client, sleep, config, Client, Discord) {
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.floor(Math.random() * 16777215))
			.setTitle('Settings')
			.setDescription(`<:leave:794299854637629441> **Leave messages:** ${settings.penis}`);
		message.channel.send(Embed);
	},
};