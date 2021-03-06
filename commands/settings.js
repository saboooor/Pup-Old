const settings = require('../settings.json');
module.exports = {
	name: 'settings',
	guildOnly: true,
	usage: '[<Setting> <Value>]',
	permissions: 'ADMINISTRATOR',
	async execute(message, args, client, sleep, config, Client, Discord) {
		let srvconfig = Object.keys(client.settings.get(message.guild.id)).map(prop => {
			return `**${prop}** \`${client.settings.get(message.guild.id)[prop]}\``;
		});
		if (args[1]) {
			const [prop, ...value] = args;
			if(!client.settings.has(message.guild.id, prop)) {
				return message.reply("Invalid setting!");
			}
			client.settings.set(message.guild.id, value.join(" "), prop);
		}
		srvconfig = Object.keys(client.settings.get(message.guild.id)).map(prop => {
			return `**${prop}** \`${client.settings.get(message.guild.id)[prop]}\``;
		});
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.floor(Math.random() * 16777215))
			.setTitle('Settings')
			.setDescription(`${srvconfig.join("\n")}`);
		message.channel.send(Embed);
	},
};