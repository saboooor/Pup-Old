function minTwoDigits(n) {
	return (n < 10 ? '0' : '') + n;
}
module.exports = {
	name: 'kick',
	description: 'Kick someone with a reason',
	guildOnly: true,
	permissions: 'KICK_MEMBERS',
	cooldown: 5,
	options: [{
		type: 6,
		name: 'user',
		description: 'User to kick',
		required: true,
	},
	{
		type: 3,
		name: 'reason',
		description: 'Reason of kick',
	}],
	async execute(interaction, args, client, Client, Discord) {
		const user = client.users.cache.get(args[0].value);
		const member = client.guilds.cache.get(interaction.guild_id).members.cache.get(args[0].value);
		const author = client.guilds.cache.get(interaction.guild_id).members.cache.get(interaction.member.user.id);
		if (member.roles.highest.rawPosition > author.roles.highest.rawPosition) {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'You can\'t do that! Your role is lower than the user\'s role!',
						flags: 64,
					},
				},
			});
		}
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.round(Math.random() * 16777215));
		if (args[1]) {
			Embed.setTitle(`Kicked ${user.tag} for ${args[1].value}`);
			await user.send(`**You've been kicked from ${client.guilds.cache.get(interaction.guild_id).name} for ${args[1].value}**`).catch(e => {
				client.channels.cache.get(interaction.channel_id).send('Could not DM user! You may have to manually let them know that they have been kicked.');
			});
		}
		else {
			Embed.setTitle(`Kicked ${user.tag}`);
			await user.send(`**You've been kicked from ${client.guilds.cache.get(interaction.guild_id).name}.**`).catch(e => {
				client.channels.cache.get(interaction.channel_id).send('Could not DM user! You may have to manually let them know that they have been kicked.');
			});
		}
		await client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					embeds: [Embed],
				},
			},
		});
		await member.kick().catch(e => client.channels.cache.get(interaction.channel_id).send(`\`${`${e}`.split('at')[0]}\``));
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		console.log(`[${time} INFO]: Kicked user: ${user.tag} from ${client.guilds.cache.get(interaction.guild_id).name}`);
	},
};