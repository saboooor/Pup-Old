module.exports = {
	name: 'instaboner',
	description: 'See your pp grow FAST',
	aliases: ['instapp', 'instapenis', 'instaerect'],
	cooldown: 1,
	execute(message, args, client, Client, Discord) {
		const srvconfig = client.settings.get(message.guild.id);
		let nick = message.member.displayName;
		if (args) {
			nick = args.join(' ');
			if (nick.startsWith('<@') && nick.endsWith('>')) {
				let mention = nick.slice(2, -1);
				if (mention.startsWith('!')) mention = mention.slice(1);
				nick = client.users.cache.get(mention).username;
			}
		}
		const hard = Math.round(Math.random());
		let hardtxt = 'soft';
		if (hard == '1') hardtxt = 'hard';
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.round(Math.random() * 16777215))
			.setTitle(`${nick}'s ${hardtxt} pp size`);
		if (Math.round(Math.random() * 10) == 5) {
			Embed.setDescription('SIKE').setFooter(`${nick} has no pp`);
			message.channel.send(Embed);
			return;
		}
		const random = Math.round(Math.random() * srvconfig.maxppsize);
		Embed.setDescription('8' + '='.repeat(random - 1) + 'D').setFooter(`${hardtxt} pp size = ${random}"`);
		message.channel.send(Embed);
	},
};