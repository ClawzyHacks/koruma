const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args) => {
  var bot = "512292345140609024"
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(':no_entry: Bu komudu kullanabilmek için `Yönetici` yetkisine sahip olman gerek!')
  let rol = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(rol => rol.name === args[0]);
  if (!rol) return message.channel.send('Herkese rol verebilmem için bir rol etiketlemelisin.')
  
  
   const embed = new Discord.RichEmbed()
    .setDescription(`Herkese ${rol} adlı rol verildi!`)
    .setColor(rol.hexColor)
   const ver = new Discord.RichEmbed()
   .setDescription('Bir kullanıcıya ``' + rol.name + '`` adlı rol verildi!')
   .setColor(rol.hexColor) 
   message.guild.members.forEach(u => {
   u.addRole(rol)
})
  message.channel.send(`${process.env.basarili} Bütün kullanıcılara \`${rol.name}\` adlı rol verildi.`)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['toplu-rol-ver'],
    permLevel: 0
}

exports.help = {
    name: 'herkese-rol-ver',
    description: 'Log kanalını belirler.',
    usage: 'gkanal <#kanal>'
}