function clean(text) {
	if (typeof (text) === 'string') {return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));}
	else {return text;}
}

module.exports = {
	name: 'eval',
	aliases: ['ec'],
	guildOnly: false,
	args: true,
	argamnt: 1,
	usage: '<Code>',
	async execute(message, args, client, sleep, config, Client, Discord) {
		if (!config.ownerID.includes(message.author.id)) return message.reply('You do not have the proper permissions to execute this command.');
		try {
			const code = args.join(' ');
			let evaled = eval(code);

			if (typeof evaled !== 'string') {evaled = require('util').inspect(evaled);}

			message.channel.send(clean(evaled), { code: 'xl' });
		}
		catch (err) {
			message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
		}
	},
};