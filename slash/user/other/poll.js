function isEven(value) {
	if (value % 2 == 0) {
		return true;
	}
	else {
		return false;
	}
}
module.exports = {
	name: 'poll',
	description: 'Create a poll',
	cooldown: 10,
	guildOnly: true,
	options: [{
		type: 3,
		name: 'type',
		description: 'The type of poll you want to post',
		required: true,
		choices: [{
			name: 'yesno',
			value: 'yesno',
		},
		{
			name: 'choices',
			value: 'choices',
		}],
	},
	{
		type: 3,
		name: 'question',
		description: 'The poll question',
		required: true,
	},
	{
		type: 3,
		name: 'emoji1',
		description: 'The emoji for the first option',
	},
	{
		type: 3,
		name: 'option1',
		description: 'The first option',
	},
	{
		type: 3,
		name: 'emoji2',
		description: 'The emoji for the second option',
	},
	{
		type: 3,
		name: 'option2',
		description: 'The second option',
	},
	{
		type: 3,
		name: 'emoji3',
		description: 'The emoji for the third option',
	},
	{
		type: 3,
		name: 'option3',
		description: 'The third option',
	},
	{
		type: 3,
		name: 'emoji4',
		description: 'The emoji for the fourth option',
	},
	{
		type: 3,
		name: 'option4',
		description: 'The fourth option',
	},
	{
		type: 3,
		name: 'emoji5',
		description: 'The emoji for the fifth option',
	},
	{
		type: 3,
		name: 'option5',
		description: 'The fifth option',
	},
	{
		type: 3,
		name: 'emoji6',
		description: 'The emoji for the sixth option',
	},
	{
		type: 3,
		name: 'option6',
		description: 'The sixth option',
	},
	{
		type: 3,
		name: 'emoji7',
		description: 'The emoji for the seventh option',
	},
	{
		type: 3,
		name: 'option7',
		description: 'The seventh option',
	},
	{
		type: 3,
		name: 'emoji8',
		description: 'The emoji for the eighth option',
	},
	{
		type: 3,
		name: 'option8',
		description: 'The eighth option',
	},
	{
		type: 3,
		name: 'emoji9',
		description: 'The emoji for the ninth option',
	},
	{
		type: 3,
		name: 'option9',
		description: 'The ninth option',
	},
	{
		type: 3,
		name: 'emoji10',
		description: 'The emoji for the tenth option',
	},
	{
		type: 3,
		name: 'option10',
		description: 'The tenth option',
	}],
	async execute(interaction, args, client, Client, Discord) {
		const channel = client.guilds.cache.get(interaction.guild_id).channels.cache.find(c => c.name.includes('polls'));
		const Poll = new Discord.MessageEmbed()
			.setColor(3447003)
			.setTitle('Poll')
			.setAuthor(interaction.member.user.username, `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.webp`);
		if (args[0].value.toLowerCase() == 'yesno') {
			Poll.setDescription(args[1].value);
			if (channel) {
				const pp = await channel.send(Poll);
				await pp.react(client.config.yes);
				await pp.react(client.config.no);
				await client.api.interactions(interaction.id, interaction.token).callback.post({
					data: {
						type: 4,
						data: {
							content: `**Poll created! Check <#${channel.id}>**`,
						},
					},
				});
			}
			else {
				await client.api.interactions(interaction.id, interaction.token).callback.post({
					data: {
						type: 4,
						data: {
							embeds: [Poll],
						},
					},
				});
				const msg = await client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({ data: {} });
				const pp = new Discord.Message(client, msg, client.channels.cache.get(msg.channel_id));
				await pp.react(client.config.yes);
				await pp.react(client.config.no);
			}
		}
		else if (args[0].value.toLowerCase() == 'choices') {
			const emojis = [];
			const options = [];
			args.forEach(arg => {
				if (arg.name.includes('emoji')) {
					emojis.push(arg.value);
				}
				else if (arg.name.includes('option')) {
					options.push(arg.value);
				}
			});
			const combine = [];
			emojis.forEach(emoji => {
				combine.push('\n');
				combine.push(emoji);
				combine.push(' ');
				combine.push(options[emojis.indexOf(emoji)]);
			});
			Poll.setDescription(`${args[1].value}${combine.join('')}`);
			if (channel) {
				const pp = await channel.send(Poll);
				emojis.forEach(emoji => {
					pp.react(emoji).catch(error => {
						return;
					});
				});
				await client.api.interactions(interaction.id, interaction.token).callback.post({
					data: {
						type: 4,
						data: {
							content: `**Poll created! Check <#${channel.id}>**`,
						},
					},
				}).catch(error => {return;});
			}
			else {
				await client.api.interactions(interaction.id, interaction.token).callback.post({
					data: {
						type: 4,
						data: {
							embeds: [Poll],
						},
					},
				}).catch(error => {return;});
				const msg = await client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({ data: {} });
				const pp = new Discord.Message(client, msg, client.channels.cache.get(msg.channel_id));
				emojis.forEach(emoji => {
					pp.react(emoji).catch(error => {
						return;
					});
				});
			}
		}
	},
};