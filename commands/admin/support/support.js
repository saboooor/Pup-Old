module.exports = {
	name: 'support',
	cooldown: 10,
	guildOnly: true,
	async execute(message, args, client, Client, Discord) {
		const srvconfig = client.settings.get(message.guild.id);
		await message.delete();
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.floor(Math.random() * 16777215))
			.setTitle('How to create support tickets')
			.setDescription(`1. Create a channel category that contains the word "tickets"
2. Create a role that contains the word "staff"
3. Execute \`${srvconfig.prefix}supportpanel\` in your support channel
4. You're done!`);
		await message.channel.send(Embed);
	},
};