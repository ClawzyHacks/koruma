const Discord = require('discord.js');

exports.run = async (client, msg, args) => {
   let pre = args.slice(0).join(' ');
      if (!pre[0]) {
       msg.channel.send(`<:LOXYsX:526447632726360074> \`KATIL & AYRIL\` olarak bir değer belirtiniz.`) 
  }
   
       if (pre === 'ayrıl') {
         if (msg.author.id !== "442321157320867841" && msg.author.id !== "245225049882099713") return msg.channel.send('Yetkin yok!')
          client.emit('guildMemberRemove', msg.member || await msg.guild.fetchMember(msg.author));
         msg.channel.send('Başarılı!')
         
        
       }
  if (pre === 'katıl') {
    if (msg.author.id !== "442321157320867841" && msg.author.id !== "245225049882099713") return msg.channel.send('Yetkin yok!')
     client.emit('guildMemberAdd', msg.member || await msg.guild.fetchMember(msg.author));
    msg.channel.send('Başarılı!')
        
       }
   }   


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sahte',
  description: '',
  usage: ''
};