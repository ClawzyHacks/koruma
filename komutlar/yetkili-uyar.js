const Discord = require('discord.js');
const db = require('quick.db');
const moment = require("moment-timezone");

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(":no_entry: Bu komudu kullanabilmek için `Üyeleri At` yetkisine sahip olmanız gerek.");
    let sebep = args.slice(1).join(' ');
    let kullanıcı = message.mentions.users.first() || client.users.get(args[0]) || message.guild.members.find(u => u.user.username.toLowerCase().includes(args[0].toLowerCase())).user
    if (!kullanıcı) return message.channel.send(`:no_entry: Uuğh, lanet olsun dostum kimi uyaracağımı bilmiyorum, istediğin kullancıyı belirtmelisin. \`/uyar @Loxy#7084 Y**k kürek\``).catch(console.error);
    let member = message.guild.member(kullanıcı)
    if (member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`***Yetkisi kendimden yüksek kişileri uyaramam.***`)
    if (member.bot) return message.channel.send(`***Bir botu uyarmazsınız.***`)
    if (!sebep) sebep = 'Neden belirtilmemiş.'
  
    message.channel.send(`***${kullanıcı.tag} adlı kullanıcıyı*** \`${sebep}\` ***sebebiyle uyardım.***`) 
      const embed = new Discord.RichEmbed()
        .setColor(0xffa300)
        .setAuthor(`${kullanıcı.username} adlı kişi uyarıldı.`, kullanıcı.avatarURL || kullanıcı.defaultAvatarURL)
        .addField('Uyarılan Kullanıcı', `${kullanıcı.tag}-[${kullanıcı.id}]`, true)
        .addField('Uyaran Yetkili', `${message.author.tag}-[${message.author.id}]`, true)
        .addField('Uyarılma Nedeni', sebep, true);
      let membermodChannel = await db.fetch(`membermodChannel_${message.guild.id}`)
      if (!message.guild.channels.get(membermodChannel)) return
      else message.guild.channels.get(membermodChannel).send(embed)
  
    db.add(`projectLAC_${member.id}_uyarSayi`, '+1')
    db.push(`projectLAC_${member.id}_uyarNeden`, ` ${sebep}\n`)
  
  
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'uyar',
  description: 'neblm',
  usage: 'uyar'
};  