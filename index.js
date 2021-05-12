const start = Date.now();
const fs = require('fs');
const Discord = require('discord.js');
const nodeactyl = require('nodeactyl');
const fetch = require('node-fetch');
const Enmap = require('enmap');
const Client = nodeactyl.Client;
const moment = require('moment');
const cron = require('node-cron');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_PRESENCES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS'], allowedMentions: { parse: ['users', 'roles', 'everyone'], repliedUser: true } });
client.config = require('./config.json');
const guildnames = [];
function minTwoDigits(n) {
	return (n < 10 ? '0' : '') + n;
}
function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
function clean(text) {
	if (typeof (text) === 'string') {return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));}
	else {return text;}
}
client.login(client.config.token);
client.slashcommands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
const slashcommandFolders = fs.readdirSync('./slash');
for (const folder of slashcommandFolders) {
	const slashcommandFolders2 = fs.readdirSync(`./slash/${folder}`);
	for (const folder2 of slashcommandFolders2) {
		const slashcommandFiles = fs.readdirSync(`./slash/${folder}/${folder2}`).filter(file => file.endsWith('.js'));
		for (const file of slashcommandFiles) {
			const slashcommand = require(`./slash/${folder}/${folder2}/${file}`);
			client.slashcommands.set(slashcommand.name, slashcommand);
		}
	}
}

client.once('ready', () => {
	client.user.setPresence({ activities: [{ name: 'with you ;)', type: 'PLAYING' }], status: 'dnd' });
	client.channels.cache.get('812082273393704960').messages.fetch({ limit: 1 }).then(msg => {
		const mesg = msg.first();
		if (mesg.content !== 'Started Successfully!') client.channels.cache.get('812082273393704960').send('Started Successfully!');
	});
	client.guilds.cache.forEach(guild => {
		guildnames.push(guild.name);
	});
	client.slashcommands.forEach(async command => {
		const commands = await client.api.applications(client.user.id).commands.get();
		if (commands.find(c => c.name == command.name) && commands.find(c => c.description == command.description)) return;
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		await console.log(`[${time} INFO]: Detected ${command.name} has some changes! Updating command...`);
		await client.api.applications(client.user.id).commands.post({
			data: {
				name: command.name,
				description: command.description,
				options: command.options,
			},
		});
		await sleep(2000);
	});
	const rn = new Date();
	const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
	const timer = (Date.now() - start) / 1000;
	console.log(`[${time} INFO]: Done (${timer}s)! I am running!`);
});

client.settings = new Enmap({
	name: 'settings',
	autoFetch: true,
	fetchAll: false,
	cloneLevel: 'deep',
	autoEnsure: {
		prefix: client.config.prefix,
		simpreaction: 'true',
		leavemessage: 'false',
		joinmessage: 'false',
		adfree: 'false',
		maxppsize: '35',
		tickets: 'true',
		bonercmd: 'true',
		ticketlogchannel: 'false',
		ticketcategory: 'false',
		ticketmention: 'true',
		supportrole: 'Not Set',
	},
});
client.on('guildDelete', guild => {
	client.settings.delete(guild.id);
});
client.userdata = new Enmap({
	name: 'unsubbed',
	autoFetch: true,
	fetchAll: false,
	autoEnsure: {
		unsubbed: 'false',
	},
});
client.tickets = new Enmap({
	name: 'tickets',
	autoFetch: true,
	fetchAll: false,
	autoEnsure: {
		opener: null,
		resolved: 'false',
		users: [],
	},
});

