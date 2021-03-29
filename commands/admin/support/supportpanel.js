module.exports = {
	name: 'supportpanel',
	description: 'Send the support ticket embed',
	cooldown: 30,
	guildOnly: true,
	async execute(message, args, client, Client, Discord) {
		await message.delete();
		if (!message.member.permissions.has('ADMINISTRATOR')) return;
		const Embed = new Discord.MessageEmbed()
			.setColor(3447003)
			.setTitle('Need help? No problem!')
			.setDescription('React with 🎫 to open a ticket!')
			.setFooter(`${message.guild.name} Support`, message.guild.iconURL());
		const msg = await message.channel.send(Embed);
		await msg.react('🎫');
	},
};