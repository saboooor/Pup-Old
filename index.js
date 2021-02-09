const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const nodeactyl = require('nodeactyl');
const fetch = require('node-fetch');
const Client = nodeactyl.Client;

function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.login(config.token);

client.once('ready', () => {
	console.log('I am running');
	client.user.setPresence({ activity: { name: `${client.guilds.cache.size} Servers`, type: 'WATCHING' }, status: 'dnd' });
	client.users.cache.get('249638347306303499').send('ey *cunt* i started');
});

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.args && args.length < command.argamnt) {
		return message.channel.send(`Usage: \`${config.prefix + command.name + ' ' + command.usage}\``);
	}

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('You can only execute this command in a Discord Server!');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You can\'t do that!');
		}
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		const random = Math.floor(Math.random() * 5);
		const messages = ['Do I look like Usain Bolt to u?', 'BRUH IM JUST A DOG SLOW DOWN', 'can u not', 'leave me alone ;-;'];
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply({ embed: {
				color: 15158332,
				title: messages[random],
				description: `wait ${timeLeft.toFixed(1)} more seconds before reusing ${config.prefix + command.name}.`,
			} });
		}
	}

	try {
		if (message.author.id !== '249638347306303499') client.users.cache.get('249638347306303499').send(`**COMMAND: ${message.author.tag} >** ${message.content}`);
		command.execute(message, args, client, sleep, config, Client, Discord);
	}
	catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.response = new Discord.Collection();
const responseFiles = fs.readdirSync('./response').filter(file => file.endsWith('.js'));

for (const file of responseFiles) {
	const response = require(`./response/${file}`);
	client.response.set(response.name, response);
}

client.on('message', message => {
	if(message.content.startsWith('**Online players (')) {
		if (message.channel.guild.id == '711661870926397601') {
			client.response.get('tacolist').execute(message);
			return;
		}
		client.response.get('list').execute(message);
	}
	if(message.content.includes('PLAYERS ONLINE**')) {
		if (message.channel.guild.id == '661736128373719141') {
			client.response.get('netherlist').execute(message);
			return;
		}
	}
	if(message.content.toLowerCase() == '**no online players**') {
		message.delete();
		message.channel.send({ embed: {
			color: 1752220,
			title: message.content,
		} }).then(msg => {
			setTimeout(function() {
				msg.delete();
			}, 5000);
		});
	}
	if(message.content.toLowerCase() == 'list') {
		client.response.get('list2').execute(message);
	}
	if(['lov', 'simp', ' ily ', ' ily', ' babe ', 'babe ', ' babe', ' sloppy ', 'sloppy ', ' sloppy', 'kiss', 'daddy', 'mommy', 'cute'].some(word => message.content.toLowerCase().includes(word))) {
		client.response.get('simp').execute(message);
	}
	if(['nigger', 'nibba', 'fag', 'faggot', 'faguette', 'fagget', 'nibber', 'nigga'].some(word => message.content.toLowerCase().replace(/‎/g, '').replace(/­/g, '').includes(word))) {
		if (message.author.bot) return;
		client.response.get('badword').execute(message);
	}
	if(message.content.toLowerCase().includes('what')) {
		if(message.content.toLowerCase().includes('ip')) {
			client.response.get('whatip').execute(message);
		}
	}
	if(message.mentions.roles.size > 0) {
		const role = message.mentions.roles.find(r => r.name.toLowerCase().includes('alerts'));
		if (role !== undefined) {
			client.response.get('tada').execute(message);
		}
	}
});

client.reaction = new Discord.Collection();
const reactionFiles = fs.readdirSync('./reaction').filter(file => file.endsWith('.js'));

for (const file of reactionFiles) {
	const reaction = require(`./reaction/${file}`);
	client.reaction.set(reaction.name, reaction);
}

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
	if (message.channel.name.includes('closed-')) {
		if (message.author.id != config.botid) return;
		if (message.channel.topic === null) return;
		if (!message.channel.topic.includes('#')) return;
		if (reaction.emoji.name === '⛔') {
			await message.channel.delete();
			return;
		}
		if (reaction.emoji.name === '🔓') {
			await client.reaction.get('reopen').execute(reaction, user, client, config, message);
			return;
		}
	}
	if (message.channel.name.includes('ticket-')) {
		if (message.author.id != config.botid) return;
		if (message.channel.topic === null) return;
		if (!message.channel.topic.includes('#')) return;
		if (reaction.emoji.name === '🔒') {
			if (message.author.id != config.botid) return;
			await reaction.users.remove(user.id);
			await message.react(config.yes);
			await message.react(config.no);
			return;
		}
		if (reaction.emoji.name === 'no') {
			await message.reactions.removeAll();
			await message.react('🔒');
			return;
		}
		if (reaction.emoji.name === 'yes') {
			await message.reactions.removeAll();
			await message.react('🔒');
			client.reaction.get('close').execute(reaction, user, client, config, message);
			return;
		}
	}
	const command = message.channel.name;

	if (!client.reaction.has(command)) return;

	try {
		client.reaction.get(command).execute(reaction, user, client, config, message);
	}
	catch (error) {
		console.error(error);
		console.log('there was an error trying to execute that command!');
	}
});

client.on('message', message => {
	if (message.channel.type == 'dm') {
		if (message.author.bot) return;
		client.channels.cache.get('776992487537377311').send(`**<@!${message.author.id}>** > ${message.content}`);
	}
});

client.on('guildMemberRemove', (member) => {
	if (member.guild.id == '661736128373719141') client.channels.cache.get('721674323869433926').send(`**${client.users.cache.get(member.id).username}** left`);
	if (member.guild.id == '711661870926397601') client.channels.cache.get('711661871400222782').send(`**${client.users.cache.get(member.id).username}** left`);
	if (member.guild.id == '789642848298336318') client.channels.cache.get('789642848915685439').send(`**${client.users.cache.get(member.id).username}** left`);
	if (member.guild.id == '746125698644705524') client.channels.cache.get('746125698644705527').send(`**${client.users.cache.get(member.id).username}** left`);
});

client.on('guildMemberAdd', (member) => {
	if (member.guild.id != '661736128373719141') return;
	client.channels.cache.get('670774287317073951').send(`**${client.users.cache.get(member.id).username}** joined the Nether Depths Discord server! Join yourself with /discord`);
});

let lastUpdated = Date.now() - 270000;
async function updateCount(global, vc) {
	if (Date.now() - lastUpdated < 300000) return;
	const json = await fetch('https://api.mcsrvstat.us/2/play.netherdepths.com');
	const pong = await json.json();
	if (!pong.online) client.channels.cache.get(global).send('**❗Server is offline❗**');
	if (!pong.players.max) return;
	if (client.channels.cache.get(vc).name != `Players: ${pong.players.online} / ${pong.players.max}`) {
		await client.channels.cache.get(vc).setName(`Players: ${pong.players.online} / ${pong.players.max}`);
		if (client.channels.cache.get(vc).name != `Players: ${pong.players.online} / ${pong.players.max}`) {
			console.log('Failed to change channel name! Rate limited?');
			lastUpdated = Date.now() + 60000;
		}
		else {
			lastUpdated = Date.now();
		}
	}
}
client.on('message', message => {
	updateCount('670774287317073951', '808188940728664084');
});