const dotenv = require('dotenv');
const axios = require('axios');
dotenv.config({ path: './.env' });
const neededValues = [
    'minage',
    'whitelist',
    'language',
    'framework',
    'voice',
    'chat',
    'gamemode',
    'secretPID',
    'serverIP',
    'serverPORT',
];
neededValues.forEach((value) => {
    if (!(value in process.env)) {
        console.log(`the needed key '${value}' is missing in .env file`);
    }
});
async function doPostRequest() {
    var postdata = {
        minage: process.env.minage,
        whitelist: process.env.whitelist,
        language: process.env.language,
        framework: process.env.framework,
        voice: process.env.voice,
        chat: process.env.chat,
        servername: GetConvar("sv_projectName", ""),
        ip: process.env.serverIP,
        port: process.env.serverPORT,
        gamemode: process.env.gamemode,
        platform: 'fivem',
        onlineplayers: getPlayers().length,
        maxplayers: GetConvar("sv_maxclients",""),
        secretToken: GetConvar("secretSID",""),
        secretToken2: process.env.secretPID
    };
    var headers = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }
console.log(postdata);
    await axios.post('https://gta-spot.com/announce.php', postdata, headers)
    .then(response => {
        if (response.data == "ok")
            console.log("data transfer success");
        else
            console.log(response.data);
    })
      .catch(error => {
        if (error.response)
            console.log(error.response.status);
        else if (error.request)
            console.log(error.request);
        else
            console.log(error.message);
    });
}
TopListUpdate = setInterval(doPostRequest, 540000);
doPostRequest();