function minTwoDigits(n) {
	return (n < 10 ? '0' : '') + n;
}
const mc = require('minecraft-protocol');
module.exports = {
	name: 'mc',
	description: 'Join a minecraft server with Pup',
	args: true,
	usage: '<Server IP>',
	async execute(message, args, client, Client, Discord) {
		const mcclient = mc.createClient({
			host: args[0],
			port: 25565,
			username: client.config.clientemail,
			password: client.config.clientpassword,
			auth: 'mojang',
		});
	},
};
