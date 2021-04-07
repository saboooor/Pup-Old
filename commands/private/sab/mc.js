function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}
const mc = require('minecraft-protocol');
module.exports = {
	name: 'mc',
	description: 'Join a minecraft server with Pup',
	args: true,
	argamt: 2,
	usage: '<join/leave> <Server IP>',
	async execute(message, args, client, Client, Discord) {
		if (args[0] == 'join') {
			const mcclient = await mc.createClient({
				host: args[1],
				port: 25565,
				username: client.config.clientemail,
				password: client.config.clientpassword,
				auth: 'mojang',
			});
			await message.reply('Joined Minecraft Server!');
			await sleep(5000);
			await mcclient.write('chat', { message: 'Connected with Pup on Discord' });
		}
	},
};