client.ws.on('INTERACTION_CREATE', async interaction => {
	const command = client.slashcommands.get(interaction.data.name.toLowerCase());
	const args = interaction.data.options;
	if (!command) return;
	const { cooldowns } = client;
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (!interaction.member) {
		interaction.member = {
			user: interaction.user,
		};
	}

	if (timestamps.has(interaction.member.user.id)) {
		const expirationTime = timestamps.get(interaction.member.user.id) + cooldownAmount;
		const random = Math.floor(Math.random() * 4);
		const messages = ['Do I look like Usain Bolt to u?', 'BRUH IM JUST A DOG SLOW DOWN', 'can u not', 'leave me alone ;-;'];
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			const Embed = new Discord.MessageEmbed()
				.setColor(Math.round(Math.random() * 16777215))
				.setTitle(messages[random])
				.setDescription(`wait ${timeLeft.toFixed(1)} more seconds before reusing the ${command.name} command.`);
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						embeds: [Embed],
					},
				},
			});
		}
	}

	timestamps.set(interaction.member.user.id, now);
	setTimeout(() => timestamps.delete(interaction.member.user.id), cooldownAmount);

	const commandLogEmbed = new Discord.MessageEmbed()
		.setColor(Math.floor(Math.random() * 16777215))
		.setTitle('Command executed!')
		.setAuthor(`${interaction.member.user.username}#${interaction.member.user.discriminator}`, `https://cdn.discordapp.com/avatars/${interaction.member.user.id}/${interaction.member.user.avatar}.webp`)
		.addField('**Type:**', 'Slash');

	if (client.guilds.cache.get(interaction.guild_id)) {
		commandLogEmbed.addField('**Guild:**', client.guilds.cache.get(interaction.guild_id).name).addField('**Channel:**', client.channels.cache.get(interaction.channel_id).name);
	}
	else if (command.guildOnly) {
		return client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: 'You can only execute this command in a Discord Server!',
				},
			},
		});
	}

	commandLogEmbed.addField('**Command:**', command.name);

	if (command.permissions && interaction.member.user.id !== '249638347306303499') {
		const authorPerms = client.channels.cache.get(interaction.channel_id).members.get(interaction.member.user.id).permissions;
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: 'You can\'t do that!',
					},
				},
			});
		}
	}

	try {
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		console.log(`[${time} INFO]: ${interaction.member.user.username}#${interaction.member.user.discriminator} issued slash command: /${command.name}`);
		client.users.cache.get('249638347306303499').send(commandLogEmbed);
		command.execute(interaction, args, client, Client, Discord);
	}
	catch (error) {
		commandLogEmbed.setTitle('COMMAND FAILED').addField('**Error:**', clean(error));
		client.users.cache.get('249638347306303499').send(commandLogEmbed);
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		console.error(`[${time} ERROR]: ${error}`);
	}
});

client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFolders2 = fs.readdirSync(`./commands/${folder}`);
	for (const folder2 of commandFolders2) {
		const commandFiles = fs.readdirSync(`./commands/${folder}/${folder2}`).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const command = require(`./commands/${folder}/${folder2}/${file}`);
			client.commands.set(command.name, command);
		}
	}
}

