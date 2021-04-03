module.exports = {
	name: 'dm',
	description: 'DM someone through Pup bot.',
	options: [{
		type: 6,
		name: 'user',
		description: 'User to DM',
		required: true,
	},
	{
		type: 3,
		name: 'message',
		description: 'Message to send',
		required: true,
	}],
	async execute(interaction, args, client, Client, Discord) {
		if (interaction.guild_id == '661736128373719141' && !client.guilds.cache.get('661736128373719141').members.cache.get(interaction.member.user.id).roles.cache.has('699724468469366844')) return;
		else if (interaction.member.user.id !== '249638347306303499') return;
		client.users.cache.get(args[0].value).send(args[1].value);
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.round(Math.random() * 16777215))
			.setDescription(`**Message sent to ${client.users.cache.get(args[0].value)}!**\n**Content:** ${args[1].value}\nTo see the response, see ${client.channels.cache.get('776992487537377311')}`);
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
