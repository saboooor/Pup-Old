function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
module.exports = {
	name: 'alerts',
	description: 'Toggle the Alerts role',
	async execute(message, args, client, Client, Discord, reaction) {
		if (message.guild.id != '711661870926397601') return;
		if (message.guild.id != '661736128373719141') return;
		if (reaction) {
			if (message.author.id != client.user.id) return;
			message.author = Client;
		}
		const member = await message.guild.members.cache.find(m => m.id === message.author.id);
		const role = await message.guild.roles.cache.find(r => r.name.toLowerCase() === 'alerts');
		if (!member.roles.cache.has(role.id)) {
			await member.roles.add(role);
			const msg = await message.channel.send(`✅ **Added Alerts Role to ${message.author}**`);
			if (reaction) {
				await sleep(1000);
				await msg.delete();
			}
		}
		else {
			await member.roles.remove(role);
			const msg = await message.channel.send(`❌ **Removed Alerts Role from ${message.author}**`);
			if (reaction) {
				await sleep(1000);
				await msg.delete();
			}
		}
	},
};