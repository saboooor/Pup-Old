module.exports = {
	name: 'ping',
	description: 'Pong!',
	cooldown: 2,
	guildOnly: false,
	execute(interaction, args, client, Client, Discord) {
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.floor(Math.random() * 16777215))
			.setTitle('Pong!')
			.setDescription(`${Date.now() - Discord.SnowflakeUtil.deconstruct(interaction.id).timestamp}ms`);
		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					embeds: [Embed],
				},
			},
		});
	},
};