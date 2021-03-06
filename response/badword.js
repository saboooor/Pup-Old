module.exports = {
	name: 'badword',
	description: '',
	async execute(message) {
		try {
			await message.delete();
			await message.author.send(`**You've been banned from ${message.guild.name} for containing a slur in your message.**`);
			await message.guild.members.ban(message.author.id);
		}
		catch(error) {
			console.log(error);
		}
	},
};