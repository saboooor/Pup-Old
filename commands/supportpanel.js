module.exports = {
	name: 'supportpanel',
	cooldown: 10,
	guildOnly: true,
	async execute(message, args, client, sleep, config, Client, Discord) {
		await message.delete();
		if (!message.member.permissions.has('ADMINISTRATOR')) return;
		if (!message.channel.name.includes('support')) return message.reply('This command is only executable in the support channel!');
		const Embed = new Discord.MessageEmbed()
			.setColor(3447003)
			.setTitle('Need help? No problem!')
			.setDescription('React with 🎫 to open a ticket!')
			.setFooter(`${message.guild.name} Support`, message.guild.iconURL());
		const msg = await message.channel.send(Embed);
		await msg.react('🎫');
	},
};