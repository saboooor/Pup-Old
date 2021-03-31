function minTwoDigits(n) {
	return (n < 10 ? '0' : '') + n;
}
function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
module.exports = {
	name: 'clear',
	description: 'Delete multiple messages at once',
	guildOnly: true,
	permissions: 'MANAGE_MESSAGES',
	options: [{
		type: 4,
		name: 'amount',
		description: 'The amount of messages to clear',
	}],
	async execute(interaction, args, client, Client, Discord) {
		await client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 5,
			},
		});
		if (args[0].value > 100) {
			return client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({
				data: {
					content: 'You can only clear 100 messages at once!',
				},
			});
		}
		await client.channels.cache.get(interaction.channel_id).messages.fetch({ limit: args[0].value }).then(messages => {
			client.channels.cache.get(interaction.channel_id).bulkDelete(messages);
		});
		if (client.channels.cache.get(interaction.channel_id).name == 'global') {
			const consolechannel = client.guilds.cache.get(interaction.guild_id).channels.cache.find(c => c.name.includes('console'));
			if (!consolechannel) return;
			consolechannel.send('clearchat');
		}
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		console.log(`[${time} INFO]: Cleared ${args[0].value} messages from #${client.channels.cache.get(interaction.channel_id).name} in ${client.guilds.cache.get(interaction.guild_id).name}`);
		await client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({
			data: {
				content: `Cleared ${args[0].value} messages!`,
			},
		});
		const msg = await client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({ data: {} });
		const pp = new Discord.Message(client, msg, client.channels.cache.get(msg.channel_id));
		await sleep(5000);
		await pp.delete();
	},
};