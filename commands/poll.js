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
		const Usage = new Discord.MessageEmbed()
			.setColor(3447003)
			.setTitle('Usage')
			.setDescription(`\`${config.prefix}poll yesno <Yes/No Question>\`\n\`${config.prefix}poll choices "<Question>" [<Emoji> "<Option>"]\``)
			.setFooter('You can add more options by repeating [<Emoji> "<Option>"]');
		const Poll = new Discord.MessageEmbed()
			.setColor(3447003)
			.setTitle('Poll')
			.setAuthor(message.author.username, message.author.avatarURL());
		if (!args[1]) return message.channel.send(Usage);
		let channel = message.guild.channels.cache.find(c => c.name.includes('polls'));
		if (channel) channel = message.channel;
		if (!args[0].toLowerCase() == 'yesno') {
			const poll = args.join(' ').replace(args[0] + ' ', '');
			Poll.setDescription(poll);
			const msg = await channel.send(Poll);
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
			Poll.setDescription(`${e}\n${poll.join('')}`);
			const msg = await channel.send(Poll);
			res.forEach(p => {
				if (p !== undefined) {
					msg.react(p).catch(a => console.log(a));
				}
			});
		}
		else {return message.channel.send(Usage);}
		if (channel === message.channel) return;
		if (channel === message.guild.channels.cache.find(c => c.name.includes('polls'))) return message.channel.send(`**Poll Created! Check <#${channel.id}>**`);
	},
};