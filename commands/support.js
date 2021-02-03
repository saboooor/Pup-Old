module.exports = {
	name: 'support',
	cooldown: 10,
	guildOnly: true,
	async execute(message, args, client, sleep, config, Discord) {
		await message.delete();
		const randomcolor = Math.floor(Math.random() * 16777215);
		await message.channel.send({ embed: {
			color: randomcolor,
			title: 'How to create support tickets',
			description:
`1. Create a channel that contains the word "support"
2. Create a category that contains the word "tickets"
3. Create a role that contains the word "staff"
If you already have any of these, you can skip the step.
4. Execute \`${config.prefix}supportpanel\` in your support channel
5. You're done!`,
		} });
	},
};