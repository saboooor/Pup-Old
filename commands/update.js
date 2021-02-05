module.exports = {
	name: 'update',
	cooldown: 10,
	guildOnly: true,
    async execute(message, args, client, sleep, config, Client, Discord) {
        const http = require('http'); // or 'https' for https:// URLs
        const fs = require('fs');
        const file = fs.createWriteStream("purpurclip.jar");
        const request = http.get("https://ci.pl3x.net/job/Purpur/lastSuccessfulBuild/artifact/final/purpurclip.jar", function(response) {
            response.pipe(file);
        });
    }
}