module.exports = {
	name: 'announcements',
	description: '',
	execute(reaction, user, client, config, message) {
		if (reaction.emoji.name != '📜') return;
		const member = message.guild.members.cache.find(m => m.id === user.id);
		if (!member.roles.cache.has('772251811968188447')) {
			member.send('You need to link your discord account first!\nTo link your discord, do -link and follow the instructions!');
			reaction.users.remove(user.id);
		}
	},
};