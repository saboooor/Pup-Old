module.exports = {
	name: 'instaboner',
	aliases: ['instapp', 'instapenis', 'instaerect'],
	cooldown: 10,
	guildOnly: false,
	async execute(message, args, client, sleep, config, Client, Discord) {
		const random = Math.round(Math.random() * 35);
		let penis = '8D';
		for (let step = 0; step < random; step++) {
			penis = penis.replace('=', '==').replace('8D', '8=D');
		}
		const Embed = new Discord.MessageEmbed().setColor(Math.round(Math.random() * 16777215)).setTitle(`${message.member.displayName}'s pp size`);
		const sike = Math.round(Math.random() * 10);
		if (sike == 5) {
			Embed.setDescription('sike bitch').setFooter('u have no pp');
			await message.channel.send(Embed);
			return;
		}
		Embed.setDescription(penis).setFooter(`pp size = ${random}"`);
		await message.channel.send(Embed);
		return;

	},
};