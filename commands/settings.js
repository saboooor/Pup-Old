module.exports = {
	name: 'settings',
	aliases: ['setting'],
	guildOnly: true,
	async execute(message, args, client, sleep, config, Client, Discord) {
		if (args[1]) {
			if (!message.member.hasPermission('ADMINISTRATOR')) {
				if (message.author.id !== '249638347306303499') return message.reply('You can\'t do that!');
			}
			const [prop, ...value] = args;
			if(!client.settings.has(message.guild.id, prop)) {
				return message.reply("Invalid setting!");
			}
			client.settings.set(message.guild.id, value.join(" ").replace(/"/g, ''), prop);
		}
		const desc = {
			prefix: '*The bot\'s prefix*',
			slurban: '*Bans people who say slurs (true/false)*',
			simpreaction: '*Reacts with "SIMP" on messages with simpy words (true/false)*',
			leavemessage: '*Can be either false or the message text itself.\nVariables: {USER MENTION} {USER TAG}*'
		}
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