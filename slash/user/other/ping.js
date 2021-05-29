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
					components: [
						{
							type: 1,
							components: [
								{
									type: 2,
									label: 'Click me to ping again!',
									style: 1,
									custom_id: 'ping_again',
								},
							],
						},
					],
				},
			},
		});
	},
};