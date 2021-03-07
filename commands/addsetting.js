module.exports = {
	name: 'addsetting',
	guildOnly: true,
	async execute(message, args, client, sleep, config, Client, Discord) {
		if (message.author.id !== '249638347306303499') return message.reply('You can\'t do that!');
		if (args[1]) {
			const [prop, ...value] = args;
			client.guilds.cache.forEach(guild => {
				client.settings.set(guild.id, value.join(" "), prop);
			});
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