module.exports = {
	name: 'ping',
	aliases: ['pong'],
	cooldown: 2,
	guildOnly: false,
	execute(message, args, client, sleep, config, Client, Discord) {
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.floor(Math.random() * 16777215))
			.setTitle('Pong!')
			.setDescription(`${Date.now() - message.createdTimestamp}ms`);
		message.channel.send(Embed);
	},
};