const util = require('minecraft-server-util');
const https = require('https');
require('moment-duration-format');
const moment = require('moment');
module.exports = {
	name: 'stats',
	guildOnly: true,
	aliases: ['status'],
	async execute(message, args, client, sleep, config, Client, Discord) {
		const Embed = new Discord.MessageEmbed()
			.setThumbnail('https://bugs.mojang.com/secure/attachment/99116/unknown_pack.png')
			.setColor(3447003);
		const reply = await message.channel.send('Pinging...');
		const panel = 'https://panel.birdflop.com';
		let id = '';
		let serverip = '';
		let arg = args[0];
		if (arg) arg = arg.toLowerCase();
		if (!arg) {
			id = '5bcaad8d';
			if (message.guild.id == '661736128373719141') {
				id = '1eb5e2e9';
				serverip = 'play.netherdepths.com';
			}
			else if (message.guild.id == '711661870926397601') {
				id = 'd68c84e1';
				serverip = 'tacohaven.club';
			}
		}
		else if (arg == 'pb') {
			id = '5bcaad8d';
		}
		else if (arg == 'th') {
			id = 'd68c84e1';
			serverip = 'tacohaven.club';
		}
		else if (arg == 'nd') {
			id = '1eb5e2e9';
			serverip = 'play.netherdepths.com';
		}
		else if (arg == 'ndt') {
			id = '6f0c0a62';
			serverip = 'snapshot.netherdepths.com';
		}
		else {
			serverip = args[0];
		}
		if (id !== '') {
			Embed.setThumbnail(message.guild.iconURL());
			Client.login(panel, config.panelapikey, (logged_in, err) => {
				if (logged_in == false) return message.reply(`Something went wrong\n${err}`);
			});
			const info = await Client.getServerInfo(id).catch((error) => {console.log(error);});
			const cpu = await Client.getCPUUsage(id).catch((error) => {console.log(error);});
			const ram = await Client.getRAMUsage(id).catch((error) => {console.log(error);});
			const status = await Client.getServerStatus(id).catch((error) => {console.log(error);});
			const statusname = status.replace('running', 'Online').replace('stopping', 'Stopping').replace('offline', 'Offline').replace('starting', 'Starting');
			Embed.setTitle(`${info.attributes.name} (${statusname})`);
			if (status == 'running') Embed.setColor(65280);
			if (status == 'stopping') Embed.setColor(16737280);
			if (status == 'offline') Embed.setColor(16711680);
			if (status == 'starting') Embed.setColor(16737280);
			if (id == '5bcaad8d') {
				Embed.setTitle('Pup Bot');
				const duration = moment.duration(client.uptime).format('D [days], H [hrs], m [mins], s [secs]');
				if (duration) Embed.addField('**Uptime:**', duration);
				Embed.setThumbnail(reply.author.avatarURL());
			}
			if (info.attributes.node) Embed.addField('**Node:**', info.attributes.node);
			if (cpu.current) Embed.addField('**CPU Usage:**', cpu.current);
			if (ram.current) Embed.addField('**RAM Usage:**', `${Math.ceil(ram.current / 1000000)} MB`);
		}
		if (serverip !== '') {
			let pong = '';
			await https.get(`https://api.mcsrvstat.us/2/${serverip}`, function(res) {
				let body = '';
				res.on('data', function(chunk) {
					body += chunk;
				});
				res.on('end', function() {
					pong = JSON.parse(body);
				});
			});
			if (id == '') {
				if (pong.online == 'true') return reply.edit('**Invalid Server**\nYou can use any valid Minecraft server IP\nor use an option from the list below:\n`PB, TH, ND, NDT`');
			}
			console.log(pong);
			Embed.addField('**Version:**', pong.version);
			Embed.addField('**Players Online:**', `${pong.players.online} / ${pong.players.max}`);
			Embed.addField('**Players:**', pong.players.list.join('\n'));
			Embed.addField('**MOTD:**', pong.motd.clean.join('\n'));
			const base64string = Buffer.from(pong.icon.replace(/^data:image\/png;base64,/, ''), 'base64');
			const iconpng = new Discord.MessageAttachment(base64string, 'icon.png');
			Embed.attachFiles([iconpng]).setThumbnail('attachment://icon.png');
		}
		await reply.delete();
		await message.channel.send('', Embed);
	},
};