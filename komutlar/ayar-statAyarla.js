const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`${process.env.basarisiz} Bu komudu kullanabilmek için "Yönetici" yetkisine sahip olman gerek.`)
  if (!args[0]) return message.channel.send(`:no_entry: Sunucu istatistiği ayarlamak için gerekli bazı parametreler vardır, Parametreler: \`kur\` ve \`sil\` yapmak istediğiniz işlemi belirtiniz. \`/statayarla kur\``)
  if (args[0] !== 'kur' && args[0] !== 'sil') return message.channel.send(`:no_entry: Sunucu istatistiği ayarlamak için gerekli bazı parametreler vardır, Parametreler: \`kur\` ve \`sil\` yapmak istediğiniz işlemi belirtiniz. \`/statayarla kur\``)
  
  if (args[0] == 'kur') {
    if (db.has(`üyekanal_${message.guild.id}`)) return message.channel.send(`${process.env.basarisiz} Sunucu istatistiği zaten ayarlanmış, tekrar ayarlayamazsınız.`)
    if (db.has(`kulkanal_${message.guild.id}`)) return message.channel.send(`${process.env.basarisiz} Sunucu istatistiği zaten ayarlanmış, tekrar ayarlayamazsınız.`)
    if (db.has(`neblmkanal_${message.guild.id}`)) return message.channel.send(`${process.env.basarisiz} Sunucu istatistiği zaten ayarlanmış, tekrar ayarlayamazsınız.`) 
    
    let kategori = await message.guild.createChannel("Sunucu İstatistik", "category", [{
      id: message.guild.id,
      deny: ["CONNECT"]
    }])
    message.guild.createChannel(`Üye sayısı: ${message.guild.memberCount}`, "voice").then(üye => {
    message.guild.createChannel(`Kullanıcı sayısı: ${message.guild.members.filter(m => !m.user.bot).size}`, 'voice').then(kul => {
    message.guild.createChannel(`Bot sayısı: ${message.guild.members.filter(m => m.user.bot).size}`, 'voice').then(neblm => {
    üye.setParent(kategori.id)  
    kul.setParent(kategori.id)  
    neblm.setParent(kategori.id)
    db.set(`üyekanal_${message.guild.id}`, üye.id)
    db.set(`kulkanal_${message.guild.id}`, kul.id)
    db.set(`neblmkanal_${message.guild.id}`, neblm.id)
  
    message.channel.send(`${process.env.basarili} Başarıyla sunucu istatistiğini ayarlandı, iyi kullanmalar.`)
  })
  })
  })
  }
  
  if (args[0] == 'sil') {
    let üye = await db.fetch(`üyekanal_${message.guild.id}`)
    if (!üye) return message.channel.send(`${process.env.basarisiz} Sunucu istatistiği sistemini sunucunuzda bulamadım.`)
    let kul = await db.fetch(`kulkanal_${message.guild.id}`)
    if (!kul) return message.channel.send(`${process.env.basarisiz} Sunucu istatistiği sistemini sunucunuzda bulamadım.`)
    let neblm = await db.fetch(`neblmkanal_${message.guild.id}`)
    if (!neblm) return message.channel.send(`${process.env.basarisiz} Sunucu istatistiği sistemini sunucunuzda bulamadım.`)
    let üye2 = message.guild.channels.get(üye)
    if (!üye2) return message.channel.send(`${process.env.basarisiz} İstatistik kurulmuş fakat, kurulu kanalı bulamıyorum.`)
    let kul2 = message.guild.channels.get(kul)
    if (!kul2) return message.channel.send(`${process.env.basarisiz} İstatistik kurulmuş fakat, kurulu kanalı bulamıyorum.`)
    let neblm2 = message.guild.channels.get(neblm)
    if (!neblm2) return message.channel.send(`${process.env.basarisiz} İstatistik kurulmuş fakat, kurulu kanalı bulamıyorum.`)
    
    üye2.delete()
    kul2.delete()
    neblm2.delete()
    
    db.delete(`üyekanal_${message.guild.id}`)
    db.delete(`kulkanal_${message.guild.id}`)
    db.delete(`neblmkanal_${message.guild.id}`)
    
    message.channel.send(`${process.env.basarili} Sunucu istatistiğini temizlediniz.`)
  }
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'stat', 
  description: 'nblm', 
  usage: 'stat' 
};