client.on('message', message => {
	if (message.author.bot) return;
	let srvconfig = [];
	if (message.guild) {
		srvconfig = client.settings.get(message.guild.id);
	}
	else {
		srvconfig.prefix = '-';
	}
	if (message.channel.type == 'dm') {
		if (message.content.startsWith(srvconfig.prefix)) return message.reply('You can only execute legacy commands in a Discord Server!\nTry using slash (/) commands instead');
		if (client.guilds.cache.get('661736128373719141').members.cache.has(message.author.id)) client.channels.cache.get('776992487537377311').send(`**<@!${message.author.id}>** > ${message.content}`);
		else client.channels.cache.get('827651453698179134').send(`**<@!${message.author.id}>** > ${message.content}`);
	}
	if (!message.content.startsWith(srvconfig.prefix)) return;

	const args = message.content.slice(srvconfig.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	if (!command) return;

	const { cooldowns } = client;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		const random = Math.floor(Math.random() * 4);
		const messages = ['Do I look like Usain Bolt to u?', 'BRUH IM JUST A DOG SLOW DOWN', 'can u not', 'leave me alone ;-;'];
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			const Embed = new Discord.MessageEmbed()
				.setColor(Math.round(Math.random() * 16777215))
				.setTitle(messages[random])
				.setDescription(`wait ${timeLeft.toFixed(1)} more seconds before reusing the ${command.name} command.`);
			return message.reply(Embed);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	if (!command.argamnt) command.argamnt = 1;

	if (command.args && args.length < command.argamnt) {
		const Usage = new Discord.MessageEmbed()
			.setColor(3447003)
			.setTitle('Usage')
			.setDescription(`\`${srvconfig.prefix + command.name + ' ' + command.usage}\``);
		return message.channel.send(Usage);
	}

	const commandLogEmbed = new Discord.MessageEmbed()
		.setColor(Math.floor(Math.random() * 16777215))
		.setTitle('Command executed!')
		.setAuthor(message.author.tag, message.author.avatarURL())
		.addField('**Type:**', 'Legacy');

	commandLogEmbed.addField('**Guild:**', message.guild.name).addField('**Channel:**', message.channel.name);

	commandLogEmbed.addField('**Command:**', message.content);

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You can\'t do that!');
		}
	}

	try {
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		console.log(`[${time} INFO]: ${message.author.tag} issued legacy command: ${message.content}`);
		if (message.author.id !== '249638347306303499') client.users.cache.get('249638347306303499').send(commandLogEmbed);
		command.execute(message, args, client, Client, Discord);
	}
	catch (error) {
		commandLogEmbed.setTitle('COMMAND FAILED').addField('**Error:**', clean(error));
		client.users.cache.get('249638347306303499').send(commandLogEmbed);
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		console.error(`[${time} ERROR]: ${error}`);
	}
});
client.response = new Discord.Collection();
const responseFiles = fs.readdirSync('./response').filter(file => file.endsWith('.js'));

for (const file of responseFiles) {
	const response = require(`./response/${file}`);
	client.response.set(response.name, response);
}
let activityguildnumber = 0;
setInterval(async () => {
	const activities = [
		['PLAYING', '{GUILD}'],
		['WATCHING', `${client.users.cache.size} Users`],
		['PLAYING', '{UPTIME}'],
		['PLAYING', 'with you ;)'],
		['WATCHING', `${client.channels.cache.size} Channels`],
		['PLAYING', '{UPTIME}'],
		['COMPETING', `${client.guilds.cache.size} Servers`],
		['PLAYING', '{GUILD}'],
		['PLAYING', 'with you ;)'],
		['COMPETING', `${client.guilds.cache.size} Servers`],
		['PLAYING', '{GUILD}'],
	];
	const activitynumber = Math.round(Math.random() * (activities.length - 1));
	const activity = activities[activitynumber];
	if (activity[1] == '{GUILD}') {
		activity[1] = `in ${guildnames[activityguildnumber]}`;
		if (activityguildnumber == guildnames.length - 1) {
			activityguildnumber = 0;
		}
		else {
			activityguildnumber = activityguildnumber + 1;
		}
	}
	const duration = moment.duration(client.uptime).format('D [days], H [hrs], m [mins], s [secs]');
	if (activity[1] == '{UPTIME}') activity[1] = `for ${duration}`;
	client.user.setPresence({ activities: [{ name: activity[1], type: activity[0] }] });
}, 10000);

let lastUpdated = Date.now() - 270000;
async function updateCount(global, vc) {
	if (Date.now() - lastUpdated > 325000) {
		const json = await fetch('https://api.mcsrvstat.us/2/play.netherdepths.com').catch(error => {
			const rn = new Date();
			const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
			console.error(`[${time} ERROR]: Couldn't connect to API! ${error}`);
			return;
		});
		if (!json) return;
		const pong = await json.json();
		if (!pong.online) return;
		if (!pong.players) return;
		if (client.channels.cache.get(vc).name != `Players: ${pong.players.online} / ${pong.players.max}`) {
			await client.channels.cache.get(vc).setName(`Players: ${pong.players.online} / ${pong.players.max}`);
			if (client.channels.cache.get(vc).name != `Players: ${pong.players.online} / ${pong.players.max}`) {
				const rn = new Date();
				const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
				console.warn(`[${time} WARN]: Failed to change channel name! Rate limited?`);
				lastUpdated = Date.now() + 60000;
			}
			else {
				lastUpdated = Date.now();
			}
		}
	}
}

