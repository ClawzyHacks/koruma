const Discord = require('discord.js')
const db = require('quick.db');

module.exports = async member => {
  let ototag = await db.fetch(`ototag_${member.guild.id}`);
  let kanal = await db.fetch(`ototagKanal_${member.guild.id}`)
  let kayıt = await db.fetch(`kayıt_${member.guild.id}`)
  
  if (!ototag) return
  try {
  member.setNickname(`${ototag} ${member.user.username}`)
  if (!kanal) return
  member.guild.channels.get(kanal).send(`${process.env.basarili} Sunucuya yeni giriş yapan **${member.user.username}**'a [**${ototag}**] tagı verildi.`)
  } catch(e) {
  }
}
