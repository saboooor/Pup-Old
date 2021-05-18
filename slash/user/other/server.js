const moment = require('moment');
module.exports = {
	name: 'server',
	description: 'Discord server info',
	cooldown: 10,
	guildOnly: true,
	async execute(interaction, args, client, Client, Discord) {
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.round(Math.random() * 16777215))
			.setAuthor(client.guilds.cache.get(interaction.guild_id).name, client.guilds.cache.get(interaction.guild_id).iconURL())
			.setFooter(`Owner: ${client.users.cache.get(client.guilds.cache.get(interaction.guild_id).ownerID).username}`, client.users.cache.get(client.guilds.cache.get(interaction.guild_id).ownerID).avatarURL())
			.addField('Members', client.guilds.cache.get(interaction.guild_id).members.cache.size)
			.addField('Channels', client.guilds.cache.get(interaction.guild_id).channels.cache.size)
			.addField('Creation Date', moment(client.guilds.cache.get(interaction.guild_id).createdAt));
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