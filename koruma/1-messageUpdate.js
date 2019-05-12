const Discord = require('discord.js')
const db = require('quick.db');

module.exports = async (oldMessage, newMessage) => {

  if (oldMessage.author.bot) {
        return false;
    }

    if (!oldMessage.guild) {
        return false;
    }

    if (oldMessage.content == newMessage.content) {
        return false;
    }

    if (!oldMessage || !oldMessage.id || !oldMessage.content || !oldMessage.guild) return;  
  const embed = new Discord.RichEmbed()
      .setColor('ORANGE')
      .setAuthor(`${oldMessage.author.username} mesajını düzenledi:`, oldMessage.author.avatarURL) 
      .addField("Eski mesaj:", '```' + oldMessage.content + '```')
      .addField("Yeni mesaj:", '```' + newMessage.content + '```')
      .setFooter(`Kanal: #${newMessage.channel.name} | Kullanıcı: ${oldMessage.author.tag}`, 'https://cdn.discordapp.com/avatars/501445677092569124/220f1ae8c1d681c52f00d04b1382a6d3.png?size=2048')
  let kanal = await db.fetch(`membermodChannel_${oldMessage.guild.id}`)
  let kanal2 = oldMessage.guild.channels.find('id', kanal)  
  kanal2.send(embed);
}