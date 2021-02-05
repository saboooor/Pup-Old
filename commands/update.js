module.exports = {
	name: 'update',
	cooldown: 10,
	guildOnly: true,
	argamnt: 1,
	usage: '<Server ID>',
    async execute(message, args, client, sleep, config, Client, Discord) {
        const https = require('https');
        const fetch = require('node-fetch');
        const fs = require('fs');
        const file = fs.createWriteStream("purpurclip.jar");
        const reply = await message.channel.send('Downloading purpurclip.jar...');
        Client.login('https://panel.birdflop.com', config.panelapikey, (logged_in, err) => {
            if (logged_in == false) return message.reply(`Something went wrong\n${err}`);
        });
        const request = https.get("https://ci.pl3x.net/job/Purpur/lastSuccessfulBuild/artifact/final/purpurclip.jar", async function(response) {
            response.pipe(file);
            const info = await Client.getServerInfo(args[0]).catch((error) => {console.log(error);});
            file.on('finish', function() {
                reply.edit(`Downloaded! Uploading to server... (${info.attributes.name})`);
            });
        });
        fetch(`https://panel.birdflop.com/api/client/servers/${args[0]}/files/upload`, {
            "method": "GET",
            "headers": {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${config.panelapikey}`
            }
        })
        .then(response => console.log(response))
        .catch(err => console.error(err));
    }
}