const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${process.env.basarisiz} Sunucuda birini susturmak için **\`Mesajları Yönet\`** yetkisine sahip olman gerek.`);
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.channel.send(`:no_entry: Birini susturmak için bir kullanıcı etiketlemeniz gerekli.`);
  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:no_entry: \`Mesajları Yönet\` yetkisine sahip olan üyeleri susturamam.`);
let muterole = message.guild.roles.find(r => r.name === "⛔ Loxy's Inc. Susturuldu");

  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "⛔ Loxy's Inc. Susturuldu",
        color: "#818386",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  let mutetime = args[1];
  if(!mutetime) return message.channel.send(`:no_entry: Kullanıcıyı susturmak için bir süre belirtiniz. \`-mute @Loxy's Inc. 5m\``);
  await(tomute.addRole(muterole.id));
  message.channel.send(`${process.env.basarili} **<@${tomute.id}>** adlı kullanıcı ${ms(ms(mutetime))} süreyle susturuldu.`);
  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`${process.env.basarili} **<@${tomute.id}>** adlı kullanıcının mute süresi dolduğu için kaldırıldı.`);
  }, ms(mutetime));
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['geçici-sustur', 'gsustur', 'sustur', 'mute'],
  permLevel: 0
};

exports.help = {
  name: 'geçici-sustur',
  description: 'Sureli Susturur.',
  usage: 'geçici-sustur [Kullanıcı] [Süre]'
};