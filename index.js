const start = Date.now();
const fs = require('fs');
const Discord = require('discord.js');
const nodeactyl = require('nodeactyl');
const fetch = require('node-fetch');
const Enmap = require('enmap');
const Client = nodeactyl.Client;
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.config = require('./config.json');
function minTwoDigits(n) {
	return (n < 10 ? '0' : '') + n;
}
function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
client.login(client.config.token);
client.once('ready', () => {
	const rn = new Date();
	const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
	const timer = (Date.now() - start) / 1000;
	console.log(`[${time} INFO]: Done (${timer}s)! I am running!`);
	client.user.setPresence({ activity: { name: `${client.guilds.cache.size} Servers`, type: 'WATCHING' }, status: 'dnd' });
	client.channels.cache.get('812082273393704960').send('Started Successfully!');
});

client.settings = new Enmap({
	name: 'settings',
	fetchAll: false,
	autoFetch: true,
	cloneLevel: 'deep',
	autoEnsure: {
		prefix: client.config.prefix,
		simpreaction: 'true',
		leavemessage: 'false',
		joinmessage: 'false',
		adfree: 'false',
		listsort: 'true',
		maxppsize: '35',
		tickets: 'true',
	},
});
client.on('guildDelete', guild => {
	client.settings.delete(guild.id);
});

client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
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
	let srvconfig = [];
	if (message.guild) {
		srvconfig = client.settings.get(message.guild.id);
	}
	else {
		srvconfig.prefix = '-';
	}
	if (!message.content.startsWith(srvconfig.prefix) || message.author.bot) return;

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
			return message.reply({ embed: {
				color: 15158332,
				title: messages[random],
				description: `wait ${timeLeft.toFixed(1)} more seconds before reusing ${srvconfig.prefix + command.name}.`,
			} });
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
		.setAuthor(message.author.tag, message.author.avatarURL());

	if (message.channel.type !== 'dm') {
		commandLogEmbed.addField('**Guild:**', message.guild.name).addField('**Channel:**', message.channel.name);
	}
	else if (command.guildOnly) {
		return message.reply('You can only execute this command in a Discord Server!');
	}

	commandLogEmbed.addField('**Command:**', message.content);

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You can\'t do that!');
		}
	}

	function clean(text) {
		if (typeof (text) === 'string') {return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));}
		else {return text;}
	}

	try {
		const rn = new Date();
		const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
		console.log(`[${time} INFO]: ${message.author.tag} issued command: ${message.content}`);
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

client.on('message', message => {
	if (message.channel.type == 'dm') {
		if (message.author.bot) return;
		client.channels.cache.get('776992487537377311').send(`**<@!${message.author.id}>** > ${message.content}`);
		return;
	}
	else if (message.webhookID) {
		if (message.channel.id != '812082273393704960') return;
		client.user.setPresence({ activity: { name: 'Updating', type: 'PLAYING' } });
		message.channel.send('Updating to latest commit...');
		Client.login('https://panel.birdflop.com', client.config.panelapikey, (logged_in, err) => {
			if (logged_in == false) return message.reply(`Something went wrong, please use https://panel.birdflop.com\n${err}`);
		});
		Client.restartServer('5bcaad8d').catch();
		Client.killServer('5bcaad8d').catch();
	}
	const srvconfig = client.settings.get(message.guild.id);
	if (message.content.includes(client.user.id)) {
		if (message.author.bot) return;
		message.reply(`My prefix is \`${srvconfig.prefix}\``);
	}
	if(message.content.startsWith('**Online players (') || message.content.includes('PLAYERS ONLINE**')) client.response.get('list').execute(message, Discord, sleep);
	if(['lov', 'simp', ' ily ', ' ily', ' babe ', 'babe ', ' babe', ' sloppy ', 'sloppy ', ' sloppy', 'kiss', 'daddy', 'mommy', 'cute'].some(word => message.content.toLowerCase().includes(word))) {
		if (message.author.bot) return;
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
	if (message.channel.type == 'dm') return;
	if (user.bot) return;
	if (reaction.emoji.name === '🎫') {
		if (message.embeds[0].title !== 'Need help? No problem!') return;
		reaction.users.remove(user.id);
		client.commands.get('ticket').execute(message, null, client, user, Discord, reaction);
		return;
	}
	if (reaction.emoji.name === '⛔') {
		reaction.users.remove(user.id);
		await client.commands.get('delete').execute(message, null, client, user, Discord, reaction);
		return;
	}
	if (reaction.emoji.name === '🔓') {
		reaction.users.remove(user.id);
		await client.commands.get('open').execute(message, null, client, user, Discord, reaction);
		return;
	}
	if (reaction.emoji.name === '🔒') {
		reaction.users.remove(user.id);
		client.commands.get('close').execute(message, null, client, user, Discord, reaction);
		return;
	}
});

client.on('guildMemberRemove', (member) => {
	const srvconfig = client.settings.get(member.guild.id);
	if (srvconfig.leavemessage == 'false') return;
	member.guild.systemChannel.send(srvconfig.leavemessage.replace(/{USER MENTION}/g, client.users.cache.get(member.id)).replace(/{USER TAG}/g, client.users.cache.get(member.id).tag));
});

client.on('guildMemberAdd', (member) => {
	const srvconfig = client.settings.get(member.guild.id);
	if (srvconfig.joinmessage == 'false') return;
	member.guild.systemChannel.send(srvconfig.joinmessage.replace(/{USER MENTION}/g, client.users.cache.get(member.id)).replace(/{USER TAG}/g, client.users.cache.get(member.id).tag));
	if (member.guild.id == '661736128373719141') return client.channels.cache.get('670774287317073951').send(`**${client.users.cache.get(member.id).username}** joined the Nether Depths Discord server! Join yourself with /discord`);
});

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
	if (message.author.id == '661797951223627787') updateCount('776992487537377311', '808188940728664084');
});