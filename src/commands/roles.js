module.exports = {
    name: 'roles', 
    description: 'role commands',
    async execute(msg, client) {
        
        const roles = client.guilds.cache.map(guild => {
            return guild.roles.cache.map(role=>role.name).flat();
        });

        try {
            const command = msg.content.split(' ');

            // -roles create name color
            if(command[1] === 'create') {
                if(roles[1].includes(command[2])) {
                    msg.channel.send('❌ Role already created with that name.');
                    return;
                }

                await msg.guild.roles.create({
                    data: {
                        name: command[2],
                        color: command[3]
                    }
                })

                msg.channel.send('✅ Role successfully added!');
            }
            
            // -roles add @user name
            else if(command[1] === 'add') {
                if(!roles[1].includes(command[3])) {
                    msg.channel.send('❌ Not a valid role.');
                    return;
                }
                msg.mentions.members.first().roles.add(msg.guild.roles.cache.find(role => role.name === command[3]));
                msg.channel.send('✅ Role successfully added!');
            }
            
            // -roles remove @user name
            else if(command[1] === 'remove') {
                if(!roles[1].includes(command[3])) {
                    msg.channel.send('❌ Not a valid role.');
                }

                else if(command[3] === 'ADMIN') {
                    msg.channel.send('❌ You cannot remove this role.');
                    return;
                }

                msg.mentions.members.first().roles.remove(msg.guild.roles.cache.find(role => role.name === command[3]));
                msg.channel.send('✅ Role successfully removed!');
            }

            // -roles delete name
            else if(command[1] === 'delete') {
                if(!roles[1].includes(command[2])) {
                    msg.channel.send('❌ Not a valid role.');
                    return;
                }

                else if(command[2] === 'ADMIN') {
                    msg.channel.send('❌ You cannot delete this role.');
                    return;
                }

                msg.guild.roles.cache.find(role => role.name === command[2]).delete();
                msg.channel.send('✅ Role successfully deleted.');
            }

            else {
                msg.channel.send('❌ Please send a valid command.');
            }

        } catch (err) { msg.channel.send('❌ Please send a valid command.'); console.log(err)}
    }
}

//msg.member.roles.add(msg.guild.roles.cache.find(role => role.name === ''));