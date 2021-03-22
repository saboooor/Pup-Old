/* eslint-disable no-control-regex */
module.exports = {
	name: 'help',
	aliases: ['commands'],
	cooldown: 10,
	guildOnly: false,
	async execute(message, args, client, config, Client, Discord) {
		let srvconfig = [];
		if (message.guild) {
			srvconfig = client.settings.get(message.guild.id);
		}
		else {
			srvconfig.prefix = '-';
		}
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.floor(Math.random() * 16777215));
		let arg = args[0];
		if (arg) arg = arg.toLowerCase();
		if (arg == 'commands') {
			Embed.setDescription(`**BOT FEATURES:**
*This is what the bot can do other than commands*
\`${srvconfig.prefix}help features\`

**COMMANDS:**
*These commands can be used by anyone*

**${srvconfig.prefix}suggest <suggestion>**
Suggest something (Automatically goes to #suggestions if it exists)
**${srvconfig.prefix}poll**
Creates a poll (Automatically goes to #polls if it exists)
**${srvconfig.prefix}ticket <message>**
Creates a ticket (Alias: ${srvconfig.prefix}new)
**${srvconfig.prefix}open / close**
Opens and closes a ticket
**${srvconfig.prefix}add / remove <User Mention or ID>**
Adds and removes people from a ticket
**${srvconfig.prefix}delete**
Deletes a ticket
**${srvconfig.prefix}ping**
The bot's ping (Pong!) (Alias: ${srvconfig.prefix}pong)
**${srvconfig.prefix}boner**
See pp size *suspense increases* (Aliases: ${srvconfig.prefix}pp, ${srvconfig.prefix}penis, ${srvconfig.prefix}erect)
**${srvconfig.prefix}instaboner**
See pp size but speedy nyoom (Aliases: ${srvconfig.prefix}instapp, ${srvconfig.prefix}instapenis, ${srvconfig.prefix}instaerect)
**${srvconfig.prefix}react <message id> <emoji>**
React with the bot
**${srvconfig.prefix}stats [Server]**
Check the stats for pup or a Minecraft server (Alias: ${srvconfig.prefix}status)
**${srvconfig.prefix}invite**
Invite the bot to your server or join the discord server where the bot's home is!

**NSFW COMMANDS:**
*NSFW commands :flushed:*
\`${srvconfig.prefix}help nsfw\`

**ADMIN COMMANDS:**
*These commands require the member to have specified permissions*
\`${srvconfig.prefix}help admin\`

**Want to support the bot? [Donate here!](https://paypal.me/youhavebeenyoted)**
**Still need help with the bot? Do ${srvconfig.prefix}invite!**`);
		}
		else if (arg == 'features') {
			Embed.setDescription(`**BOT FEATURES:**
*This is what the bot can do other than commands*

- Support tickets
- Suggestions
- Slur Autoban
- More (DM me if you want me to do something that I don't already do!)

**COMMANDS:**
*These commands can be used by anyone*
\`${srvconfig.prefix}help commands\`

**NSFW COMMANDS:**
*NSFW commands :flushed:*
\`${srvconfig.prefix}help nsfw\`

**ADMIN COMMANDS:**
*These commands require the member to have specified permissions*
\`${srvconfig.prefix}help admin\`

**Want to support the bot? [Donate here!](https://paypal.me/youhavebeenyoted)**
**Still need help with the bot? Do ${srvconfig.prefix}invite!**`);
		}
		else if (arg == 'admin') {
			Embed.setDescription(`**BOT FEATURES:**
*This is what the bot can do other than commands*
\`${srvconfig.prefix}help features\`

**COMMANDS:**
*These commands can be used by anyone*
\`${srvconfig.prefix}help commands\`

**NSFW COMMANDS:**
*NSFW commands :flushed:*
\`${srvconfig.prefix}help nsfw\`

**ADMIN COMMANDS:**
*These commands require the member to have specified permissions*

**${srvconfig.prefix}settings [<Setting> <Value>]**
Configure the bot
*Permission: Administrator*
**${srvconfig.prefix}kick <member id or mention> <reason>**
Kicks a member
*Permission: Kick Members*
**${srvconfig.prefix}ban <member id or mention> <reason>**
Bans a member
*Permission: Ban Members*
**${srvconfig.prefix}clear <message amount>**
Clear a lot of messages at once (Alias: ${srvconfig.prefix}purge)
*Permission: Delete Messages*
**${srvconfig.prefix}approve <message id> [response]**
Approve a suggestion (Alias: ${srvconfig.prefix}accept)
*Permission: Administrator*
**${srvconfig.prefix}deny <message id> [response]**
Deny a suggestion (Alias: ${srvconfig.prefix}decline)
*Permission: Administrator*
**${srvconfig.prefix}support**
Walks you through how to setup support tickets in your guild
*Permission: Administrator*

**Want to support the bot? [Donate here!](https://paypal.me/youhavebeenyoted)**
**Still need help with the bot? Do ${srvconfig.prefix}invite!**`);
		}
		else if (arg == 'nsfw') {
			Embed.setDescription(`**BOT FEATURES:**
*This is what the bot can do other than commands*
\`${srvconfig.prefix}help features\`

**COMMANDS:**
*These commands can be used by anyone*
\`${srvconfig.prefix}help commands\`

**NSFW COMMANDS:**
*NSFW commands :flushed:*

**${srvconfig.prefix}hentai**

**ADMIN COMMANDS:**
*These commands require the member to have specified permissions*
\`${srvconfig.prefix}help admin\`

**Want to support the bot? [Donate here!](https://paypal.me/youhavebeenyoted)**
**Still need help with the bot? Do ${srvconfig.prefix}invite!**`);
		}
		else {
			Embed.setDescription(`**BOT FEATURES:**
*This is what the bot can do other than commands*
\`${srvconfig.prefix}help features\`

**COMMANDS:**
*These commands can be used by anyone*
\`${srvconfig.prefix}help commands\`

**NSFW COMMANDS:**
*NSFW commands :flushed:*
\`${srvconfig.prefix}help nsfw\`

**ADMIN COMMANDS:**
*These commands require the member to have specified permissions*
\`${srvconfig.prefix}help admin\`

**Want to support the bot? [Donate here!](https://paypal.me/youhavebeenyoted)**
**Still need help with the bot? Do ${srvconfig.prefix}invite!**`);
		}
		await message.channel.send(Embed);
	},
};