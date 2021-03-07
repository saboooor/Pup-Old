module.exports = {
	name: 'boner',
	aliases: ['pp', 'penis', 'erect'],
	cooldown: 10,
	guildOnly: false,
	async execute(message, args, client, sleep, config, Client, Discord) {
		const srvconfig = client.settings.get(message.guild.id);
		if (client.pp == '1') return message.reply(`Command is busy, please wait!\nWe limit this command to one person at a time to maximize performance, in the meantime consider using ${srvconfig.prefix}instapp`)
		client.pp = '1';
		const random = Math.round(Math.random() * srvconfig.maxppsize);
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.round(Math.random() * 16777215))
			.setTitle(`${message.member.displayName}'s pp size`)
			.setDescription('Calculating...');
		const pp = await message.channel.send(Embed);
		const shaft = [];
		for (let step = 0; step < random; step++) {
			sleep(1000);
			Embed.setDescription('8' + shaft.join('') + 'D');
			await pp.edit (Embed);
			shaft.push('=');
		}
		const sike = Math.round(Math.random() * 10);
		if (sike == 5) {
			Embed.setDescription('SIKE').setFooter('u have no pp');
			pp.edit(Embed);
			return;
		}
		Embed.setFooter(`pp size = ${random}"`);
		pp.edit(Embed);
		client.pp = '0';
	},
};