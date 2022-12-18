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
                var roleName = command.slice(2, command.length-1).join(' ').replace(/['"]+/g, '');
                if(roles[0].includes(roleName)) {
                    msg.channel.send('❌ Role already created with that name.');
                    return;
                }

                await msg.guild.roles.create({
                    data: {
                        name: roleName,
                        color: command[command.length-1].toUpperCase()
                    }
                });

                msg.channel.send('✅ Role successfully created!');
            }
            
            // -roles delete name
            else if(command[1] === 'delete') {
                var roleName = command.slice(2).join(' ').replace(/['"]+/g, '');
                if(!roles[0].includes(roleName)) {
                    msg.channel.send('❌ Not a valid role.');
                    return;
                }

                else if(roleName === 'ADMIN') {
                    msg.channel.send('❌ You cannot delete this role.');
                    return;
                }

                msg.guild.roles.cache.find(role => role.name === roleName).delete();
                msg.channel.send('✅ Role successfully deleted!');
            }

            // -roles add @user name
            else if(command[1] === 'add') {
                var roleName = command.slice(3).join(' ').replace(/['"]+/g, '')
                if(!roles[0].includes(roleName)) {
                    msg.channel.send('❌ Not a valid role.');
                    return;
                }
                msg.mentions.members.first().roles.add(msg.guild.roles.cache.find(role => role.name === roleName));
                msg.channel.send('✅ Role successfully added!');
            }
            
            // -roles remove @user name
            else if(command[1] === 'remove') {
                var roleName = command.slice(3).join(' ').replace(/['"]+/g, '')
                if(!roles[0].includes(roleName)) {
                    msg.channel.send('❌ Not a valid role.');
                }

                else if(roleName=== 'ADMIN') {
                    msg.channel.send('❌ You cannot remove this role.');
                    return;
                }

                msg.mentions.members.first().roles.remove(msg.guild.roles.cache.find(role => role.name === roleName));
                msg.channel.send('✅ Role successfully removed!');
            }

            else {
                msg.channel.send('❌ Please send a valid command.');
            }

        } catch (err) { msg.channel.send('❌ Please send a valid command.'); console.log(err)}
    }
}