module.exports = {
	name: 'boner',
	aliases: ['pp', 'penis', 'erect'],
	cooldown: 10,
	guildOnly: false,
	async execute(message, args, client, sleep, config, Discord) {
		const random = Math.round(Math.random() * 35);
		const pp = await message.channel.send('Calculating pp size..');
		let penis = '8D';
		let randomcolor = '';
		const ms = 1000;
		const member = message.member;
		for (let step = 0; step < random; step++) {
			randomcolor = Math.round(Math.random() * 16777215);
			sleep(ms);
			await pp.edit('', { embed: {
				color: randomcolor,
				title: `${member.displayName}'s pp size`,
				description: `${penis}`,
			} });
			penis = penis.replace('=', '==').replace('8D', '8=D');
		}
		const sike = Math.round(Math.random() * 10);
		if (sike == 5) {
			await pp.edit({ embed: {
				color: randomcolor,
				title: `${member.displayName}'s pp size`,
				description: 'sike bitch',
				footer: {
					text: 'u have no pp',
				},
			} });
			return;
		}
		await pp.edit({ embed: {
			color: randomcolor,
			title: `${member.displayName}'s pp size`,
			description: pp.embeds[0].description,
			footer: {
				text: `pp size = ${random}"`,
			},
		} });
		return;

	},
};