const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('<:hayirr:513258163516997662> | Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!')
  let rol = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(rol => rol.name === args[0]);
  if (!rol) return message.channel.send('Herkesten rol alabilmem için bir rol etiketle!')

  
   const embed = new Discord.RichEmbed()
     .setDescription(`Herkesten ${rol} adlı rol alındı!`)
        .setColor(rol.hexColor)
   
   const ver = new Discord.RichEmbed()
   .setDescription('Bir kullanıcıdan ``' + rol.name + '`` adlı rol alındı!')
   .setColor(rol.hexColor)
   
   message.guild.members.forEach(u => {
u.removeRole(rol)
   })
  message.channel.send(`${process.env.basarili} Bütün kullanıcılardan \`${rol.name}\` adlı rol alındı.`)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['toplu-rol-al'],
    permLevel: 0
}

exports.help = {
    name: 'herkesten-rol-al',
    description: 'Log kanalını belirler.',
    usage: 'gkanal <#kanal>'
}