module.exports = {
	name: 'invite',
	cooldown: 10,
	guildOnly: false,
	async execute(message, args, client, sleep, config, Client, Discord) {
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.round(Math.random() * 16777215))
			.setDescription('[**Invite the bot to your server using this invite link!**](https://discord.com/api/oauth2/authorize?client_id=765287593762881616&permissions=8&scope=bot)\n[**Join the bot\'s discord server!**](https://discord.gg/Bsefgbaedz)\n[**Also check out Nether Depths!**](https://discord.gg/g7hSukX)');
		await message.channel.send(Embed);
	},
};