let enabled = true;
module.exports = {
    name: 'oneam',
    description: '',
    execute(msg, client, fs, isCommand) {
        const time = new Date().getHours();
        if (time > 1 && time < 5 && msg.author != client.user && !isCommand) {
            const path = require('path');
            const linesFilePath = path.join(__dirname, 'lines.json');
            const data = fs.readFileSync(linesFilePath);
            const lines = JSON.parse(data);
            const randomIndex = Math.floor(Math.random() * lines.length);
            const randomLine = lines[randomIndex];

            msg.channel.send(randomLine);
        }

        else if (isCommand) {
            if (msg.content.split(' ')[3] === 'on') {
                enabled
                    ? msg.channel.send('Night Goblin Mode is already enabled')
                    : (enabled = true, msg.channel.send('✅ Night Goblin Mode Enabled'));
            }

            else if (msg.content.split(' ')[3] === 'off') {
                !enabled
                    ? msg.channel.send('Night Goblin Mode is already disabled')
                    : (enabled = false, msg.channel.send('✅ Night Goblin Mode Disabled'));
            }

            else {
                msg.channel.send('❌ Please send a valid command.');
            }
        }

        setInterval(() => time === 0 ? enabled = true : null, 300000);
    }
}