client.on('message', message => {
	if(message.content.startsWith('**Online players (') || message.content.includes('PLAYERS ONLINE**')) client.response.get('list').execute(message, Discord, sleep);
	if (message.webhookID) {
		if (message.channel.id != '812082273393704960') return;
		client.user.setPresence({ activities: [{ name: 'Updating', type: 'PLAYING' }] });
		message.channel.send('Updating to latest commit...');
		Client.login('https://panel.birdflop.com', client.config.panelapikey, (logged_in, err) => {
			if (logged_in == false) return message.reply(`Something went wrong, please use https://panel.birdflop.com\n${err}`);
		});
		Client.restartServer('5bcaad8d').catch();
		Client.killServer('5bcaad8d').catch();
	}
	if (message.author.id == '661797951223627787') {
		updateCount('776992487537377311', '808188940728664084').catch(error => {
			const rn = new Date();
			const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
			console.error(`[${time} ERROR]: ${error}`);
		});
	}
	if (message.channel.type == 'dm' || message.content.startsWith(client.settings.get(message.guild.id).prefix) || message.author.bot) return;
	const srvconfig = client.settings.get(message.guild.id);
	if (message.channel.name.includes('ticket-')) {
		if (!message.channel.topic) return;
		if (!message.channel.topic.includes('Ticket Opened by')) return;
		if (client.tickets.get(message.channel.id).resolved != 'true') return;
		client.tickets.set(message.channel.id, 'false', 'resolved');
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		console.log(`[${time} INFO]: Unmarked ticket #${message.channel.name} as resolved`);
	}
	if (message.content.includes(client.user.id)) {
		message.reply(`My prefix is \`${srvconfig.prefix}\``);
	}
	if(['lov', 'simp', ' ily ', ' ily', ' babe ', 'babe ', ' babe', 'kiss', 'daddy', 'mommy', 'cute'].some(word => message.content.toLowerCase().includes(word))) {
		if (srvconfig.simpreaction == 'false') return;
		client.response.get('simp').execute(message);
	}
	if(message.content.toLowerCase().includes('what') && message.content.toLowerCase().includes('ip')) client.response.get('whatip').execute(message);
	if(message.content.toLowerCase().includes('pup') && ['bad', 'gross', 'shit', 'dum'].some(word => message.content.toLowerCase().includes(word))) client.response.get('pupbad').execute(message);
});

client.on('messageReactionAdd', async (reaction, user) => {
	let message = reaction.message;
	if (reaction.message.partial) {
		await reaction.message.fetch()
			.then(fullmessage => {
				message = fullmessage;
			});
	}
	if (reaction.message.channel.id == '678391804563030031' || reaction.message.channel.id == '717262907712471080') {
		if (reaction.emoji.name == '❗') {
			reaction.users.remove(user.id);
			client.commands.get('alerts').execute(message, null, client, user, Discord, reaction);
		}
		else if (reaction.emoji.name == '📘') {
			reaction.users.remove(user.id);
			client.commands.get('vnext').execute(message, null, client, user, Discord, reaction);
		}
		else if (reaction.emoji.name == '🏆') {
			reaction.users.remove(user.id);
			client.commands.get('vtotal').execute(message, null, client, user, Discord, reaction);
		}
	}
	if (reaction.message.channel.id == '678391804563030031') {
		if (reaction.emoji.name == '⛔') {
			reaction.users.remove(user.id);
			client.commands.get('nsfw').execute(message, null, client, user, Discord, reaction);
			return;
		}
	}
	if (reaction.emoji.name == '❌') {
		if (user.bot) return;
		if (message.channel.type != 'dm') return;
		if (!message.content.includes('React to this message to unsubscribe to the broadcast')) return;
		if (client.userdata.get(user.id, 'unsubbed') == 'true') return message.channel.send('You\'re already unsubscribed!');
		client.userdata.set(user.id, 'true', 'unsubbed');
		message.channel.send('Unsubscribed!');
	}
	if (message.channel.type == 'dm') return;
	if (user.bot) return;
	if (reaction.emoji.name == '🎫') {
		if (message.embeds[0].title !== 'Need help? No problem!') return;
		reaction.users.remove(user.id);
		client.commands.get('ticket').execute(message, null, client, user, Discord, reaction);
		return;
	}
	if (reaction.emoji.name == '⛔') {
		await client.commands.get('delete').execute(message, null, client, user, Discord, reaction);
		return;
	}
	if (reaction.emoji.name == '🔓') {
		reaction.users.remove(user.id);
		await client.commands.get('open').execute(message, null, client, user, Discord, reaction);
		return;
	}
	if (reaction.emoji.name == '🔒') {
		reaction.users.remove(user.id);
		client.commands.get('close').execute(message, null, client, user, Discord, reaction);
		return;
	}
});

