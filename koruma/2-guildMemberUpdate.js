const Discord = require('discord.js')
const db = require('quick.db');

module.exports = async (oldMember, newMember) => { 
  let kanal = await db.fetch(`membermodChannel_${oldMember.guild.id}`)
  let kanal2 = oldMember.guild.channels.find('id', kanal)
  if (!kanal) return;
  if (!kanal2) return;
  
  let keskisim = oldMember.nickname
  let eskisim;
  if (keskisim == null) eskisim = oldMember.user.username
  else eskisim = oldMember.nickname
  
  let kyenisim = newMember.nickname
  let yenisim;
  if (kyenisim == null) yenisim = newMember.user.username
  else yenisim = newMember.nickname
  
  if (eskisim == yenisim) return;
  
  let embed = new Discord.RichEmbed()
  .setColor(0xffa300)
  .setAuthor(`${eskisim} adlı kullanıcı ismini güncelledi.`, oldMember.user.avatarURL)
  .addField(`Eski İsim (Görünen)`, eskisim)
  .addField(`Yeni İsim (Görünen)`, yenisim)
  kanal2.send(embed)
};