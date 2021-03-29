module.exports = {
	name: 'instaboner',
	description: 'See your pp grow FAST',
	cooldown: 1,
	guildOnly: false,
	async execute(interaction, args, client, Client, Discord) {
		const srvconfig = client.settings.get(interaction.guild_id);
		const hard = Math.round(Math.random());
		let nick = interaction.member.user.username;
		if (interaction.member.nick !== null) nick = interaction.member.nick;
		let hardtxt = 'soft';
		if (hard == '1') hardtxt = 'hard';
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.round(Math.random() * 16777215))
			.setTitle(`${nick}'s ${hardtxt} pp size`);
		if (Math.round(Math.random() * 10) == 5) {
			Embed.setDescription('SIKE').setFooter('u have no pp');
			await client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						embeds: [Embed],
					},
				},
			});
			return;
		}
		const random = Math.round(Math.random() * srvconfig.maxppsize);
		Embed.setDescription('8' + '='.repeat(random - 1) + 'D').setFooter(`${hardtxt} pp size = ${random}"`);
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