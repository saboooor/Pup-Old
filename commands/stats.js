module.exports = {
	name: 'stats',
	guildOnly: true,
	aliases: ['status'],
	async execute(message, args, client, sleep, config, Client, Discord) {
		const reply = await message.channel.send('Pinging...');
		const panel = 'https://panel.birdflop.com';
		const util = require('minecraft-server-util');
		require('moment-duration-format');
		const moment = require('moment');
		let id = ''; let serverip = '';
		let serverport = 25565; let mcstats = '';
		let panelstats = ''; let pong = '';
		let info = ''; let cpu = '';
		let ram = ''; let status = '';
		let statuscolor = ''; let statusname = '';
		let name = ''; let icon_url = '';
		let arg = args[0]; let pup = '';
		if (arg !== undefined) arg = arg.toLowerCase();
		if (arg === undefined) {
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
			serverip = args.join(':').split(':')[0];
			const port = args.join(':').split(':')[1];
			if (port !== undefined) serverport = parseInt(port);
			name = `${serverip}:${serverport}`.replace(':25565', '');
			statuscolor = 3447003;
		}
		if (serverip !== '') {
			try {
				pong = await util.status(serverip, { port: serverport });
			}
			catch (e) {
				reply.edit('**Invalid Server**\n`Trying Bedrock...`\nYou can use any valid Minecraft server IP\nor use an option from the list below:\n`PB, TH, ND, NDT`');
				try {
					pong = await util.statusBedrock(serverip, { port: serverport });
				}
				catch (a) {
					return reply.edit('**Invalid Server**\nYou can use any valid Minecraft server IP\nor use an option from the list below:\n`PB, TH, ND, NDT`');
				}
			}
			// eslint-disable-next-line prefer-const
			let players = pong.samplePlayers;
			if (players !== undefined) {
				if (players !== null) {
					players.forEach(element => {
						players[players.indexOf(element)] = element.name;
					});
					players = players.join('\n');
				}
			}
			if (pong.description === undefined) {
				mcstats = `\n**Players Online:** ${pong.onlinePlayers} / ${pong.maxPlayers}\n**MOTD:** ${pong.motdLine1.descriptionText}`;
			}
			else {
				mcstats = `\n**Version:** ${pong.version}\n**Players Online:** ${pong.onlinePlayers} / ${pong.maxPlayers}\n${players}\n**MOTD:**\n${pong.description.descriptionText}`;
			}
		}
		if (id !== '') {
			Client.login(panel, config.panelapikey, (logged_in, err) => {
				if (logged_in == false) return message.reply(`Something went wrong\n${err}`);
			});
			info = await Client.getServerInfo(id).catch((error) => {console.log(error);});
			cpu = await Client.getCPUUsage(id).catch((error) => {console.log(error);});
			ram = await Client.getRAMUsage(id).catch((error) => {console.log(error);});
			status = await Client.getServerStatus(id).catch((error) => {console.log(error);});
			statusname = status.replace('running', 'Online').replace('stopping', 'Stopping').replace('offline', 'Offline').replace('starting', 'Starting');
			name = `${info.attributes.name} (${statusname})`;
			icon_url = message.guild.iconURL();
			if (status == 'running') statuscolor = 65280;
			if (status == 'stopping') statuscolor = 16737280;
			if (status == 'offline') statuscolor = 16711680;
			if (status == 'starting') statuscolor = 16737280;
			if (id == '5bcaad8d') {
				name = 'Pup Bot';
				icon_url = reply.author.avatarURL();
				const duration = moment.duration(client.uptime).format('D [days], H [hrs], m [mins], s [secs]');
				pup = `\n**Uptime:** ${duration}`;
			}
			panelstats = `**Node:** ${info.attributes.node}\n**CPU Usage:** ${cpu.current}%\n**RAM Usage:** ${Math.ceil(ram.current / 1000000)} MB`;
		}
		// const imageStream = new Buffer.from(pong.favicon, 'base64');
		// const attachment = new Discord.MessageAttachment(imageStream, 'img.png');
		// console.log(attachment);
		const Embed = new Discord.MessageEmbed()
			.setColor(statuscolor)
			.setAuthor(name, icon_url)
			.setDescription(`${panelstats}${pup}${mcstats.replace('\nnull', '')}`.replace(/§{1}./g, '').replace(' discord.gg', ' https://discord.gg'));
		await reply.edit('', Embed);
	},
};
