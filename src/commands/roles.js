module.exports = {
    name: 'roles', 
    description: 'role commands',
    async execute(msg, client) {
      const guild = client.guilds.cache.array()[1];
  
      const commands = {
        create: async () => {
          if (msg.content.split(' ').length < 4) {
            msg.channel.send('❌ Please provide a valid role color.');
            return;
          }
          
          const roleName = msg.content.split('create ')[1].split(' ')[0].replace(/['"]+/g, '');
          if (guild.roles.cache.find(role => role.name === roleName)) {
            msg.channel.send('❌ Role already created with that name.');
            return;
          }

          const roleColor = msg.content.split('create ')[1].split(' ')[1].toUpperCase();
          
          await guild.roles.create({
            data: {
              name: roleName,
              color: roleColor,
            }
          });
  
          msg.channel.send('✅ Role successfully created!');
        },
        delete: () => {
          const roleName = msg.content.split('delete ')[1].replace(/['"]+/g, '');
          const role = guild.roles.cache.find(role => role.name === roleName);
          if (!role) {
            msg.channel.send('❌ Not a valid role.');
            return;
          }
  
          if (role.name === 'ADMIN') {
            msg.channel.send('❌ You cannot delete this role.');
            return;
          }
  
          role.delete();
          msg.channel.send('✅ Role successfully deleted!');
        },
        add: () => {
          const roleName = msg.content.split('add ')[1].split(' ')[1];
          const role = guild.roles.cache.find(role => role.name === roleName);
          if (!role) {
            msg.channel.send('❌ Not a valid role.');
            return;
          }
  
          const member = msg.mentions.members.first();
          if (!member) {
            msg.channel.send('❌ Please mention a user.');
            return;
          }
  
          member.roles.add(role);
          msg.channel.send('✅ Role successfully added!');
        },
        remove: () => {
          const roleName = msg.content.split('remove ')[1].split(' ')[1];
          const role = guild.roles.cache.find(role => role.name === roleName);
          if (!role) {
            msg.channel.send('❌ Not a valid role.');
            return;
          }
  
          if (role.name === 'ADMIN') {
            msg.channel.send('❌ You cannot remove this role.');
            return;
          }
  
          const member = msg.mentions.members.first();
          if (!member) {
            msg.channel.send('❌ Please mention a user.');
            return;
          }
  
          member.roles.remove(role);
          msg.channel.send('✅ Role successfully removed!');
        },
        recolor: async () => {
          const args = msg.content.split(' ');
          const roleName = args.slice(2, args.length - 1).join(' ').replace(/^"(.*)"$/, '$1');
          const color = args[args.length - 1].toUpperCase();
          const role = guild.roles.cache.find(role => role.name === roleName);
          if (!role) {
            msg.channel.send('❌ Not a valid role.');
            return;
          }
        
          await role.edit({
            color: color,
          });
        
          msg.channel.send('✅ Role successfully recolored!');
        },
        list: () => {
          const roles = guild.roles.cache
            .sort((a, b) => a.name.localeCompare(b.name))
            .filter(role => !role.name.startsWith('USER-') && role.name !== '@everyone');
            
          const rolesList = roles.map(role => `🔘 ${role.name} - ${role.members.size}`).join('\n');
          msg.channel.send(rolesList);
        },
      };
  
      const command = msg.content.split(' ')[1];
      if (Object.keys(commands).includes(command)) 
        commands[command]();
      else 
        msg.channel.send('❌ Pleasesend a valid command.');
    }
}