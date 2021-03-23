const fetch = require('node-fetch');
require('moment-duration-format');
const moment = require('moment');
function minTwoDigits(n) {
	return (n < 10 ? '0' : '') + n;
}
module.exports = {
	name: 'stats',
	guildOnly: true,
	aliases: ['status'],
	cooldown: 5,
	async execute(message, args, client, Client, Discord) {
		let srvconfig = [];
		if (message.channel.type == 'dm') {
			srvconfig.adfree = false;
		}
		else {
			srvconfig = client.settings.get(message.guild.id);
		}
		const Embed = new Discord.MessageEmbed()
			.setThumbnail('https://bugs.mojang.com/secure/attachment/99116/unknown_pack.png')
			.setColor(3447003);
		const reply = await message.channel.send('Pinging...');
		const panel = 'https://panel.birdflop.com';
		let id = '';
		let serverip = '';
		let arg = args.join(' ');
		if (arg) arg = arg.toLowerCase();
		if (srvconfig.adfree == 'true') {
			if (arg != 'pup') {
				arg = 'pup';
			}
			if (message.guild.id == '661736128373719141') {
				arg = 'nether depths';
			}
			else if (message.guild.id == '711661870926397601') {
				arg = 'taco haven';
			}
		}
		if (!arg) {
			id = '5bcaad8d';
			if (message.guild.id == '661736128373719141') {
				id = '50dc31e4';
				serverip = 'play.netherdepths.com';
			}
			else if (message.guild.id == '711661870926397601') {
				id = 'd68c84e1';
				serverip = 'tacohaven.club';
			}
		}
		else if (arg == 'pup') {
			id = '5bcaad8d';
		}
		else if (arg == 'taco haven') {
			id = 'd68c84e1';
			serverip = 'tacohaven.club';
		}
		else if (arg == 'nether depths') {
			id = '50dc31e4';
			serverip = 'play.netherdepths.com';
		}
		else {
			serverip = args[0];
		}
		if (id !== '') {
			Embed.setThumbnail(message.guild.iconURL());
			Client.login(panel, client.config.panelapikey, (logged_in, err) => {
				if (logged_in == false) return message.reply(`Something went wrong\n${err}`);
			});
			const rn = new Date();
			const time = `${minTwoDigits(rn.getHours())}:${minTwoDigits(rn.getMinutes())}:${minTwoDigits(rn.getSeconds())}`;
			const info = await Client.getServerInfo(id).catch((error) => {console.error(`[${time} ERROR]: ${error}`);});
			const cpu = await Client.getCPUUsage(id).catch((error) => {console.error(`[${time} ERROR]: ${error}`);});
			const ram = await Client.getRAMUsage(id).catch((error) => {console.error(`[${time} ERROR]: ${error}`);});
			const status = await Client.getServerStatus(id).catch((error) => {console.error(`[${time} ERROR]: ${error}`);});
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
			if (cpu.current) Embed.addField('**CPU Usage:**', cpu.current + '%');
			if (ram.current) Embed.addField('**RAM Usage:**', `${Math.ceil(ram.current / 1000000)} MB`);
		}
		if (serverip !== '') {
			const json = await fetch(`https://api.mcsrvstat.us/2/${serverip}`);
			const pong = await json.json();
			if (id == '') {
				let noadmsg = '**Server is offline**';
				if (srvconfig.adfree == 'false') noadmsg = '**Invalid Server**\nYou can use any valid Minecraft server IP\nor use an option from the list below:\n`Pup, Taco Haven, Nether Depths`';
				if (!pong.online) return reply.edit(noadmsg);
			}
			if (pong.version) Embed.addField('**Version:**', pong.version);
			if (pong.players) {
				Embed.addField('**Players Online:**', `${pong.players.online} / ${pong.players.max}`);
				if (pong.players.list) Embed.addField('**Players:**', pong.players.list.join('\n').replace(/_/g, '\\_'));
			}
			if (pong.motd) Embed.addField('**MOTD:**', pong.motd.clean.join('\n').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&le;/g, '≤').replace(/&ge;/g, '≥'));
			if (pong.icon) {
				const base64string = Buffer.from(pong.icon.replace(/^data:image\/png;base64,/, ''), 'base64');
				const iconpng = new Discord.MessageAttachment(base64string, 'icon.png');
				Embed.attachFiles([iconpng]).setThumbnail('attachment://icon.png');
			}
		}
		await reply.delete();
		await message.channel.send('', Embed);
	},
};