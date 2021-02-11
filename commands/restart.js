module.exports = {
	name: 'restart',
	guildOnly: false,
	async execute(message, args, client, sleep, config, Client, Discord) {
		let id = '5bcaad8d';
		let arg = args[0];
		if (arg !== undefined) arg = arg.toLowerCase();
		if (arg === undefined) {
			if (message.guild.id == '661736128373719141') id = '1eb5e2e9';
			else if (message.guild.id == '711661870926397601') id = 'd68c84e1';
		}
		else if (arg == 'pb') {id = '5bcaad8d';}
		else if (arg == 'th') {id = 'd68c84e1';}
		else if (arg == 'nd') {id = '1eb5e2e9';}
		else if (arg == 'ndt') {id = '6f0c0a62';}
		else {return message.channel.send('**Invalid server**\nList of servers:\n`PB, TH, ND, NDT`');}
		const guilds = client.guilds.cache;
		try {
			if (id == '5bcaad8d') if (message.member.id != '249638347306303499') return message.reply('You can\'t do that!');
			if (id == '1eb5e2e9') if (!guilds.get('661736128373719141').members.cache.get(message.member.id).roles.cache.has('699724468469366844')) return message.reply('You can\'t do that!');
			if (id == 'd68c84e1') if (!guilds.get('711661870926397601').members.cache.get(message.member.id).roles.cache.has('716208607070257162')) return message.reply('You can\'t do that!');
		}
		catch (e) {
			return message.reply('You can\'t do that!');
		}
		Client.login('https://panel.birdflop.com', config.panelapikey, (logged_in, err) => {
			if (logged_in == false) return message.reply(`Something went wrong, please use https://panel.birdflop.com\n${err}`);
		});
		if (id == '5bcaad8d') {
			client.user.setPresence({ activity: { name: 'Restarting', type: 'PLAYING' } });
		}
		const info = await Client.getServerInfo(id).catch((error) => {console.log(error);});
		Client.restartServer(id).catch(() => {
			console.log(`Restarting ${info.attributes.name}`);
		});
		await message.channel.send(`Restarting ${info.attributes.name}`);
		if (id == '5bcaad8d') {
			Client.killServer(id).catch(() => {
				console.log('Goodbye!');
			});
		}
	},
};
