module.exports = {
	name: 'instaboner',
	aliases: ['instapp', 'instapenis', 'instaerect'],
	cooldown: 10,
	guildOnly: false,
	execute(message, args, client, sleep, config, Client, Discord) {
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.round(Math.random() * 16777215))
			.setTitle(`${message.member.displayName}'s pp size`);
		if (Math.round(Math.random() * 10) == 5) {
			Embed.setDescription('sike bitch').setFooter('u have no pp');
			message.channel.send(Embed);
			return;
		}
		const random = Math.round(Math.random() * 35);
		Embed.setDescription('8' + '='.repeat(random - 1) + 'D').setFooter(`pp size = ${random}"`);
		message.channel.send(Embed);
	},
};