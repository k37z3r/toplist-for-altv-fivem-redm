import * as alt from 'alt';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
let TopListUpdate;
const neededValues = [
    'minage',
	'whitelist',
    'language',
    'framework',
    'voice',
	'chat',
    'secretToken'
];
neededValues.forEach((value) => {
    if (!(value in process.env)) {
        alt.log(`the needed key '${value}' is missing in .env file`);
        process.exit(0);
    }
});
function Updater(){
    axios({
        method: 'post',
        url: 'https://gta-spot.com/announce.php',
        data: {
            minage: process.env.minage,
            whitelist: process.env.whitelist,
            language: process.env.language,
            framework: process.env.framework,
            voice: process.env.voice,
            chat: process.env.chat,
            servername: alt.getServerConfig().name,
            ip: alt.ServerIp(),
            port: alt.ServerPort(),
            gamemode: alt.getServerConfig().gamemode,
            platform: 'altv',
            onlineplayers: alt.Player.all.length,
            maxplayers: alt.getServerConfig().players,
            secretToken: alt.getServerConfig().secretToken,
            secretToken2: process.env.secretToken
        }
    });
}
TopListUpdate = alt.setInterval(Updater, 1800000);