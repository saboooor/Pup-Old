module.exports = {
	name: 'approve',
	aliases: ['accept'],
	guildOnly: true,
	args: true,
	argamnt: 1,
	permissions: 'ADMINISTRATOR',
	usage: '<Message ID> [Response]',
	async execute(message, args, client, config, Client, Discord) {
		await message.delete();
		const approving = await message.channel.messages.fetch({ around: args[0], limit: 1 });
		const fetchedMsg = approving.first();
		fetchedMsg.reactions.removeAll();
		const Embed = new Discord.MessageEmbed()
			.setColor(3066993)
			.setAuthor(fetchedMsg.embeds[0].author.name, fetchedMsg.embeds[0].author.iconURL)
			.setDescription(fetchedMsg.embeds[0].description)
			.setTitle('Suggestion (Approved)');
		if (args[1] === undefined) {
			Embed.setFooter('No response.');
			fetchedMsg.edit(Embed);
		}
		else {
			Embed.setFooter(`Response:${args.join(' ').replace(args[0], '')}`);
			fetchedMsg.edit(Embed);
		}
	},
};