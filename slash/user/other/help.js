/* eslint-disable no-control-regex */
module.exports = {
	name: 'help',
	description: 'Get help with Pup',
	cooldown: 2,
	guildOnly: false,
	options: [{
		type: 3,
		name: 'type',
		description: 'The type of help you need',
		required: true,
		choices: [{
			name: 'features',
			value: 'features',
		},
		{
			name: 'commands',
			value: 'commands',
		},
		{
			name: 'nsfw',
			value: 'nsfw',
		},
		{
			name: 'admin',
			value: 'admin',
		}],
	}],
	async execute(interaction, args, client, Client, Discord) {
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.floor(Math.random() * 16777215));
		let arg = args[0].value;
		if (arg) arg = arg.toLowerCase();
		if (arg == 'commands') {
			Embed.setDescription(`**BOT FEATURES:**
*This is what the bot can do other than commands*
\`/help features\`

**COMMANDS:**
*These commands can be used by anyone*

**/suggest <suggestion>**
Suggest something (Automatically goes to #suggestions if it exists)
**/poll**
Creates a poll (Automatically goes to #polls if it exists)
**/ticket <message>**
Creates a ticket (Alias: /new)
**/open / close**
Opens and closes a ticket
**/add / remove <User Mention or ID>**
Adds and removes people from a ticket
**/delete**
Deletes a ticket
**/ping**
The bot's ping (Pong!) (Alias: /pong)
**/boner [someone]**
See your or someone's pp size *suspense increases* (Aliases: /pp, /penis, /erect)
**/instaboner [someone]**
See your or someone's pp size but speedy nyoom (Aliases: /instapp, /instapenis, /instaerect)
**/react <message id> <emoji>**
React with the bot
**/stats [Server]**
Check the stats for pup or a Minecraft server (Alias: /status)
**/invite**
Invite the bot to your server or join the discord server where the bot's home is!

**NSFW COMMANDS:**
*NSFW commands :flushed:*
\`/help nsfw\`

**ADMIN COMMANDS:**
*These commands require the member to have specified permissions*
\`/help admin\`

**Want to support the bot? [Donate here!](https://paypal.me/youhavebeenyoted)**
**Still need help with the bot? Do /invite!**`);
		}
		else if (arg == 'features') {
			Embed.setDescription(`**BOT FEATURES:**
*This is what the bot can do other than commands*

- Support tickets
- Suggestions

**COMMANDS:**
*These commands can be used by anyone*
\`/help commands\`

**NSFW COMMANDS:**
*NSFW commands :flushed:*
\`/help nsfw\`

**ADMIN COMMANDS:**
*These commands require the member to have specified permissions*
\`/help admin\`

**Want to support the bot? [Donate here!](https://paypal.me/youhavebeenyoted)**
**Still need help with the bot? Do /invite!**`);
		}
		else if (arg == 'admin') {
			Embed.setDescription(`**BOT FEATURES:**
*This is what the bot can do other than commands*
\`/help features\`

**COMMANDS:**
*These commands can be used by anyone*
\`/help commands\`

**NSFW COMMANDS:**
*NSFW commands :flushed:*
\`/help nsfw\`

**ADMIN COMMANDS:**
*These commands require the member to have specified permissions*

**/settings [<Setting> <Value>]**
Configure the bot
*Permission: Administrator*
**/kick <member id or mention> <reason>**
Kicks a member
*Permission: Kick Members*
**/ban <member id or mention> <reason>**
Bans a member
*Permission: Ban Members*
**/clear <message amount>**
Clear a lot of messages at once (Alias: /purge)
*Permission: Delete Messages*
**/approve <message id> [response]**
Approve a suggestion (Alias: /accept)
*Permission: Administrator*
**/deny <message id> [response]**
Deny a suggestion (Alias: /decline)
*Permission: Administrator*
**/support**
Walks you through how to setup support tickets in your guild
*Permission: Administrator*

**Want to support the bot? [Donate here!](https://paypal.me/youhavebeenyoted)**
**Still need help with the bot? Do /invite!**`);
		}
		else if (arg == 'nsfw') {
			Embed.setDescription(`**BOT FEATURES:**
*This is what the bot can do other than commands*
\`/help features\`

**COMMANDS:**
*These commands can be used by anyone*
\`/help commands\`

**NSFW COMMANDS:**
*NSFW commands :flushed:*

**/hentai**

**ADMIN COMMANDS:**
*These commands require the member to have specified permissions*
\`/help admin\`

**Want to support the bot? [Donate here!](https://paypal.me/youhavebeenyoted)**
**Still need help with the bot? Do /invite!**`);
		}
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