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
	name: 'tacolist',
	description: '',
	execute(message) {
		if (message.author.id == '765287593762881616') return;
		message.delete();
		const count = message.content.split(/\n+/)[0];
		const players = message.content.replace(`${count}\n\`\`\`\n`, '').replace('\n```', '').split(/, /);
		const owner = players.filter(word => word.startsWith('[Owner]')).sort();
		const headadmin = players.filter(word => word.startsWith('[Head Admin]')).sort();
		const admin = players.filter(word => word.startsWith('[Admin]')).sort();
		const mod = players.filter(word => word.startsWith('[Mod]')).sort();
		const helper = players.filter(word => word.startsWith('[Helper]')).sort();
		const trainee = players.filter(word => word.startsWith('[Trainee]')).sort();
		const vip = players.filter(word => word.startsWith('[VIP]')).sort();
		const dev = players.filter(word => word.startsWith('[Dev]')).sort();
		const retired = players.filter(word => word.startsWith('[Retired]')).sort();
		const tacosbuilder = players.filter(word => word.startsWith('[Taco\'s Builder]')).sort();
		const taco = players.filter(word => word.startsWith('[Taco]')).sort();
		const cheese = players.filter(word => word.startsWith('[Cheese]')).sort();
		const guacamole = players.filter(word => word.startsWith('[Guacamole]')).sort();
		const beans = players.filter(word => word.startsWith('[Beans]')).sort();
		const onion = players.filter(word => word.startsWith('[Onion]')).sort();
		const tomato = players.filter(word => word.startsWith('[Tomato]')).sort();
		const lettuce = players.filter(word => word.startsWith('[Lettuce]')).sort();
		const beef = players.filter(word => word.startsWith('[Beef]')).sort();
		const other = players
			.filter(word => !word.startsWith('[Owner]'))
			.filter(word => !word.startsWith('[Head Admin]'))
			.filter(word => !word.startsWith('[Admin]'))
			.filter(word => !word.startsWith('[Mod]'))
			.filter(word => !word.startsWith('[Helper]'))
			.filter(word => !word.startsWith('[Trainee]'))
			.filter(word => !word.startsWith('[VIP]'))
			.filter(word => !word.startsWith('[Dev]'))
			.filter(word => !word.startsWith('[Retired]'))
			.filter(word => !word.startsWith('[Taco\'s Builder]'))
			.filter(word => !word.startsWith('[Taco]'))
			.filter(word => !word.startsWith('[Cheese]'))
			.filter(word => !word.startsWith('[Guacamole]'))
			.filter(word => !word.startsWith('[Beans]'))
			.filter(word => !word.startsWith('[Onion]'))
			.filter(word => !word.startsWith('[Tomato]'))
			.filter(word => !word.startsWith('[Lettuce]'))
			.filter(word => !word.startsWith('[Beef]'))
			.sort();
		const ownerfinal = owner.join(', ').replace('[', '\n**Owner:** [').replace(/\[Owner\] /g, '');
		const headadminfinal = headadmin.join(', ').replace('[', '\n**Head Admin:** [').replace(/\[Head Admin\] /g, '');
		const adminfinal = admin.join(', ').replace('[', '\n**Admin:** [').replace(/\[Admin\] /g, '');
		const modfinal = mod.join(', ').replace('[', '\n**Mod:** [').replace(/\[Mod\] /g, '');
		const helperfinal = helper.join(', ').replace('[', '\n**Helper:** [').replace(/\[Helper\] /g, '');
		const traineefinal = trainee.join(', ').replace('[', '\n**Trainee:** [').replace(/\[Trainee\] /g, '');
		const vipfinal = vip.join(', ').replace('[', '\n**VIP:** [').replace(/\[VIP\] /g, '');
		const devfinal = dev.join(', ').replace('[', '\n**Dev:** [').replace(/\[Dev\] /g, '');
		const retiredfinal = retired.join(', ').replace('[', '\n**Retired:** [').replace(/\[Retired\] /g, '');
		const tacosbuilderfinal = tacosbuilder.join(', ').replace('[', '\n**Taco\'s Builder:** [').replace(/\[Taco's Builder\] /g, '');
		const tacofinal = taco.join(', ').replace('[', '\n**Taco:** [').replace(/\[Taco\] /g, '');
		const cheesefinal = cheese.join(', ').replace('[', '\n**Cheese:** [').replace(/\[Cheese\] /g, '');
		const guacamolefinal = guacamole.join(', ').replace('[', '\n**Guacamole:** [').replace(/\[Guacamole\] /g, '');
		const beansfinal = beans.join(', ').replace('[', '\n**Beans:** [').replace(/\[Beans\] /g, '');
		const onionfinal = onion.join(', ').replace('[', '\n**Onion:** [').replace(/\[Onion\] /g, '');
		const tomatofinal = tomato.join(', ').replace('[', '\n**Tomato:** [').replace(/\[Tomato\] /g, '');
		const lettucefinal = lettuce.join(', ').replace('[', '\n**Lettuce:** [').replace(/\[Lettuce\] /g, '');
		const beeffinal = beef.join(', ').replace('[', '\n**Beef:** [').replace(/\[Beef\] /g, '');
		let otherfinal = `\n**Other:** ${other.join(', ')}`;
		if (!other[0]) otherfinal = '';
		message.channel.send({ embed: {
			color: 15844367,
			title: count,
			description: `${ownerfinal}${headadminfinal}${adminfinal}${modfinal}${helperfinal}${traineefinal}${vipfinal}${devfinal}${retiredfinal}${tacosbuilderfinal}${tacofinal}${cheesefinal}${guacamolefinal}${beansfinal}${onionfinal}${tomatofinal}${lettucefinal}${beeffinal}${otherfinal}`.replace(/_/g, '\\_'),
		} }).then(msg => {
			setTimeout(function() {
				msg.delete();
			}, 5000);
		});
	},
};