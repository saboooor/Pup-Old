module.exports = {
	name: 'stats',
	guildOnly: true,
	aliases: ['status'],
	async execute(message, args, client, sleep, config, Client, Discord) {
		const Embed = new Discord.MessageEmbed().setThumbnail('https://bugs.mojang.com/secure/attachment/99116/unknown_pack.png');
		const reply = await message.channel.send('Pinging...');
		const panel = 'https://panel.birdflop.com';
		const util = require('minecraft-server-util');
		require('moment-duration-format');
		const moment = require('moment');
		let id = ''; let serverip = '';
		let serverport = 25565; let arg = args[0];
		let pong = ''; let info = '';
		let cpu = ''; let name = '';
		let ram = ''; let status = '';
		let statuscolor = ''; let statusname = '';
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
			serverip = args.join(':').split(':')[0];
			const port = args.join(':').split(':')[1];
			if (port) serverport = parseInt(port);
			name = `${serverip}:${serverport}`.replace(':25565', '');
			statuscolor = 3447003;
		}
		if (id !== '') {
			Embed.setThumbnail(message.guild.iconURL());
			Client.login(panel, config.panelapikey, (logged_in, err) => {
				if (logged_in == false) return message.reply(`Something went wrong\n${err}`);
			});
			info = await Client.getServerInfo(id).catch((error) => {console.log(error);});
			cpu = await Client.getCPUUsage(id).catch((error) => {console.log(error);});
			ram = await Client.getRAMUsage(id).catch((error) => {console.log(error);});
			status = await Client.getServerStatus(id).catch((error) => {console.log(error);});
			statusname = status.replace('running', 'Online').replace('stopping', 'Stopping').replace('offline', 'Offline').replace('starting', 'Starting');
			name = `${info.attributes.name} (${statusname})`;
			if (status == 'running') statuscolor = 65280;
			if (status == 'stopping') statuscolor = 16737280;
			if (status == 'offline') statuscolor = 16711680;
			if (status == 'starting') statuscolor = 16737280;
			if (id == '5bcaad8d') {
				name = 'Pup Bot';
				icon_url = reply.author.avatarURL();
				const duration = moment.duration(client.uptime).format('D [days], H [hrs], m [mins], s [secs]');
				if (duration) Embed.addField('**Uptime:**', duration);
				Embed.setThumbnail(reply.author.avatarURL());
			}
			if (info.attributes.node) Embed.addField('**Node:**', info.attributes.node);
			if (cpu.current) Embed.addField('**CPU Usage:**', cpu.current);
			if (ram.current) Embed.addField('**RAM Usage:**', `${Math.ceil(ram.current / 1000000)} MB`);
		}
		if (serverip !== '') {
			try {
				pong = await util.status(serverip, { port: serverport });
			}
			catch (e) {
				if (id == '') {
					reply.edit('**Invalid Server**\n`Trying Bedrock...`\nYou can use any valid Minecraft server IP\nor use an option from the list below:\n`PB, TH, ND, NDT`');
					try {
						pong = await util.statusBedrock(serverip, { port: serverport });
					}
					catch (a) {
						return reply.edit('**Invalid Server**\nYou can use any valid Minecraft server IP\nor use an option from the list below:\n`PB, TH, ND, NDT`');
					}
				}
			}
			if (pong.version) Embed.addField('**Version:**', pong.version);
			if (pong.maxPlayers) Embed.addField('**Players Online:**', `${pong.onlinePlayers} / ${pong.maxPlayers}`);
			let players = pong.samplePlayers;
			if (players) {
				players.forEach(element => {
					players[players.indexOf(element)] = element.name;
				});
				players = players.join('\n');
				Embed.addField('**Players:**', players);
			}
			if (pong.motdLine1) Embed.addField('**MOTD:**', pong.motdLine1.descriptionText.replace(/§{1}./g, ''));
			if (pong.description) Embed.addField('**MOTD:**', pong.description.descriptionText.replace(/§{1}./g, ''));
			if (pong.favicon) {
				const base64string = Buffer.from(pong.favicon.replace(/^data:image\/png;base64,/, ""), 'base64');
				const iconpng = new Discord.MessageAttachment(base64string, "icon.png");
				Embed.attachFiles([iconpng]).setThumbnail('attachment://icon.png');
			}
		}
		Embed.setColor(statuscolor).setAuthor(name);
		await reply.delete();
		await message.channel.send(Embed);
	},
};