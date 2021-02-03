module.exports = {
	name: '🤖not-linked🤖',
	description: '',
	execute(reaction, user, client, config, message) {
		if (reaction.emoji.name != '⛔') return;
		const member = message.guild.members.cache.find(m => m.id === user.id);
		const role = message.guild.roles.cache.find(r => r.id === '661800317763190812');
		member.roles.add(role);
		reaction.users.remove(user.id);
		return;
	},
};
