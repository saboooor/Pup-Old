module.exports = {
	name: 'boner',
	aliases: ['pp', 'penis', 'erect'],
	cooldown: 10,
	guildOnly: false,
	async execute(message, args, client, sleep, config, Client, Discord) {
		const random = Math.round(Math.random() * 35);
		const Embed = new Discord.MessageEmbed().setColor(Math.round(Math.random() * 16777215)).setTitle(`${message.member.displayName}'s pp size`).setDescription('Calculating...');
		const pp = await message.channel.send(Embed);
		const shaft = [];
		const randomcolor = Math.round(Math.random() * 16777215);
		const ms = 1000;
		for (let step = 0; step < random; step++) {
			sleep(ms);
			Embed.setDescription('8' + shaft + 'D');
			pp.edit (Embed);
			shaft.push('=');
		}
		const sike = Math.round(Math.random() * 10);
		if (sike == 5) {
			Embed.setDescription('SIKE BITCH').setFooter('u have no pp');
			pp.edit(Embed);
			return;
		}
		Embed.setFooter(`pp size = ${random}"`);
		pp.edit(Embed);
	},
};