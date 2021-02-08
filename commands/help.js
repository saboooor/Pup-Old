/* eslint-disable no-control-regex */
module.exports = {
	name: 'help',
	aliases: ['commands'],
	cooldown: 10,
	guildOnly: false,
	async execute(message, args, client, sleep, config, Client, Discord) {
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.floor(Math.random() * 16777215));
		let arg = args[0];
		if (arg) arg = arg.toLowerCase();
		if (arg == 'commands') {
			Embed.setDescription(`**BOT FEATURES:**
			*This is what the bot can do other than commands*
			\`-help features\`
			
			**COMMANDS:**
			*These commands can be used by anyone*
			
			**${config.prefix}suggest <suggestion>**
			Suggest something (Automatically goes to #suggestions if it exists)
			**${config.prefix}poll**
			Create a poll (Automatically goes to #polls if it exists)
			**${config.prefix}ping / ${config.prefix}pong**
			The bot's ping (Pong!)
			**${config.prefix}boner / ${config.prefix}pp / ${config.prefix}penis / ${config.prefix}erect**
			See pp size *suspense increases*
			**${config.prefix}instaboner / ${config.prefix}instapp / ${config.prefix}instapenis / ${config.prefix}instaerect**
			See pp size but speedy nyoom
			**${config.prefix}stats / status [Server]**
			Check the stats for pup or a Minecraft server
			**${config.prefix}invite**
			Invite the bot to your server or join the discord server where the bot's home is!
			
			**ADMIN COMMANDS:**
			*These commands require the member to have specified permissions*
			\`-help admin\`
			
			**Want to support the bot? [Donate here!](https;//paypal.me/youhavebeenyoted)**
			**Still need help with the bot? Do ${config.prefix}invite!**`
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
			\`-help commands\`
			
			**ADMIN COMMANDS:**
			*These commands require the member to have specified permissions*
			\`-help admin\`
			
			**Want to support the bot? [Donate here!](https;//paypal.me/youhavebeenyoted)**
			**Still need help with the bot? Do ${config.prefix}invite!**`
				.replace(/	/, ''));
		}
		else if (arg == 'admin') {
			Embed.setDescription(`**BOT FEATURES:**
			*This is what the bot can do other than commands*
			\`-help features\`
			
			**COMMANDS:**
			*These commands can be used by anyone*
			\`-help commands\`
			
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
			*Permission: Send Messages*
			**${config.prefix}approve <message id> [response] / ${config.prefix}accept**
			Approve a suggestion
			*Permission: Administrator*
			**${config.prefix}deny <message id> [response] / ${config.prefix}decline**
			Deny a suggestion
			*Permission: Administrator*
			**${config.prefix}support**
			Walks you through how to setup support tickets in your guild
			*Permission: Administrator*
			
			**Want to support the bot? [Donate here!](https;//paypal.me/youhavebeenyoted)**
			**Still need help with the bot? Do ${config.prefix}invite!**`
				.replace(/	/, ''));
		}
		else {
			Embed.setDescription(`**BOT FEATURES:**
			*This is what the bot can do other than commands*
			\`-help features\`
			
			**COMMANDS:**
			*These commands can be used by anyone*
			\`-help commands\`
			
			**ADMIN COMMANDS:**
			*These commands require the member to have specified permissions*
			\`-help admin\`
			
			**Want to support the bot? [Donate here!](https;//paypal.me/youhavebeenyoted)**
			**Still need help with the bot? Do ${config.prefix}invite!**`
				.replace(/	/, ''));
		}
		await message.channel.send(Embed);
	},
};