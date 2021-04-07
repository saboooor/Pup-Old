function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
const mineflayer = require('mineflayer');
const { mineflayer: mineflayerViewer } = require('prismarine-viewer');
module.exports = {
	name: 'mc',
	description: 'Join a minecraft server with Pup',
	args: true,
	argamt: 2,
	usage: '<join/chat> <Server IP>',
	async execute(message, args, client, Client, Discord) {
		if (message.author.id !== '249638347306303499') return message.reply('You can\'t do that!');
		if (args[0] == 'join') {
			if (client.mc) client.mc.quit();
			if (client.mc) client.mc.viewer.close();
			client.mc = mineflayer.createBot({
				host: args[1],
				port: 25565,
				username: client.config.clientemail,
				password: client.config.clientpassword,
			});
			await message.reply('Joined Minecraft Server! Check out https://pupmap.hoglin.org to see what the client is seeing');
			client.mc.on('spawn', () => {
				client.mc.chat('Connected with Pup on Discord. Check out https://pupmap.hoglin.org to see what I\'m seeing!');
				mineflayerViewer(client.mc, { port: 40033, firstPerson: false });
			});
		}
		else if (args[0] == 'chat') {
			await message.reply('Sent chat!');
			await client.mc.chat(args[1]);
		}
	},
};