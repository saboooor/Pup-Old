module.exports = {
	name: 'instaboner',
	aliases: ['instapp', 'instapenis', 'instaerect'],
	cooldown: 10,
	guildOnly: false,
	execute(message, args, client, config, Client, Discord) {
		const srvconfig = client.settings.get(message.guild.id);
		const hard = Math.round(Math.random());
		let hardtxt = 'soft';
		if (hard == '1') hardtxt = 'hard';
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.round(Math.random() * 16777215))
			.setTitle(`${message.member.displayName}'s ${hardtxt} pp size`);
		if (Math.round(Math.random() * 10) == 5) {
			Embed.setDescription('SIKE').setFooter('u have no pp');
			message.channel.send(Embed);
			return;
		}
		const random = Math.round(Math.random() * srvconfig.maxppsize);
		Embed.setDescription('8' + '='.repeat(random - 1) + 'D').setFooter(`${hardtxt} pp size = ${random}"`);
		message.channel.send(Embed);
	},
};