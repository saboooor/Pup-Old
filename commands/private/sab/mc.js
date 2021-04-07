function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
const mineflayer = require('mineflayer');
const { mineflayer: mineflayerViewer } = require('prismarine-viewer');
const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder');
module.exports = {
	name: 'mc',
	description: 'Join a minecraft server with Pup',
	args: true,
	usage: '<join/leave/chat> [<Server IP>]',
	async execute(message, args, client, Client, Discord) {
		if (message.author.id !== '249638347306303499') return message.reply('You can\'t do that!');
		if (args[0] == 'join') {
			if (client.mc) {
				client.mc.quit();
				if (client.mc.viewer) client.mc.viewer.close();
			}
			client.mc = mineflayer.createBot({
				host: args[1],
				port: 25565,
				username: client.config.clientemail,
				password: client.config.clientpassword,
			});
			await message.reply('Joined Minecraft Server!\nCheck out https://pupmap.hoglin.org to see what the client is seeing');
			client.mc.once('spawn', () => {
				client.mc.chat('Connected with Pup on Discord. Check out https://pupmap.hoglin.org to see what I\'m seeing!');
				mineflayerViewer(client.mc, { port: 40033, firstPerson: false });
				client.mc.chatAddPattern(
					/(.+)/,
					'everything',
				);
			});
			client.mc.on('everything', (chatmsg) => {
				message.channel.send(chatmsg);
			});
		}
		else if (args[0] == 'chat') {
			await message.reply('Sent chat!');
			await client.mc.chat(args.join(' ').replace(args[0] + ' ', ''));
		}
		else if (args[0] == 'leave') {
			if (client.mc) client.mc.quit();
			await message.reply('Left Minecraft Server!');
		}
		else if (args[0] == 'goto') {
			client.mc.loadPlugin(pathfinder);
			const mcData = require('minecraft-data')(client.mc.version);
			const defaultMove = new Movements(client.mc, mcData);
			client.mc.pathfinder.setMovements(defaultMove);
			client.mc.pathfinder.setGoal(new GoalNear(args[1], args[2], args[3], 1));
		}
	},
};