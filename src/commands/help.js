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
                { name : 'Role Commands', value: '══════════════════'},
                { name : '\`-roles create ROLENAME COLORNAME or HEXCODE\`', value: 'Create a new role with the specified name and color' },
		        { name : '\`-roles delete ROLENAME\`',                      value: 'Delete a role with the specified name' },
		        { name : '\`-roles add @USER ROLENAME\`',                   value: 'Add the specified role to the specified user' },
		        { name : '\`-roles remove @USER ROLENAME\`',                value: 'Remove the specified role from the specified user' }
            )

        msg.channel.send(embed);
    }
}
/*
.addFields(
    { name: 'Role Commands', value: '\`-roles create ROLENAME COLORNAME or HEXCODE\`' },
    { name : '\u200b', value: '\`-roles delete ROLENAME\`' },
    { name : '\u200b', value: '\`-roles add @USER ROLENAME\`' },
    { name : '\u200b', value: '\`-roles remove @USER ROLENAME\`' }
)

https://emojicombos.com/dividers
*/