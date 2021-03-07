// Prerequisite:
// Set DiscordChatChannelListCommandExpiration in the DiscordSRV config.yml to 0 to prevent 'Unknown Message' from showing in the console cuz of SurvivalChat trying to delete a message that got deleted already
// We'll be using line 2 of the code for the expiration instead
//
// How to add a new rank (In this case the new rank would be Warden which should be added to acorn for 4000 votes just sayin):
// 1. add const warden = players.filter(word => word.startsWith('[Warden]')).sort(); anywhere in the first list of the constants (Order doesn't matter but it would be good anyways)
// 2. add .filter(word => !word.startsWith('[Warden]')) anywhere in the list of lines that start with '.filter' (Order doesn't matter but it would be good anyways)
// 3. add const wardenfinal = warden.join(', ').replace("[", ".[").replace(".", "\nWarden: ").replace(/\[Warden\] /g, ""); anywhere in the second list of the constants (Order doesn't matter but it would be good anyways)
// 4. add ${wardenfinal} to the line that starts with 'message.channel.send' (Order doesn't matter but it would be good anyways)
//
// Code:
module.exports = {
	name: 'netherlist',
	description: '',
	execute(message, Discord) {
		if (message.author.id !== '661797951223627787') return;
		message.delete();
		const count = message.content.split(/\n+/)[0];
		const players = message.content.replace(`${count}\n\`\`\`\n`, '').replace('\n```', '').split(/, /);
		const owner = players.filter(word => word.startsWith('OWNER')).sort();
		const admin = players.filter(word => word.startsWith('ADMIN')).sort();
		const mod = players.filter(word => word.startsWith('MOD')).sort();
		const helper = players.filter(word => word.startsWith('HELPER')).sort();
		const mvp = players.filter(word => word.startsWith('MVP')).sort();
		const vip = players.filter(word => word.startsWith('VIP')).sort();
		const goat = players.filter(word => word.startsWith('GOAT')).sort();
		const warden = players.filter(word => word.startsWith('WARDEN')).sort();
		const axolotl = players.filter(word => word.startsWith('AXOLOTL')).sort();
		const hoglin = players.filter(word => word.startsWith('HOGLIN')).sort();
		const strider = players.filter(word => word.startsWith('STRIDER')).sort();
		const blaze = players.filter(word => word.startsWith('BLAZE')).sort();
		const enderman = players.filter(word => word.startsWith('ENDERMAN')).sort();
		const skeleton = players.filter(word => word.startsWith('SKELETON')).sort();
		const player = players.filter(word => word.startsWith('PLAYER')).sort();
		const guest = players.filter(word => word.startsWith('GUEST')).sort();
		const other = players
			.filter(word => {
				!word.startsWith('OWNER');
				!word.startsWith('ADMIN');
				!word.startsWith('MOD');
				!word.startsWith('HELPER');
				!word.startsWith('MVP');
				!word.startsWith('VIP');
				!word.startsWith('GOAT');
				!word.startsWith('WARDEN');
				!word.startsWith('AXOLOTL');
				!word.startsWith('HOGLIN');
				!word.startsWith('STRIDER');
				!word.startsWith('BLAZE');
				!word.startsWith('ENDERMAN');
				!word.startsWith('SKELETON');
				!word.startsWith('PLAYER');
				!word.startsWith('GUEST');
			})
			.sort();
		const Embed = new Discord.MessageEmbed()
			.setColor(Math.floor(Math.random() * 16777215))
			.setTitle(count)
		const ownerfinal = owner.join(', ').replace(/OWNER • /g, '').replace(/_/g, '\\_');
		if (ownerfinal) Embed.addField('Owner', ownerfinal);
		const adminfinal = admin.join(', ').replace(/ADMIN • /g, '').replace(/_/g, '\\_');
		if (adminfinal) Embed.addField('Admin', adminfinal);
		const modfinal = mod.join(', ').replace(/MOD • /g, '').replace(/_/g, '\\_');
		if (modfinal) Embed.addField('Mod', modfinal);
		const helperfinal = helper.join(', ').replace(/HELPER • /g, '').replace(/_/g, '\\_');
		if (helperfinal) Embed.addField('Helper', helperfinal);
		const mvpfinal = mvp.join(', ').replace(/MVP • /g, '').replace(/_/g, '\\_');
		if (mvpfinal) Embed.addField('MVP', mvpfinal);
		const vipfinal = vip.join(', ').replace(/VIP • /g, '').replace(/_/g, '\\_');
		if (vipfinal) Embed.addField('VIP', vipfinal);
		const goatfinal = goat.join(', ').replace(/GOAT • /g, '').replace(/_/g, '\\_');
		if (goatfinal) Embed.addField('Goat', goatfinal);
		const wardenfinal = warden.join(', ').replace(/WARDEN • /g, '').replace(/_/g, '\\_');
		if (wardenfinal) Embed.addField('Warden', wardenfinal);
		const axolotlfinal = axolotl.join(', ').replace(/AXOLOTL • /g, '').replace(/_/g, '\\_');
		if (axolotlfinal) Embed.addField('Axolotl', axolotlfinal);
		const hoglinfinal = hoglin.join(', ').replace(/HOGLIN • /g, '').replace(/_/g, '\\_');
		if (hoglinfinal) Embed.addField('Hoglin', hoglinfinal);
		const striderfinal = strider.join(', ').replace(/STRIDER • /g, '').replace(/_/g, '\\_');
		if (striderfinal) Embed.addField('Strider', striderfinal);
		const blazefinal = blaze.join(', ').replace(/BLAZE • /g, '').replace(/_/g, '\\_');
		if (blazefinal) Embed.addField('Blaze', blazefinal);
		const endermanfinal = enderman.join(', ').replace(/ENDERMAN • /g, '').replace(/_/g, '\\_');
		if (endermanfinal) Embed.addField('Enderman', endermanfinal);
		const skeletonfinal = skeleton.join(', ').replace(/SKELETON • /g, '').replace(/_/g, '\\_');
		if (skeletonfinal) Embed.addField('Skeleton', skeletonfinal);
		const playerfinal = player.join(', ').replace(/PLAYER • /g, '').replace(/_/g, '\\_');
		if (playerfinal) Embed.addField('Player', playerfinal);
		const guestfinal = guest.join(', ').replace(/GUEST • /g, '').replace(/_/g, '\\_');
		if (guestfinal) Embed.addField('Guest', guestfinal);
		const otherfinal = other.join(', ');
		if (otherfinal) Embed.addField('Other', otherfinal);
		message.channel.send(Embed).then(msg => {
			setTimeout(function() {
				msg.delete();
			}, 5000);
		});
	},
};
