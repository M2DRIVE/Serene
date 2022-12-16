module.exports = {
    name: 'help', 
    description: 'sends useful information',
    execute(message) {
        const embed = new Discord.MessageEmbed()
            .setTitle('List of Serene Commands')
            .setImage('')
            .setColor(0xb32038);
        msg.channel.send(embed);
    }
}