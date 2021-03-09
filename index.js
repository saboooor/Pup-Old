const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const nodeactyl = require('nodeactyl');
const fetch = require('node-fetch');
const Enmap = require('enmap');
const Client = nodeactyl.Client;
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.login(config.token);
client.once('ready', () => {
	console.log('I am running');
	client.user.setPresence({ activity: { name: `${client.guilds.cache.size} Servers`, type: 'WATCHING' }, status: 'dnd' });
	client.channels.cache.get('812082273393704960').send('Started Successfully!');
});
client.settings = new Enmap({
	name: 'settings',
	fetchAll: false,
	autoFetch: true,
	cloneLevel: 'deep',
	autoEnsure: {
	  prefix: config.prefix,
	  slurban: 'true',
	  simpreaction: 'true',
	  leavemessage: 'false',
	  joinmessage: 'false',
	  adfree: 'false',
	  listsort: 'true',
	  maxppsize: '35'
	}
});
client.on("guildDelete", guild => {
	client.settings.delete(guild.id);
});

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.on('message', message => {
	let srvconfig = [];
	if (message.guild) {
		srvconfig = client.settings.get(message.guild.id);
	}
	else {
		srvconfig.prefix = '-'
	}
	if (!message.content.startsWith(srvconfig.prefix) || message.author.bot) return;

	const args = message.content.slice(srvconfig.prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

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
				description: `wait ${timeLeft.toFixed(1)} more seconds before reusing ${srvconfig.prefix + command.name}.`,
			} });
		}
	}

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

	try {
		if (message.author.id !== '249638347306303499') client.users.cache.get('249638347306303499').send(commandLogEmbed);
		command.execute(message, args, client, config, Client, Discord);
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
	let srvconfig = []
	if (message.channel.type == 'dm') {
		srvconfig.simpreaction = 'true';
		srvconfig.slurban = 'false';
	}
	else {
		srvconfig = client.settings.get(message.guild.id);
	}
	if (message.mentions.has(client.user)) {
		message.reply(`My prefix is \`${srvconfig.prefix}\``);
	}	
	if(message.content.startsWith('**Online players (')) {
		if (message.channel.guild.id == '711661870926397601') {
			client.response.get('tacolist').execute(message, Discord);
			return;
		}
		client.response.get('list').execute(message);
	}
	if(message.content.includes('PLAYERS ONLINE**')) {
		if (message.channel.guild.id == '661736128373719141') {
			client.response.get('netherlist').execute(message, Discord);
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
		if (message.author.bot) return;
		if (srvconfig.simpreaction == 'false') return;
		client.response.get('simp').execute(message);
	}
	if(['nigger', 'nibba', 'fag', 'faggot', 'faguette', 'fagget', 'nibber', 'nigga'].some(word => message.content.toLowerCase().replace(/‎/g, '').replace(/­/g, '').includes(word))) {
		if (message.author.bot) return;
		if (srvconfig.slurban == 'false') return;
		client.response.get('badword').execute(message);
	}
	if(message.content.toLowerCase().includes('what')) {
		if(message.content.toLowerCase().includes('ip')) {
			client.response.get('whatip').execute(message);
		}
	}
	if(message.content.toLowerCase().includes('pup')) {
		if(['bad', 'gross', 'shit', 'dum'].some(word => message.content.toLowerCase().includes(word))) {
			client.response.get('pupbad').execute(message);
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
			await message.reactions.removeAll();
			await message.react('🔒');
			client.reaction.get('close').execute(reaction, user, client, config, message);
			return;
		}
	}
});

client.on('message', message => {
	if (message.channel.type == 'dm') {
		if (message.author.bot) return;
		client.channels.cache.get('776992487537377311').send(`**<@!${message.author.id}>** > ${message.content}`);
	}
	else if (message.webhookID) {
		if (message.channel.id != '812082273393704960') return;
		client.user.setPresence({ activity: { name: 'Updating', type: 'PLAYING' } });
		message.channel.send('Updating to latest commit...');
		Client.login('https://panel.birdflop.com', config.panelapikey, (logged_in, err) => {
			if (logged_in == false) return message.reply(`Something went wrong, please use https://panel.birdflop.com\n${err}`);
		});
		Client.restartServer('5bcaad8d').catch();
		Client.killServer('5bcaad8d').catch();
	}
});

client.on('guildMemberRemove', (member) => {
	let srvconfig = client.settings.get(member.guild.id);
	if (srvconfig.leavemessage == 'false') return;
	member.guild.systemChannel.send(srvconfig.leavemessage.replace(/{USER MENTION}/g, client.users.cache.get(member.id)).replace(/{USER TAG}/g, client.users.cache.get(member.id).tag));
});

client.on('guildMemberAdd', (member) => {
	let srvconfig = client.settings.get(member.guild.id);
	if (srvconfig.joinmessage == 'false') return;
	member.guild.systemChannel.send(srvconfig.joinmessage.replace(/{USER MENTION}/g, client.users.cache.get(member.id)).replace(/{USER TAG}/g, client.users.cache.get(member.id).tag));
	if (member.guild.id == '661736128373719141') return client.channels.cache.get('670774287317073951').send(`**${client.users.cache.get(member.id).username}** joined the Nether Depths Discord server! Join yourself with /discord`);
});

let lastUpdated = Date.now() - 270000;
async function updateCount(global, vc) {
	if (Date.now() - lastUpdated > 325000) {
		const json = await fetch('https://api.mcsrvstat.us/2/play.netherdepths.com').catch(error => {
			console.log('Couldn\'t connect to API!\n' + error);
			return;
		});
		const pong = await json.json();
		if (!pong.online) return;
		if (!pong.players) return;
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
}
client.on('message', message => {
	if (message.author.id == '661797951223627787') updateCount('776992487537377311', '808188940728664084');
});