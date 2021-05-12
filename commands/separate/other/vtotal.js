function checkign(user, command, message) {
	const console = message.guild.channels.cache.find(channel => channel.name === 'console');
	const member = message.guild.members.cache.get(user.id);
	console.send(`discord linked ${member.displayName}`);
	const filter = m => m.content.includes(member.displayName);
	const usernamecollector = console.createMessageCollector(filter, { time: 14000 });
	usernamecollector.on('collect', m => {
		if (m.author.id != '661797951223627787' && m.author.id != '743741294190395402') return;
		const output = m.content.split(/\n/);
		const check3 = output.find(site => site.includes('- Player: '));
		if (!check3) return;
		const playername = check3.split(' (')[0].replace('- Player: ', '');
		if (playername == '<Unknown>') {
			member.send({ embed: {
				color: 3447003,
				title: 'Could not get votetotal output.',
				description: 'You need a linked account to see your votetotal.',
				footer: {
					text: message.guild.name,
					icon_url: message.guild.iconURL(),
				},
			} });
			return;
		}
		if (playername.includes(' • ') || playername.includes('[')) {
			member.send({ embed: {
				color: 3447003,
				title: 'Could not get votetotal output.',
				description: 'You might need to leave the server to make this work.',
				footer: {
					text: message.guild.name,
					icon_url: message.guild.iconURL(),
				},
			} });
			return;
		}
		console.send(`${command} ${playername}`);
		const filter2 = m2 => m2.content.includes('Total Votes');
		const vnextcollect = console.createMessageCollector(filter2, { time: 7000 });
		vnextcollect.on('collect', m2 => {
			const output2 = m2.content.split(/\n/);
			const vtotal1 = output2.find(site => site.startsWith('Daily')).replace('Daily Total:', '**Daily Total:**');
			const vtotal2 = output2.find(site => site.startsWith('Weekly')).replace('Weekly Total:', '**Weekly Total:**');
			const vtotal3 = output2.find(site => site.startsWith('Monthly')).replace('Monthly Total:', '**Monthly Total:**');
			const vtotal4 = output2.find(site => site.startsWith('AllTime')).replace('AllTime Total:', '**AllTime Total:**');
			member.send({ embed: {
				color: 3447003,
				title: 'Your Total Votes:',
				description: `${vtotal1}\n${vtotal2}\n${vtotal3}\n${vtotal4}`,
				footer: {
					text: message.guild.name,
					icon_url: message.guild.iconURL(),
				},
			} });
		});
		return;
	});
}
module.exports = {
	name: 'vtotal',
	description: 'Check your votetotal',
	async execute(message, args, client, Client, Discord, reaction) {
		if (message.guild.id !== '711661870926397601' && message.guild.id !== '661736128373719141') return;
		if (reaction) {
			message.author = Client;
		}
		checkign(message.author, 'vtotal', message);
	},
};