/* eslint-disable no-shadow */
module.exports = {
	name: 'information',
	description: '',
	async execute(reaction, user, client, config, message) {
		if (message.id != '694041796073881601') return;
		function checkign(reaction, user, voteoption, command) {
			reaction.users.remove(user.id);
			const console = message.guild.channels.cache.find(channel => channel.name === 'console');
			const member = message.guild.members.cache.get(user.id);
			console.send(`discord linked ${member.displayName}`);
			const filter = m => m.content.includes(member.displayName);
			const usernamecollector = console.createMessageCollector(filter, { time: 14000 });
			usernamecollector.on('collect', m => {
				if (m.author.id != '661797951223627787') return;
				const output = m.content.split(/\n/);
				const check3 = output.find(site => site.includes('- Player: '));
				if (!check3) return;
				const playername = check3.split(' (')[0].replace('- Player: ', '');
				if (playername == '<Unknown>') {
					member.send({ embed: {
						color: 3447003,
						title: 'Could not get votenext output.',
						description: 'You need a linked account to see your votenext and votetotal.',
						footer: {
							text: message.guild.name,
							icon_url: message.guild.iconURL(),
						},
					} });
					return;
				}
				if (playername.includes(' • ')) {
					member.send({ embed: {
						color: 3447003,
						title: 'Could not get votenext output.',
						description: 'You might need to leave the server to make this work.',
						footer: {
							text: message.guild.name,
							icon_url: message.guild.iconURL(),
						},
					} });
					return;
				}
				console.send(`${command} ${playername}`);
				voteoption(console, member);
				return;
			});
		}
		function vnext(console, member) {
			const filter = m => m.content.includes('Next Votes');
			const vnextcollect = console.createMessageCollector(filter, { time: 7000 });
			vnextcollect.on('collect', m => {
				const output = m.content.split(/\n/);
				const vnext1 = output.find(site => site.startsWith('TOPG')).replace('TOPG:', '**TOPG:**');
				const vnext2 = output.find(site => site.startsWith('MCSN')).replace('MCSN:', '**MCSN:**');
				const vnext3 = output.find(site => site.startsWith('MCSO')).replace('MCSO:', '**MCSO:**');
				const vnext4 = output.find(site => site.startsWith('PMC')).replace('PMC:', '**PMC:**');
				const vnext5 = output.find(site => site.startsWith('MCSL')).replace('MCSL:', '**MCSL:**');
				const vnext6 = output.find(site => site.startsWith('MCMP')).replace('MCMP:', '**MCMP:**');
				member.send({ embed: {
					color: 3447003,
					title: 'Your Next Votes:',
					description: `${vnext1}\n${vnext2}\n${vnext3}\n${vnext4}\n${vnext5}\n${vnext6}`,
					footer: {
						text: message.guild.name,
						icon_url: message.guild.iconURL(),
					},
				} });
			});
			return;
		}
		function vtotal(console, member) {
			const filter = m => m.content.includes('Total Votes');
			const vnextcollect = console.createMessageCollector(filter, { time: 7000 });
			vnextcollect.on('collect', m => {
				const output = m.content.split(/\n/);
				const vtotal1 = output.find(site => site.startsWith('Daily')).replace('Daily Total:', '**Daily Total:**');
				const vtotal2 = output.find(site => site.startsWith('Weekly')).replace('Weekly Total:', '**Weekly Total:**');
				const vtotal3 = output.find(site => site.startsWith('Monthly')).replace('Monthly Total:', '**Monthly Total:**');
				const vtotal4 = output.find(site => site.startsWith('AllTime')).replace('AllTime Total:', '**AllTime Total:**');
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
		}
		if (reaction.emoji.name == '❗') {
			const member = message.guild.members.cache.find(member => member.id === user.id);
			const role = message.guild.roles.cache.find(role => role.id === '744779426612641872');
			if (!member.roles.cache.has('744779426612641872')) {
				member.roles.add(role);
				reaction.users.remove(user.id);
				message.channel.send(`✅ **Added Alerts Role to <@${user.id}>**`)
					.then(msg => {
						setTimeout(function() {
							msg.delete();
						}, 1000);
					});
				return;
			}
			if (member.roles.cache.has('744779426612641872')) {
				member.roles.remove(role);
				reaction.users.remove(user.id);
				message.channel.send(`❌ **Removed Alerts Role from <@${user.id}>**`)
					.then(msg => {
						setTimeout(function() {
							msg.delete();
						}, 1000);
					});
				return;
			}
		}
		if (reaction.emoji.name == '📘') checkign(reaction, user, vnext, 'vnext');
		if (reaction.emoji.name == '🏆') checkign(reaction, user, vtotal, 'vtotal');
	},
};
