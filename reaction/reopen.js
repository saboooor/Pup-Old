module.exports = {
	name: 'reopen',
	description: '',
	execute(reaction, user, client, config, message) {
		if (message.author.id != config.botid) return;
		const r = client.users.cache.find(u => u.tag == message.channel.topic);
		reaction.users.remove(user.id);
		message.channel.setName(message.channel.name.replace(/closed/, 'ticket'));
		setTimeout(function() {
			if (message.channel.name.includes('closed-')) return message.channel.send('Failed to open ticket, please try again in 10 minutes');
			message.delete();
			try {
				message.channel.updateOverwrite(r, { VIEW_CHANNEL: true });
			}
			catch(error) {
				console.error(error);
				message.channel.send('You might wanna try that again (Error 0)');
				return;
			}
			message.reply({ embed: {
				color: 3066993,
				description: `Ticket Opened by ${user.username}`,
			} });
		}, 1000);
		return;
	} };