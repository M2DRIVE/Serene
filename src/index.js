//First Commit
const Discord = require('discord.js');  
const client = new Discord.Client();
const { token } = require('../config.json');

const PREFIX = '$';

const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {
    if(!msg.content.startsWith(PREFIX)) return;
    let command = msg.content.substring(PREFIX.length).toLowerCase().split(' ');
    if(command[0] === 'test') client.commands.get('ping').execute(msg);
    else if(command[0] === 'roles') client.commands.get('roles').execute(msg, client);
});

client.login(token);