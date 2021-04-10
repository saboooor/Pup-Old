module.exports = {
	name: 'alerts',
	description: 'Toggle the Alerts role',
	async execute(message, args, client, Client, Discord, reaction) {
		if (reaction) {
			if (message.author.id != client.user.id) return;
			message.author = Client;
		}
		const member = message.guild.members.cache.find(m => m.id === message.author.id);
		const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'alerts');
		if (!member.roles.cache.has(role.id)) {
			member.roles.add(role);
			message.channel.send(`✅ **Added Alerts Role to ${message.author}**`)
				.then(msg => {
					setTimeout(function() {
						msg.delete();
					}, 1000);
				});
			return;
		}
		if (member.roles.cache.has(role.id)) {
			member.roles.remove(role);
			message.channel.send(`❌ **Removed Alerts Role from ${message.author}**`)
				.then(msg => {
					setTimeout(function() {
						msg.delete();
					}, 1000);
				});
			return;
		}
	},
};