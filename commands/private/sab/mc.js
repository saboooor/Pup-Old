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
	usage: '<join/leave/chat/goto/move>',
	async execute(message, args, client, Client, Discord) {
		if (message.author.id !== '249638347306303499') return message.reply('You can\'t do that!');
		if (args[0] == 'join') {
			if (!args[1]) return message.reply('-mc join <Server IP>');
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
				client.mc.loadPlugin(pathfinder);
			});
			client.mc.on('everything', (chatmsg) => {
				message.channel.send(chatmsg);
			});
		}
		else if (args[0] == 'chat') {
			if (!args[1]) return message.reply('-mc chat <Message>');
			await client.mc.chat(args.join(' ').replace(args[0] + ' ', ''));
			await message.reply('Sent chat!');
		}
		else if (args[0] == 'leave') {
			if (client.mc) client.mc.quit();
			await message.reply('Left Minecraft Server!');
		}
		else if (args[0] == 'coord') {
			if (!args[3]) return message.reply('-mc coord <x> <y> <z>');
			const mcData = require('minecraft-data')(client.mc.version);
			const defaultMove = new Movements(client.mc, mcData);
			client.mc.pathfinder.setMovements(defaultMove);
			client.mc.pathfinder.setGoal(new GoalNear(args[1], args[2], args[3], 1));
			await message.reply(`Going to ${args[1]} ${args[2]} ${args[3]}...`);
		}
		else if (args[0] == 'move') {
			if (!args[2]) return message.reply('-mc move <x/y/z> <Coordinate>');
			const mcData = require('minecraft-data')(client.mc.version);
			const defaultMove = new Movements(client.mc, mcData);
			client.mc.pathfinder.setMovements(defaultMove);
			const { x: playerX, y: playerY, z: playerZ } = client.mc.entity.position;
			if (args[1] == 'x') {
				client.mc.pathfinder.setGoal(new GoalNear(playerX + parseInt(args[2], 10), playerY, playerZ, 1));
				await message.reply(`Going to ${playerX + parseInt(args[2], 10)} ${playerY} ${playerZ}...`);
			}
			else if (args[1] == 'y') {
				client.mc.pathfinder.setGoal(new GoalNear(playerX, playerY + parseInt(args[2], 10), playerZ, 1));
				await message.reply(`Going to ${playerX} ${playerY + parseInt(args[2], 10)} ${playerZ}...`);
			}
			else if (args[1] == 'z') {
				client.mc.pathfinder.setGoal(new GoalNear(playerX, playerY, playerZ + parseInt(args[2], 10), 1));
				await message.reply(`Going to ${playerX} ${playerY} ${playerZ + parseInt(args[2], 10)}...`);
			}
		}
		else if (args[0] == 'goto') {
			if (!args[1]) return message.reply('-mc goto <Player>');
			const target = client.mc.players[args[1]].entity;
			if (!target) {
				client.mc.chat(`/tpa ${args[1]}`);
				return message.reply(`Sent TPA request to ${args[1]}`);
			}
			const { x: playerX, y: playerY, z: playerZ } = target.position;
			const mcData = require('minecraft-data')(client.mc.version);
			const defaultMove = new Movements(client.mc, mcData);
			client.mc.pathfinder.setMovements(defaultMove);
			client.mc.pathfinder.setGoal(new GoalNear(playerX, playerY, playerZ, 1));
			await message.reply(`Going to ${playerX} ${playerY} ${playerZ}...`);
		}
	},
};