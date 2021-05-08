module.exports = {
	name: 'settings',
	description: 'Configure Pup\'s Guild settings',
	guildOnly: true,
	cooldown: 1,
	options: [{
		type: 3,
		name: 'setting',
		description: 'The setting you want to change',
		choices: [{
			name: 'prefix',
			value: 'prefix',
		},
		{
			name: 'simpreaction',
			value: 'simpreaction',
		},
		{
			name: 'leavemessage',
			value: 'leavemessage',
		},
		{
			name: 'joinmessage',
			value: 'joinmessage',
		},
		{
			name: 'adfree',
			value: 'adfree',
		},
		{
			name: 'maxppsize',
			value: 'maxppsize',
		},
		{
			name: 'tickets',
			value: 'tickets',
		},
		{
			name: 'bonercmd',
			value: 'bonercmd',
		},
		{
			name: 'ticketlogchannel',
			value: 'ticketlogchannel',
		},
		{
			name: 'ticketcategory',
			value: 'ticketcategory',
		},
		{
			name: 'ticketmention',
			value: 'ticketmention',
		},
		{
			name: 'supportrole',
			value: 'supportrole',
		}],
	},
	{
		type: 3,
		name: 'value',
		description: 'The value to set the setting to',
	}],
	permissions: 'ADMINISTRATOR',
	async execute(interaction, args, client, Client, Discord) {
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.floor(Math.random() * 16777215))
			.setTitle('Bot Settings');
		if (args) {
			if (!args[1]) return;
			if (args[0].value == 'maxppsize') {
				if (args[1].value > 75) {
					return client.api.interactions(interaction.id, interaction.token).callback.post({
						data: {
							type: 4,
							data: {
								content: 'You can only set maxppsize as less than 76!',
								flags: 64,
							},
						},
					});
				}
			}
			if (['simpreaction', 'adfree', 'listsort', 'tickets'].some(word => args[0].value.includes(word))) {
				if (!['true', 'false'].some(word => args[1].value.includes(word))) {
					return client.api.interactions(interaction.id, interaction.token).callback.post({
						data: {
							type: 4,
							data: {
								content: 'You can only set this as true or false!',
								flags: 64,
							},
						},
					});
				}
			}
			const prop = args[0].value;
			const value = args[1].value;
			if(!client.settings.has(interaction.guild_id, prop)) {
				return client.api.interactions(interaction.id, interaction.token).callback.post({
					data: {
						type: 4,
						data: {
							content: 'Invalid setting!',
							flags: 64,
						},
					},
				});
			}
			client.settings.set(interaction.guild_id, value.replace(/"/g, ''), prop);
			Embed.setDescription(`Successfully set \`${prop}\` to \`${value.replace(/"/g, '')}\``);
		}
		else {
			const desc = {
				prefix: '*The bot\'s prefix (You can use double quotes (") to include spaces)*',
				simpreaction: '*Reacts with "SIMP" on messages with simpy words (true/false)*',
				leavemessage: '*Can be either false or the message text itself.\nVariables: {USER MENTION} {USER TAG}*',
				joinmessage: '*Can be either false or the message text itself.\nVariables: {USER MENTION} {USER TAG}*',
				adfree: '*Gets rid of all references to other servers (true/false)*',
				maxppsize: '*Maximum pp size in pp and instapp commands*',
				tickets: '*Enables tickets (true/false)*',
				bonercmd: '*Toggles boner command (true/false)*',
				ticketlogchannel: '*The channel where the bot puts transcripts of tickets\nCan be either false or the channel ID*',
				ticketcategory: '*The category where the bot creates tickets in\nMust be a category ID*',
				supportrole: '*The ticket support team role\nCan be either false or the role ID*',
				ticketmention: '*Pings @everyone every time a new ticket is created*',
			};
			const srvconfig = Object.keys(client.settings.get(interaction.guild_id)).map(prop => {
				return `**${prop}**\n${desc[prop]}\n\`${client.settings.get(interaction.guild_id)[prop]}\``;
			});
			Embed.setDescription(srvconfig.join('\n')).addField('Usage', '`/settings [<Setting> <Value>]`');
		}
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