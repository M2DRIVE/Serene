const Discord = require('discord.js');  
const client = new Discord.Client();
const { token } = require('../config.json');
//const host = require('../server/server.js');

const PREFIX = '-';

const fs = require('fs');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/commands/', { recursive: true }).filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/oneam/oneam.js`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {
    client.commands.get('oneam').execute(msg, client, fs, false);

    if(!msg.content.startsWith(PREFIX)) return;
    let command = msg.content.substring(PREFIX.length).toLowerCase().split(' ');
    if(command[0] === 'ping') client.commands.get('ping').execute(msg);
    else if(command[0] === 'roles' || command[0] === 'role') client.commands.get('roles').execute(msg, client, Discord);
    else if(command[0] === 'help') client.commands.get('help').execute(msg, Discord);
    else if(command.slice(0, 3).join(' ') === 'night goblin mode') client.commands.get('oneam').execute(msg, client, fs, true);
});

//host();
client.login(token);