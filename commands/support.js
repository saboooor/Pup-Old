module.exports = {
	name: 'support',
	cooldown: 10,
	guildOnly: true,
	async execute(message, args, client, sleep, config, Client, Discord) {
		await message.delete();
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.floor(Math.random() * 16777215))
			.setTitle('How to create support tickets')
			.setDescription(`1. Create a channel that contains the word "support"
2. Create a category that contains the word "tickets"
3. Create a role that contains the word "staff"
If you already have any of these, you can skip the step.
4. Execute \`${srvconfig.prefix}supportpanel\` in your support channel
5. You're done!`);
		await message.channel.send(Embed);
	},
};