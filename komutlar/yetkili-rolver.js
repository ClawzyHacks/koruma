const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.channel.send(':no_entry: Rol vermek istediğin kullanıcıyı bulamadım.');
  let role = message.mentions.roles.first().name
  if(!role) return message.channel.send(':no_entry: Vermek istediğin rolü bulamadım.');
  let gRole = message.guild.roles.find(`name`, role);

  if(!gRole) return message.channel.send(':no_entry: Vermek istediğin rolü gene bulamadım.');
   
  if(rMember.roles.has(gRole.id)) return message.channel.send(':no_entry: Kullanıcı bu role sahip.');
  await(rMember.addRole(gRole.id));
  {
    message.channel.send(`${process.env.basarili} ${rMember} adlı kullanıcıya \`${role}\` rolünü verdim.`)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['rolekle'],
  permLevel: 3
};

exports.help = {
  name: 'rolver',
  description: 'Kanalı istediğiniz kadar süreyle kitler.',
  usage: 'rolver <süre>'
};
