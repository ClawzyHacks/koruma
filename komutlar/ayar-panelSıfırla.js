const Discord = require('discord.js');
const db = require('quick.db');

exports.run =async (client, message, params, args) => {
  if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':no_entry: Bu komudu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın!') 
        
  if (args[0] === "otorol") {
    db.delete(`otorolKanal_${message.guild.id}`)
    db.delete(`autoRole_${message.guild.id}`)
    message.channel.send(":wrench: Otomatik rol ayarları başarıyla sıfırlandı.")
  }  
  
  else if (args[0] === "sayaç") {
    db.delete(`sayacKanal_${message.guild.id}`)
    db.delete(`sayacSayi_${message.guild.id}`)
    message.channel.send(":wrench: Sayaç ayarları başarıyla sıfırlandı.")
  }  
  
  else if (args[0] === "log") {
    
  }  
}
    
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: [],
 permLevel: 0
};

exports.help = {
 name: 'panelkapat',
 description: 'nblm',
 usage: 'panelkapat'
};