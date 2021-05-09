function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
const mineflayer = require('mineflayer');
const { mineflayer: mineflayerViewer } = require('prismarine-viewer');
const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder');
const collectBlock = require('mineflayer-collectblock').plugin;
module.exports = {
	name: 'mc',
	description: 'Join a minecraft server with Pup',
	args: true,
	usage: '<join/leave/chat/goto/move/mount/break/server>',
	async execute(message, args, client, Client, Discord) {
		if (!client.guilds.cache.get('811354612547190794').members.cache.get(message.member.id)) return message.reply('You need to be in the Pup Bot Discord server for this to work! Do -invite to join!');
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
				auth: 'microsoft',
			});
			await message.reply('Joined Minecraft Server!\nCheck out https://pupmap.hoglin.org to see what the client is seeing');
			client.mc.once('spawn', () => {
				mineflayerViewer(client.mc, { port: 40033, firstPerson: false });
				client.mc.loadPlugin(pathfinder);
				client.mc.loadPlugin(collectBlock);
				client.mc.chatAddPattern(
					/(.+)/,
					'everything',
				);
				client.mc.chat('Connected with Pup on Discord. Check out http://elktail.birdflop.com:40033 to see what I\'m seeing!');
			});
			client.mc.on('everything', (chatmsg) => {
				message.channel.send(chatmsg);
				if (chatmsg.includes('sab')) return;
				if (['lov', 'simp', ' ily ', ' ily', ' babe ', 'babe ', ' babe', 'kiss', 'daddy', 'mommy', 'cute'].some(word => chatmsg.toLowerCase().includes(word))) {
					client.mc.chat('simp');
				}
			});
		}
		else if (args[0] == 'chat') {
			if (!client.mc) return message.reply('Join a server first!');
			if (!args[1]) return message.reply('-mc chat <Message>');
			await client.mc.chat(args.join(' ').replace(args[0] + ' ', ''));
			await message.reply('Sent chat!');
		}
		else if (args[0] == 'leave') {
			if (!client.mc) return message.reply('Join a server first!');
			client.mc.quit();
			await message.reply('Left Minecraft Server!');
		}
		else if (args[0] == 'coord') {
			if (!client.mc) return message.reply('Join a server first!');
			if (!args[3]) return message.reply('-mc coord <x> <y> <z>');
			const mcData = require('minecraft-data')(client.mc.version);
			const defaultMove = new Movements(client.mc, mcData);
			client.mc.pathfinder.setMovements(defaultMove);
			client.mc.pathfinder.setGoal(new GoalNear(args[1], args[2], args[3], 1));
			await message.reply(`Going to ${args[1]} ${args[2]} ${args[3]}...`);
		}
		else if (args[0] == 'move') {
			if (!client.mc) return message.reply('Join a server first!');
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
			if (!client.mc) return message.reply('Join a server first!');
			if (!args[1]) return message.reply('-mc goto <Player>');
			if (!client.mc.players[args[1]]) {
				client.mc.chat(`/tpa ${args[1]}`);
				return message.reply(`Sent TPA request to ${args[1]}`);
			}
			const target = client.mc.players[args[1]].entity;
			const { x: playerX, y: playerY, z: playerZ } = target.position;
			const mcData = require('minecraft-data')(client.mc.version);
			const defaultMove = new Movements(client.mc, mcData);
			client.mc.pathfinder.setMovements(defaultMove);
			client.mc.pathfinder.setGoal(new GoalNear(playerX, playerY, playerZ, 1));
			await message.reply(`Going to ${playerX} ${playerY} ${playerZ}...`);
		}
		else if (args[0] == 'mount') {
			if (!client.mc) return message.reply('Join a server first!');
			const entity = client.mc.nearestEntity((e) => { return e.type === 'object'; });
			if (entity) {
				client.mc.mount(entity);
			}
			else {
				message.reply('No nearby vehicles');
			}
		}
		else if (args[0] == 'break') {
			if (!client.mc) return message.reply('Join a server first!');
			if (!args[2]) return message.reply('-mc break <Amount> <Block>');
			const mcData = require('minecraft-data')(client.mc.version);
			const count = parseInt(args[1]);
			const type = args[2];
			const blockType = mcData.blocksByName[type];
			if (!blockType) {
				return message.reply(`Can't find any ${type}`);
			}
			const blocks = client.mc.findBlocks({
				matching: blockType.id,
				maxDistance: 64,
				count: count,
			});
			if (blocks.length === 0) {
				return message.reply(`Can't find any ${type}`);
			}
			const targets = [];
			for (let i = 0; i < Math.min(blocks.length, count); i++) {
				targets.push(client.mc.blockAt(blocks[i]));
			}
			client.mc.chat(`Found ${targets.length} ${type}(s)`);
			client.mc.collectBlock.collect(targets, err => {
				if (err) {
					client.mc.chat(err.message);
					console.log(err);
				}
				else {
					client.mc.chat(`I just broke ${count} ${type}!`);
				}
			});
		}
		else if (args[0] == 'server') {
			if (!args[1]) return message.reply('-mc server <start>');
		}
	},
};