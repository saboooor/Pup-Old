module.exports = {
	name: 'whatip',
	description: '',
	async execute(message) {
		try {
			if (message.channel.guild.id == '711661870926397601') return message.channel.send('tacohaven.club');
			if (message.channel.guild.id == '661736128373719141') return message.channel.send('play.netherdepths.com');
			if (message.channel.guild.id == '789642848298336318') return message.channel.send('play.skyflames.net');
		}
		catch(error) {
			console.log(error);
		}
	},
};