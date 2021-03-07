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
	execute(message) {
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
			.filter(word => !word.startsWith('OWNER'))
			.filter(word => !word.startsWith('ADMIN'))
			.filter(word => !word.startsWith('MOD'))
			.filter(word => !word.startsWith('HELPER'))
			.filter(word => !word.startsWith('MVP'))
			.filter(word => !word.startsWith('VIP'))
			.filter(word => !word.startsWith('GOAT'))
			.filter(word => !word.startsWith('WARDEN'))
			.filter(word => !word.startsWith('AXOLOTL'))
			.filter(word => !word.startsWith('HOGLIN'))
			.filter(word => !word.startsWith('STRIDER'))
			.filter(word => !word.startsWith('BLAZE'))
			.filter(word => !word.startsWith('ENDERMAN'))
			.filter(word => !word.startsWith('SKELETON'))
			.filter(word => !word.startsWith('PLAYER'))
			.filter(word => !word.startsWith('GUEST'))
			.sort();
		const ownerfinal = owner.join(', ').replace('O', '\n**OWNER:** O').replace(/OWNER • /g, '');
		const adminfinal = admin.join(', ').replace('A', '\n**ADMIN:** A').replace(/ADMIN • /g, '');
		const modfinal = mod.join(', ').replace('M', '\n**MOD:** M').replace(/MOD • /g, '');
		const helperfinal = helper.join(', ').replace('H', '\n**HELPER:** H').replace(/HELPER • /g, '');
		const mvpfinal = mvp.join(', ').replace('M', '\n**MVP:** M').replace(/MVP • /g, '');
		const vipfinal = vip.join(', ').replace('V', '\n**VIP:** V').replace(/VIP • /g, '');
		const goatfinal = goat.join(', ').replace('G', '\n**GOAT:** W').replace(/GOAT • /g, '');
		const wardenfinal = warden.join(', ').replace('W', '\n**WARDEN:** W').replace(/WARDEN • /g, '');
		const axolotlfinal = axolotl.join(', ').replace('A', '\n**AXOLOTL:** A').replace(/AXOLOTL • /g, '');
		const hoglinfinal = hoglin.join(', ').replace('H', '\n**HOGLIN:** H').replace(/HOGLIN • /g, '');
		const striderfinal = strider.join(', ').replace('S', '\n**STRIDER:** S').replace(/STRIDER • /g, '');
		const blazefinal = blaze.join(', ').replace('B', '\n**BLAZE:** B').replace(/BLAZE • /g, '');
		const endermanfinal = enderman.join(', ').replace('E', '\n**ENDERMAN:** E').replace(/ENDERMAN • /g, '');
		const skeletonfinal = skeleton.join(', ').replace('S', '\n**SKELETON:** S').replace(/SKELETON • /g, '');
		const playerfinal = player.join(', ').replace('P', '\n**PLAYER:** P').replace(/PLAYER • /g, '');
		const guestfinal = guest.join(', ').replace('G', '\n**GUEST:** G').replace(/GUEST • /g, '');
		let otherfinal = `\n**OTHER:** ${other.join(', ')}`;
		if (!other[0]) otherfinal = '';
		message.channel.send({ embed: {
			color: 1752220,
			title: count,
			description: `${ownerfinal}${adminfinal}${modfinal}${helperfinal}${mvpfinal}${vipfinal}${goatfinal}${wardenfinal}${axolotlfinal}${hoglinfinal}${striderfinal}${blazefinal}${endermanfinal}${skeletonfinal}${playerfinal}${guestfinal}${otherfinal}`.replace(/_/g, '\\_'),
		} }).then(msg => {
			setTimeout(function() {
				msg.delete();
			}, 5000);
		});
	},
};
