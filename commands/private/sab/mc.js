const mc = require('minecraft-protocol');
module.exports = {
	name: 'mc',
	description: 'Join a minecraft server with Pup',
	args: true,
	argamt: 2,
	usage: '<join/leave> <Server IP>',
	async execute(message, args, client, Client, Discord) {
		if (args[0] == 'join') {
			const mcclient = mc.createClient({
				host: args[1],
				port: 25565,
				username: client.config.clientemail,
				password: client.config.clientpassword,
				auth: 'mojang',
			});
			message.reply('Joined Minecraft Server!');
		}
		const msg = {
			translate: 'chat.type.announcement',
			'with': [
				'Server',
				'Hello, world!',
			],
		};
		client.write('chat', { message: JSON.stringify(msg), position: 0, sender: '0' });
	},
};
