module.exports = {
	name: 'settings',
	aliases: ['setting'],
	guildOnly: true,
	async execute(message, args, client, config, Client, Discord) {
		if (args[1]) {
			if (!message.member.hasPermission('ADMINISTRATOR')) {
				if (message.author.id !== '249638347306303499') return message.reply('You can\'t do that!');
			}
			if (args[0] == 'maxppsize') {
				if (args[1] > 75) return message.reply('You can\'t set maxppsize to a number over 75!');
			}
			if (['slurban', 'simpreaction', 'adfree', 'listsort', 'tickets'].some(word => args[0].toLowerCase().includes(word))) {
				if (!['true', 'false'].some(word => args[1].toLowerCase().includes(word))) return message.reply('You can only set this as true or false!');
			}
			const [prop, ...value] = args;
			if(!client.settings.has(message.guild.id, prop)) {
				return message.reply('Invalid setting!');
			}
			client.settings.set(message.guild.id, value.join(' ').replace(/"/g, ''), prop);
		}
		const desc = {
			prefix: '*The bot\'s prefix (You can use double quotes (") to include spaces)*',
			slurban: '*Bans people who say slurs (true/false)*',
			simpreaction: '*Reacts with "SIMP" on messages with simpy words (true/false)*',
			leavemessage: '*Can be either false or the message text itself.\nVariables: {USER MENTION} {USER TAG}*',
			joinmessage: '*Can be either false or the message text itself.\nVariables: {USER MENTION} {USER TAG}*',
			adfree: '*Gets rid of all references to other servers (true/false)*',
			listsort: '*Sorts DiscordSRV playerlist (true/false)*',
			maxppsize: '*Maximum pp size in pp and instapp commands*',
			tickets: '*Enables tickets (true/false)*'
		};
		const srvconfig = Object.keys(client.settings.get(message.guild.id)).map(prop => {
			return `**${prop}**\n${desc[prop]}\n\`${client.settings.get(message.guild.id)[prop]}\``;
		});
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.floor(Math.random() * 16777215))
			.setTitle('Bot Settings')
			.setDescription(srvconfig.join('\n'))
			.addField('Usage', `\`${client.settings.get(message.guild.id).prefix}settings [<Setting> <Value>]\``);
		message.channel.send(Embed);
	},
};