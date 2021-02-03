module.exports = {
	name: 'supportpanel',
	cooldown: 10,
	guildOnly: true,
	async execute(message, args, client, sleep, config, Discord) {
		await message.delete();
		if (!message.member.permissions.has('ADMINISTRATOR')) return;
		if (!message.channel.name.includes('support')) return message.reply('This command is only executable in the support channel!');
		const msg = await message.channel.send({ embed: {
			color: 3447003,
			title: 'Need help? No problem!',
			description: 'React with 🎫 to open a ticket!',
			footer: {
				text: `${message.guild.name} Support`,
				icon_url: message.guild.iconURL(),
			},
		} });
		await msg.react('🎫');
	},
};