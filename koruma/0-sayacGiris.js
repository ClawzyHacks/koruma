const Discord = require('discord.js')
const db = require('quick.db');

module.exports = async member => {
  let paket = await db.fetch(`pakets_${member.id}`)
  let msj = await db.fetch(`memberSayac_${member.guild.id}`)
  let kanal = await  db.fetch(`sayacKanal_${member.guild.id}`)
  let i = await  db.fetch(`sayacSayi_${member.guild.id}`)
  if (!i) return
  if (!kanal) return
  
    if (paket === 'platinum-paket') {
        member.guild.channels.get(kanal).send(`📢💠 Sunucuda bir **Platinum Üye** var oldu! \`${i}\` olmaya \`${i - member.guild.memberCount}\` kişi kaldı! \nHepiniz hizzaya geçin kralınız geldi. Hoş geldin \`${member.user.tag}\``)
    } else {
    if (msj == null) msj = `:inbox_tray: Yeni bir kişi katıldı! \`${i}\` olmaya \`${i - member.guild.memberCount}\` kişi kaldı!`    
    member.guild.channels.get(kanal).send(msj.replace('{sayac}', `\`${i}\``).replace('{toplam-kullanıcı}', `\`${i - member.guild.memberCount}\``)) 
    //msj.replace('{uye}', member).replace('{sunucu}', member.guild.name)
                  
    if (member.guild.members.size == i) {
    kanal.send(`:tada: Sunucu \`${i}\` kullanıcıya ulaştı. Sayaç sıfırlandı.`)
    db.delete(`sayacSayi_${member.guild.id}`)
  }                  
  }  
}