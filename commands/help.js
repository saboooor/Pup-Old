module.exports = {
	name: 'help',
	aliases: ['commands'],
	cooldown: 10,
	guildOnly: false,
	async execute(message, args, client, sleep, config, Client, Discord) {
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.floor(Math.random() * 16777215))
			.setDescription(`**BOT FEATURES:**

- Sorts DiscordSRV 'list' command
- Simp reaction ( :regional_indicator_s: :regional_indicator_i: :regional_indicator_m: :regional_indicator_p: )
- @alerts reaction ( :tada: )
- Support tickets
- Suggestions
- Slur Autoban
- Control servers that use Pterodactyl (DM me)

**COMMANDS:**
*These commands can be used by anyone*

**${config.prefix}suggest <suggestion>**
Adds a suggestion to #suggestions
**${config.prefix}ping / ${config.prefix}pong**
Pong!
**${config.prefix}tts <message>**
Text to speech in voice chat pog
**${config.prefix}boner / ${config.prefix}pp / ${config.prefix}penis / ${config.prefix}erect**
See pp size
**${config.prefix}instaboner / ${config.prefix}instapp / ${config.prefix}instapenis / ${config.prefix}instaerect**
See pp size but instant
**${config.prefix}pupstats**
Check pup's stats
**${config.prefix}invite**
Invite the bot to your server or join the bot's discord server!

**ADMIN COMMANDS:**
*These commands require the member to have specified permissions*

**${config.prefix}kick <member id or mention> <reason>**
Kicks a member
*Permission: Kick Members*
**${config.prefix}ban <member id or mention> <reason>**
Bans a member
*Permission: Ban Members*
**${config.prefix}clear <message amount> / ${config.prefix}purge**
Clear a lot of messages at once
*Permission: Delete Messages*
**${config.prefix}react <message id> <emoji>**
React with the bot
*Permission: Administrator*
**${config.prefix}approve <message id> [response] / ${config.prefix}accept**
Approve a suggestion
*Permission: Administrator*
**${config.prefix}deny <message id> [response] / ${config.prefix}decline**
Deny a suggestion
*Permission: Administrator*
**${config.prefix}support**
Walks you through how to setup support tickets in your guild
*Permission: Administrator*

**Still need help with the bot? Do ${config.prefix}invite!**`);
		await message.channel.send(Embed);
	},
};