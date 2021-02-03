module.exports = {
	name: 'link',
	cooldown: 10,
	guildOnly: false,
	async execute(message, args, client, sleep, config, Discord) {
		const randomcolor = Math.floor(Math.random() * 16777215);
		if (message.guild.id == '661736128373719141') {
			message.channel.send({ embed: {
				color: randomcolor,
				title: 'DISCORD LINKING',
				description: `**Follow these steps to link your Discord and Minecraft accounts**
**1.** If you are not already on the server, join it.
**2.** Use the command \`/link\` in-game.
**3.** Click here -> <@661797951223627787>
**4.** Enter the 4 digit code in the box that reads \`Message @Warden\`
**5.** Hit enter. Your account should now be linked!

**Having Trouble?**
If after step 3, you do not see a box that says \`Message @Warden\`, you disabled direct messages from server members. To turn this back on, follow the steps below:
**1.** On your list of Discord servers in the left-hand servers tab, you should see the Nether Depths logo (<:ND:770494219512315935>). Right click it.
**2.** Click Privacy \`Settings\`
**3.** Enable the setting labeled \`Allow direct messages from server members\`.`,
			} });
		}
		if (message.guild.id == '711661870926397601') {
			message.channel.send({ embed: {
				color: randomcolor,
				title: 'DISCORD LINKING',
				description: `**Follow these steps to link your Discord and Minecraft accounts**
**1.** If you are not already on the server, join it.
**2.** Use the command \`/link\` in-game.
**3.** Click here -> <@743741294190395402>
**4.** Enter the 4 digit code in the box that reads \`Message @Taco's Turtle Bot'\`
**5.** Hit enter. Your account should now be linked!

**Having Trouble?**
If after step 3, you do not see a box that says \`Message @Taco's Turtle Bot\`, you disabled direct messages from server members. To turn this back on, follow the steps below:
**1.** On your list of Discord servers in the left-hand servers tab, you should see the Taco Haven logo. Right click it.
**2.** Click Privacy \`Settings\`
**3.** Enable the setting labeled \`Allow direct messages from server members\`.`,
			} });
		}
	},
};
