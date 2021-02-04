module.exports = {
	name: 'invite',
	cooldown: 10,
	guildOnly: false,
	async execute(message, args, client, sleep, config, Client, Discord) {
		const randomcolor = Math.floor(Math.random() * 16777215);
		await message.channel.send({ embed: {
			color: randomcolor,
			description:
`[**Invite the bot to your server using this invite link!**](https://discord.com/api/oauth2/authorize?client_id=765287593762881616&permissions=8&scope=bot)
[**Join the bot's discord server!**](https://discord.gg/g7hSukX)`,
		} });
	},
};