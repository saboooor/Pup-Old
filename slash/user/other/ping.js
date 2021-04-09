module.exports = {
	name: 'ping',
	description: 'Pong!',
	cooldown: 2,
	execute(interaction, args, client, Client, Discord) {
		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: `Pong! ${Date.now() - Discord.SnowflakeUtil.deconstruct(interaction.id).timestamp}ms`,
					flags: 64,
				},
			},
		});
	},
};