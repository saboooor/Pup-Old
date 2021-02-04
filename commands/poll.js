module.exports = {
	name: 'poll',
	cooldown: 10,
	guildOnly: true,
	async execute(message, args, client, sleep, config, Client, Discord) {
		function isEven(value) {
			if (value % 2 == 0) {
				return true;
			}
			else {
				return false;
			}
		}
		if (args[1] === undefined) {
			return message.channel.send({ embed: {
				color: 3447003,
				title: 'Usage:',
				description: `\`${config.prefix}poll yesno <Yes/No Question>\`\n\`${config.prefix}poll choices "<Question>" [<Emoji> "<Option>"]\``,
				footer: { text: 'You can add more options by repeating [<Emoji> "<Option>"]' },
			} });
		}
		let channel = message.guild.channels.cache.find(c => c.name.includes('polls'));
		if (channel === undefined) channel = message.channel;
		if (args[0].toLowerCase() == 'yesno') {
			const poll = args.join(' ').replace(args[0] + ' ', '');
			const msg = await channel.send({ embed: {
				color: 3447003,
				author: {
					name: message.author.username,
					icon_url: message.author.avatarURL(),
				},
				title: 'Poll',
				description: poll,
			} });
			await msg.react(config.yes);
			await msg.react(config.no);
		}
		else if (args[0].toLowerCase() == 'choices') {
			message.channel.send('Keep in mind that this poll option is still a work in progress. Please DM or ping @saboor#6969 to report any bugs.');
			let poll = args.join(' ').replace(args[0], '');
			const res = poll.replace(/ /g, '').split('"');
			poll = poll.split('"');
			if (poll.join('').includes('<')) return message.reply('Unknown emoji! Try using a universal emoji.');
			poll.forEach(p => {
				if (p !== undefined && isEven(poll.indexOf(p))) poll[poll.indexOf(p)] = `\n${p} ${poll[poll.indexOf(p) + 1]}`;
			});
			for (let i = 0; i < poll.length; i++) {
				poll.splice(i + 1, 1);
				res.splice(i + 1, 1);
			}
			const e = poll[0];
			poll.shift();
			poll.pop();
			const msg = await channel.send({ embed: {
				color: 3447003,
				author: {
					name: message.author.username,
					icon_url: message.author.avatarURL(),
				},
				title: 'Poll',
				description: `${e}\n${poll.join('')}`,
			} });
			res.forEach(p => {
				try {
					if (p !== undefined) {
						msg.react(p);
					}
				}
				catch(l) {console.log(l);}
			});
		}
		else {
			return message.channel.send({ embed: {
				color: 3447003,
				title: 'Usage:',
				description: `\`${config.prefix}poll yesno <Yes/No Question>\`\n\`${config.prefix}poll choices "<Question>" [<Emoji> "<Option>"]\``,
				footer: { text: 'You can add more options by repeating [<Emoji> "<Option>"]' },
			} });
		}
		if (channel === message.channel) return;
		if (channel === message.guild.channels.cache.find(c => c.name.includes('polls'))) return message.channel.send(`**Poll Created! Check <#${channel.id}>**`);
	},
};