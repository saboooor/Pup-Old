function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
module.exports = {
	name: 'boner',
	description: 'See your pp grow!',
	cooldown: 10,
	options: [{
		type: 3,
		name: 'someone',
		description: 'Pick someone for the bot to calculate the pp size of',
	}],
	async execute(interaction, args, client, Client, Discord) {
		let srvconfig = {};
		if (interaction.guild_id) {
			srvconfig = client.settings.get(interaction.guild_id);
			if (srvconfig.bonercmd == 'false') {
				return client.api.interactions(interaction.id, interaction.token).callback.post({
					data: {
						type: 4,
						data: {
							content: 'This command is disabled!',
							flags: 64,
						},
					},
				});
			}
		}
		else {
			srvconfig.maxppsize = 35;
		}
		const random = Math.round(Math.random() * srvconfig.maxppsize);
		let nick = interaction.member.user.username;
		if (interaction.member.nick) nick = interaction.member.nick;
		if (args) {
			nick = args[0].value;
			if (nick.startsWith('<@') && nick.endsWith('>')) {
				let mention = nick.slice(2, -1);
				if (mention.startsWith('!')) mention = mention.slice(1);
				nick = client.users.cache.get(mention).username;
			}
		}
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.round(Math.random() * 16777215))
			.setTitle(`${nick}'s pp size`)
			.setDescription('<a:loading:826611946258038805> Calculating...');
		await client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					embeds: [Embed],
				},
			},
		});
		const msg = await client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({ data: {} });
		const pp = new Discord.Message(client, msg, client.channels.cache.get(msg.channel_id));
		const shaft = [];
		for (let step = 0; step < random; step++) {
			await sleep(1200);
			Embed.setDescription('8' + shaft.join('') + 'D');
			pp.edit(Embed);
			shaft.push('=');
		}
		const sike = Math.round(Math.random() * 10);
		if (sike == 5) {
			Embed.setDescription('SIKE').setFooter(`${nick} has no pp`);
			pp.edit(Embed);
			return;
		}
		Embed.setFooter(`pp size = ${random}"`);
		pp.edit(Embed);
	},
};