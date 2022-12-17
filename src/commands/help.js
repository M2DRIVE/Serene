module.exports = {
    name: 'help', 
    description: 'sends useful information',
    execute(msg, Discord) {
        const embed = new Discord.MessageEmbed()
            .setTitle('List of Serene Commands')
            .setAuthor('Serene Bot Help', 'https://cdn.discordapp.com/attachments/914713598419431484/1053505759624843264/image_9.png')
            .setThumbnail('https://cdn.discordapp.com/attachments/914713598419431484/1053505759624843264/image_9.png')
            .setColor(0xf7f7f7)
            .addFields(
                { name: 'Role Commands', value: '\`-roles create ROLENAME COLORNAME or HEXCODE\`' },
		        { name : '\u200b', value: '\`-roles delete ROLENAME\`' },
		        { name : '\u200b', value: '\`-roles add @USER ROLENAME\`' },
		        { name : '\u200b', value: '\`-roles remove @USER ROLENAME\`' }
            )

        msg.channel.send(embed);
    }
}