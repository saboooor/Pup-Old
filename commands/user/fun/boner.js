function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
module.exports = {
	name: 'boner',
	description: 'See your pp grow',
	aliases: ['pp', 'penis', 'erect'],
	cooldown: 10,
	guildOnly: false,
	async execute(message, args, client, Client, Discord) {
		const srvconfig = client.settings.get(message.guild.id);
		const random = Math.round(Math.random() * srvconfig.maxppsize);
		let nick = message.member.displayName;
		if (args) {
			nick = args.join(' ');
			if (nick.startsWith('<@') && nick.endsWith('>')) {
				let mention = nick.slice(2, -1);
				if (mention.startsWith('!')) mention = mention.slice(1);
				nick = client.users.cache.get(mention).username;
			}
		}
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.round(Math.random() * 16777215))
			.setTitle(`${nick}'s pp size`)
			.setDescription('Calculating...');
		const pp = await message.channel.send(Embed);
		const shaft = [];
		for (let step = 0; step < random; step++) {
			await sleep(1000);
			Embed.setDescription('8' + shaft.join('') + 'D');
			await pp.edit (Embed);
			shaft.push('=');
		}
		const sike = Math.round(Math.random() * 10);
		if (sike == 5) {
			Embed.setDescription('SIKE').setFooter(`${nick} has no pp`);
			pp.edit(Embed);
			return;
		}
		Embed.setFooter(`pp size = ${random}"`);
		pp.edit(Embed);
	},
};