const Discord = require('discord.js')
const db = require('quick.db');

module.exports = async message => {
  if (message.author.bot) return;
  if (!message.content) return;
  const embed = new Discord.RichEmbed()
    .setAuthor(`${message.author.username} kullanıcısının mesajı silindi.`, message.author.avatarURL)
    .setTitle(`Silinen mesaj:`)
    .setColor('ORANGE')
    .setDescription('```' + message.content + '```')
    .setTimestamp()
    .setFooter(`Kanal: #${message.channel.name} | Kullanıcı: ${message.author.tag}`, 'https://cdn.discordapp.com/avatars/501445677092569124/220f1ae8c1d681c52f00d04b1382a6d3.png?size=2048')
  let kanal = await db.fetch(`membermodChannel_${message.guild.id}`)
  let kanal2 = message.guild.channels.find('id', kanal)  
  kanal2.send(embed);
}