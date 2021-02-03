module.exports = {
	name: 'list',
	description: '',
	execute(message) {
		if (message.author.id == '765287593762881616') return;
		message.delete();
		const count = message.content.split(/\n+/)[0];
		const players = message.content.replace(`${count}\n\`\`\`\n`, '').replace('\n```', '').split(/, /).sort();
		message.channel.send({ embed: {
			color: 1752220,
			title: count,
			description: players.join(', ').replace(/_/g, '\\_'),
		} }).then(msg => {
			setTimeout(function() {
				msg.delete();
			}, 5000);
		});
	},
};