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
			Create a poll (Automatically goes to #polls if it exists)
			**${srvconfig.prefix}ping / ${srvconfig.prefix}pong**
			The bot's ping (Pong!)
			**${srvconfig.prefix}boner / ${srvconfig.prefix}pp / ${srvconfig.prefix}penis / ${srvconfig.prefix}erect**
			See pp size *suspense increases*
			**${srvconfig.prefix}instaboner / ${srvconfig.prefix}instapp / ${srvconfig.prefix}instapenis / ${srvconfig.prefix}instaerect**
			See pp size but speedy nyoom
			**${srvconfig.prefix}stats / status [Server]**
			Check the stats for pup or a Minecraft server
			**${srvconfig.prefix}invite**
			Invite the bot to your server or join the discord server where the bot's home is!
			
			**ADMIN COMMANDS:**
			*These commands require the member to have specified permissions*
			\`${srvconfig.prefix}help admin\`
			
			**Want to support the bot? [Donate here!](https://paypal.me/youhavebeenyoted)**
			**Still need help with the bot? Do ${srvconfig.prefix}invite!**`
				.replace(/	/, ''));
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
			
			**ADMIN COMMANDS:**
			*These commands require the member to have specified permissions*
			\`${srvconfig.prefix}help admin\`
			
			**Want to support the bot? [Donate here!](https://paypal.me/youhavebeenyoted)**
			**Still need help with the bot? Do ${srvconfig.prefix}invite!**`
				.replace(/	/, ''));
		}
		else if (arg == 'admin') {
			Embed.setDescription(`**BOT FEATURES:**
			*This is what the bot can do other than commands*
			\`${srvconfig.prefix}help features\`
			
			**COMMANDS:**
			*These commands can be used by anyone*
			\`${srvconfig.prefix}help commands\`
			
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
			**${srvconfig.prefix}clear <message amount> / ${srvconfig.prefix}purge**
			Clear a lot of messages at once
			*Permission: Delete Messages*
			**${srvconfig.prefix}react <message id> <emoji>**
			React with the bot
			*Permission: Send Messages*
			**${srvconfig.prefix}approve <message id> [response] / ${srvconfig.prefix}accept**
			Approve a suggestion
			*Permission: Administrator*
			**${srvconfig.prefix}deny <message id> [response] / ${srvconfig.prefix}decline**
			Deny a suggestion
			*Permission: Administrator*
			**${srvconfig.prefix}support**
			Walks you through how to setup support tickets in your guild
			*Permission: Administrator*
			
			**Want to support the bot? [Donate here!](https://paypal.me/youhavebeenyoted)**
			**Still need help with the bot? Do ${srvconfig.prefix}invite!**`
				.replace(/	/, ''));
		}
		else {
			Embed.setDescription(`**BOT FEATURES:**
			*This is what the bot can do other than commands*
			\`${srvconfig.prefix}help features\`
			
			**COMMANDS:**
			*These commands can be used by anyone*
			\`${srvconfig.prefix}help commands\`
			
			**ADMIN COMMANDS:**
			*These commands require the member to have specified permissions*
			\`${srvconfig.prefix}help admin\`
			
			**Want to support the bot? [Donate here!](https://paypal.me/youhavebeenyoted)**
			**Still need help with the bot? Do ${srvconfig.prefix}invite!**`
				.replace(/	/, ''));
		}
		await message.channel.send(Embed);
	},
};