module.exports = {
	name: 'invite',
	description: 'Get pup invite links',
	cooldown: 10,
	async execute(interaction, args, client, Client, Discord) {
		let srvconfig = [];
		if (client.channels.cache.get(interaction.channel_id).type == 'dm') {
			srvconfig.adfree = 'false';
		}
		else {
			srvconfig = client.settings.get(interaction.guild_id);
		}
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.round(Math.random() * 16777215))
			.addField('**Add the bot:**', '[Invite the bot to your server using this link!](https://discord.com/api/oauth2/authorize?client_id=765287593762881616&permissions=2184703062&scope=bot%20applications.commands)')
			.addField('**Add the bot (Admin):**', '[Invite the bot to your server using this link!](https://discord.com/api/oauth2/authorize?client_id=765287593762881616&permissions=8&scope=bot%20applications.commands)')
			.addField('**Bot Support:**', '[Join the bot\'s discord server!](https://discord.gg/Bsefgbaedz)');
		if (srvconfig.adfree == 'false') Embed.addField('**Nether Depths:**', '[Also check out Nether Depths!](https://discord.gg/g7hSukX)');
		await client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					embeds: [Embed],
				},
			},
		});
	},
};