client.on('guildMemberRemove', (member) => {
	const srvconfig = client.settings.get(member.guild.id);
	if (srvconfig.leavemessage == 'false') return;
	if (!member.guild.systemChannel) {
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		console.log(`[${time} WARN]: ${client.users.cache.get(member.guild.ownerID).username} has misconfigured leave messages!`);
		return client.users.cache.get(member.guild.ownerID).send(`Leave messages are enabled but a system message channel isn't set! Please either go into your server settings (${member.guild.name}) and set the system message channel or turn off leave messages with the command \`${srvconfig.prefix}settings leavemessage false\``);
	}
	member.guild.systemChannel.send(srvconfig.leavemessage.replace(/{USER MENTION}/g, client.users.cache.get(member.id)).replace(/{USER TAG}/g, client.users.cache.get(member.id).tag));
});

client.on('guildMemberAdd', (member) => {
	const srvconfig = client.settings.get(member.guild.id);
	if (srvconfig.joinmessage == 'false') return;
	if (!member.guild.systemChannel) {
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		console.log(`[${time} WARN]: ${client.users.cache.get(member.guild.ownerID).username} has misconfigured join messages!`);
		return client.users.cache.get(member.guild.ownerID).send(`Join messages are enabled but a system message channel isn't set! Please either go into your server settings (${member.guild.name}) and set the system message channel or turn off join messages with the command \`${srvconfig.prefix}settings joinmessage false\``);
	}
	member.guild.systemChannel.send(srvconfig.joinmessage.replace(/{USER MENTION}/g, client.users.cache.get(member.id)).replace(/{USER TAG}/g, client.users.cache.get(member.id).tag));
});

cron.schedule('0 0 * * *', () => {
	client.channels.cache.forEach(async channel => {
		if (client.tickets.get(channel.id).resolved == 'true' && channel.name.includes('ticket-')) {
			channel.setName(channel.name.replace('ticket', 'closed'));
			await sleep(1000);
			if (channel.name.includes('ticket-')) return channel.send('Failed to close ticket, please try again in 10 minutes');
			client.tickets.set(channel.id, 'false', 'resolved');
			client.tickets.get(channel.id).users.forEach(userid => channel.updateOverwrite(client.users.cache.get(userid), { VIEW_CHANNEL: false }));
			const Embed = new Discord.MessageEmbed()
				.setColor(15105570)
				.setDescription('Ticket Closed automatically');
			channel.send(Embed);
			Embed.setColor(3447003).setDescription('🔓 Reopen Ticket `/open`\n⛔ Delete Ticket `/delete`');
			const msg = await channel.send(Embed);
			msg.react('🔓');
			msg.react('⛔');
			const rn = new Date();
			const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
			console.log(`[${time} INFO]: Closed resolved ticket #${channel.name}`);
		}
	});
});