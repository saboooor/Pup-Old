const fetch = require('node-fetch');
require('moment-duration-format');
const moment = require('moment');
const hastebin = require('hastebin');
const protocols = require('../../../mcprotocol.json');
function minTwoDigits(n) {
	return (n < 10 ? '0' : '') + n;
}
module.exports = {
	name: 'stats',
	description: 'Get stats of Pup or a Minecraft server',
	aliases: ['status'],
	cooldown: 5,
	options: [{
		type: 3,
		name: 'server',
		description: 'Specify a Minecraft server',
	}],
	async execute(interaction, args, client, Client, Discord) {
		await client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 5,
			},
		});
		let srvconfig = [];
		if (client.channels.cache.get(interaction.channel_id).type == 'dm') {
			srvconfig.adfree = 'false';
		}
		else {
			srvconfig = client.settings.get(interaction.guild_id);
		}
		const Embed = new Discord.MessageEmbed()
			.setThumbnail('https://bugs.mojang.com/secure/attachment/99116/unknown_pack.png')
			.setColor(3447003);
		const panel = 'https://panel.birdflop.com';
		let id = '';
		let serverip = '';
		let arg = '';
		if (args) arg = args[0].value.toLowerCase();
		if (srvconfig.adfree == 'true') {
			if (arg != 'pup') {
				arg = 'pup';
			}
			if (interaction.guild_id == '661736128373719141') {
				arg = 'nether depths';
			}
			else if (interaction.guild_id == '711661870926397601') {
				arg = 'taco haven';
			}
		}
		if (!arg) {
			id = '5bcaad8d';
			if (interaction.guild_id == '661736128373719141') {
				id = '50dc31e4';
				serverip = 'play.netherdepths.com';
			}
			else if (interaction.guild_id == '711661870926397601') {
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
		else if (arg == 'chopsticks survival') {
			id = '979d4d06';
			serverip = 'survival.chopsticksmc.net';
		}
		else if (arg == 'chopsticks hub') {
			id = 'c1b15b0f';
			serverip = 'hub.chopsticksmc.net';
		}
		else if (arg == 'chopsticks proxy') {
			id = '68505ddb';
		}
		else if (arg == 'chopsticks factions') {
			id = '7d9c4185';
			serverip = 'factions.chopsticksmc.net';
		}
		else if (arg == 'chopsticks') {
			serverip = 'play.chopsticksmc.net';
		}
		else {
			serverip = args[0].value;
		}
		if (id !== '') {
			Client.login(panel, client.config.panelapikey, (logged_in, err) => {
				if (logged_in == false) {
					return client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({
						data: {
							content: 'Something went wrong, try again later',
						},
					});
				}
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
				Embed.setThumbnail(client.user.avatarURL());
			}
			if (info.attributes.node) Embed.addField('**Node:**', info.attributes.node);
			if (cpu.current) Embed.addField('**CPU Usage:**', cpu.current + '%');
			if (ram.current) Embed.addField('**RAM Usage:**', `${Math.ceil(ram.current / 1000000)} MB`);
		}
		if (serverip !== '') {
			const json = await fetch(`https://api.mcsrvstat.us/2/${serverip}`);
			const pong = await json.json();
			if (id == '') {
				Embed.setTitle(pong.hostname);
				let noadmsg = '**Server is offline**';
				if (srvconfig.adfree == 'false') noadmsg = '**Invalid Server**\nYou can use any valid Minecraft server IP\nor use an option from the list below:```yml\nPup\nTaco Haven\nNether Depths\nChopsticks (Hub/Survival/Factions/Proxy)```';
				if (!pong.online) {
					return client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({
						data: {
							content: noadmsg,
						},
					});
				}
			}
			const duration = moment.duration(Date.now() - pong.debug.cachetime * 1000).format('m [mins and] s [secs]');
			Embed.setDescription(`Last Updated: \`${duration} ago\``);
			if (!pong.debug.cachetime) Embed.setDescription('Last Updated: `just now`');
			if (pong.version) Embed.addField('**Version:**', pong.version);
			if (pong.protocol != -1 && pong.protocol) Embed.addField('**Protocol:**', `${pong.protocol} (${protocols[pong.protocol]})`);
			if (pong.software) Embed.addField('**Software:**', pong.software);
			if (pong.players) {
				Embed.addField('**Players Online:**', `${pong.players.online} / ${pong.players.max}`);
				if (pong.players.list) {
					if (pong.players.online > 50) {
						const link = await hastebin.createPaste(pong.players.list.join('\n'), { server: 'https://bin.birdflop.com' });
						Embed.addField('**Players:**', `[Click Here](${link})`);
					}
					else {
						Embed.addField('**Players:**', pong.players.list.join('\n').replace(/_/g, '\\_'));
					}
				}
			}
			if (pong.motd) Embed.addField('**MOTD:**', pong.motd.clean.join('\n').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&le;/g, '≤').replace(/&ge;/g, '≥'));
			if (pong.icon) {
				const base64string = Buffer.from(pong.icon.replace(/^data:image\/png;base64,/, ''), 'base64');
				const iconpng = new Discord.MessageAttachment(base64string, 'icon.png');
				await Embed.attachFiles([iconpng]).setThumbnail('attachment://icon.png');
			}
			if (pong.plugins) {
				const link = await hastebin.createPaste(pong.plugins.raw.join('\n'), { server: 'https://bin.birdflop.com' });
				Embed.addField('**Plugins:**', `[Click Here](${link})`);
			}
			if (!pong.debug.query) {
				if (pong.software == 'Waterfall') Embed.setFooter('Query disabled! If you want to see more information, please contact the owner and tell them to set query_enabled to true and query_port to the same port as the proxy in config.yml');
				if (pong.software == 'Bungeecord') Embed.setFooter('Query disabled! If you want to see more information, please contact the owner and tell them to set query_enabled to true and query_port to the same port as the proxy in config.yml');
				else Embed.setFooter('Query disabled! If you want to see more information, please contact the owner and tell them to set enable-query to true and query.port to the same port as the server in server.properties');
			}
		}
		client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({
			data: {
				content: 'Pong!',
			},
		});
		await client.channels.cache.get(interaction.channel_id).send(Embed);
	},
};