module.exports = {
	name: 'changelog',
	aliases: ['cl'],
	guildOnly: true,
	args: true,
	usage: '<Changelog>',
	async execute(message, args, client, Client, Discord) {
		if (!guilds.get('661736128373719141').members.cache.get(message.member.id).roles.cache.has('699724468469366844')) return message.reply('You can\'t do that!');
	},
};