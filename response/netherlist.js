// Prerequisite:
// Set DiscordChatChannelListCommandExpiration in the DiscordSRV config.yml to 0 to prevent 'Unknown Message' from showing in the console cuz of SurvivalChat trying to delete a message that got deleted already
// We'll be using line 61 instead
//
// How to add a new rank (In this case the new rank would be Warden)
// 1. add const warden = players.filter(word => word.startsWith('[Warden]')).sort().join(', ').replace(/\[Warden\] /g, '').replace(/_/g, '\\_'); in the list of the constants
// 2. add '[Warden]' anywhere in the list of ranks in the other const
// 3. add if (warden) Embed.addField('**Warden**', warden); in the list of if statements (ORDER MATTERS)
//
// Code:
module.exports = {
	name: 'netherlist',
	description: '',
	execute(message, Discord) {
		if (message.author.id !== '661797951223627787') return;
		message.channel.messages.fetch({ limit: 1 }).first().delete();
		message.delete();
		const count = message.content.split(/\n+/)[0];
		const players = message.content.replace(`${count}\n\`\`\`\n`, '').replace('\n```', '').split(/, /);
		const owner = players.filter(word => word.startsWith('OWNER')).sort().join(', ').replace(/OWNER • /g, '').replace(/_/g, '\\_');
		const admin = players.filter(word => word.startsWith('ADMIN')).sort().join(', ').replace(/ADMIN • /g, '').replace(/_/g, '\\_');
		const mod = players.filter(word => word.startsWith('MOD')).sort().join(', ').replace(/MOD • /g, '').replace(/_/g, '\\_');
		const helper = players.filter(word => word.startsWith('HELPER')).sort().join(', ').replace(/HELPER • /g, '').replace(/_/g, '\\_');
		const trainee = players.filter(word => word.startsWith('TRAINEE')).sort().join(', ').replace(/TRAINEE • /g, '').replace(/_/g, '\\_');
		const mvp = players.filter(word => word.startsWith('MVP')).sort().join(', ').replace(/MVP • /g, '').replace(/_/g, '\\_');
		const vip = players.filter(word => word.startsWith('VIP')).sort().join(', ').replace(/VIP • /g, '').replace(/_/g, '\\_');
		const goat = players.filter(word => word.startsWith('GOAT')).sort().join(', ').replace(/GOAT • /g, '').replace(/_/g, '\\_');
		const warden = players.filter(word => word.startsWith('WARDEN')).sort().join(', ').replace(/WARDEN • /g, '').replace(/_/g, '\\_');
		const axolotl = players.filter(word => word.startsWith('AXOLOTL')).sort().join(', ').replace(/AXOLOTL • /g, '').replace(/_/g, '\\_');
		const hoglin = players.filter(word => word.startsWith('HOGLIN')).sort().join(', ').replace(/HOGLIN • /g, '').replace(/_/g, '\\_');
		const strider = players.filter(word => word.startsWith('STRIDER')).sort().join(', ').replace(/STRIDER • /g, '').replace(/_/g, '\\_');
		const blaze = players.filter(word => word.startsWith('BLAZE')).sort().join(', ').replace(/BLAZE • /g, '').replace(/_/g, '\\_');
		const enderman = players.filter(word => word.startsWith('ENDERMAN')).sort().join(', ').replace(/ENDERMAN • /g, '').replace(/_/g, '\\_');
		const skeleton = players.filter(word => word.startsWith('SKELETON')).sort().join(', ').replace(/SKELETON • /g, '').replace(/_/g, '\\_');
		const player = players.filter(word => word.startsWith('PLAYER')).sort().join(', ').replace(/PLAYER • /g, '').replace(/_/g, '\\_');
		const guest = players.filter(word => word.startsWith('GUEST')).sort().join(', ').replace(/GUEST • /g, '').replace(/_/g, '\\_');
		const other = players.filter(word => !['OWNER', 'ADMIN', 'MOD', 'HELPER', 'TRAINEE', 'MVP', 'VIP', 'GOAT', 'WARDEN', 'AXOLOTL', 'HOGLIN', 'STRIDER', 'BLAZE', 'ENDERMAN', 'SKELETON', 'PLAYER', 'GUEST'].some(a => word.startsWith(a))).sort().join(', ');
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.floor(Math.random() * 16777215))
			.setTitle(count);
		if (owner) Embed.addField('**Owner**', owner);
		if (admin) Embed.addField('**Admin**', admin);
		if (mod) Embed.addField('**Mod**', mod);
		if (helper) Embed.addField('**Helper**', helper);
		if (trainee) Embed.addField('**Trainee**', trainee);
		if (mvp) Embed.addField('**MVP**', mvp);
		if (vip) Embed.addField('**VIP**', vip);
		if (goat) Embed.addField('**Goat**', goat);
		if (warden) Embed.addField('**Warden**', warden);
		if (axolotl) Embed.addField('**Axolotl**', axolotl);
		if (hoglin) Embed.addField('**Hoglin**', hoglin);
		if (strider) Embed.addField('**Strider**', strider);
		if (blaze) Embed.addField('**Blaze**', blaze);
		if (enderman) Embed.addField('**Enderman**', enderman);
		if (skeleton) Embed.addField('**Skeleton**', skeleton);
		if (player) Embed.addField('**Player**', player);
		if (guest) Embed.addField('**Guest**', guest);
		if (other) Embed.addField('**Other**', other);
		message.channel.send(Embed).then(msg => {
			setTimeout(function() {
				msg.delete();
			}, 5000);
		});
	},
};
