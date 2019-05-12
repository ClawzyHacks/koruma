const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, msg, args) => {
 if (!msg.member.hasPermission('MANAGE_MESSAGES')) return msg.channel.send(":no_entry: Bu komudu kullanabilmek için `Mesajları Yönet` yetkisine sahip olman gerek.")
  
  if (!args[0]) return msg.channel.send(":no_entry: ***Silinecek mesaj değerini belirtiniz.*** `/sil 100`")
  if (isNaN(args[0])) return msg.channel.send(":no_entry: ***Geçerli bir değer giriniz.*** `/sil 100`")
  if (args[0] > 99) {
    let sayı = parseInt(args[0])
    msg.channel.fetchMessages({limit: sayı}).then(messages => {
      messages.delete()
      msg.channel.send('<:basari:515169439206080514> ' + args[0] + ' adet mesaj **silindi!**').then(msg => msg.delete(3000))
    })
  } else {
				msg.channel.fetchMessages({limit: parseInt(args[0]) + 1}).then(messages => {
						msg.channel.bulkDelete(messages.size, true).then(deletedMessages => {
							if (deletedMessages.size <= 1) return msg.channel.send('<:basarisiz:512273007901671444> Hiç mesaj **silinemedi.** *(Tahminen 14 günden daha eski mesajlar var ise bundan dolayı mesajlar silinememiş olabilir.)*').then(msg => msg.delete(3000));
							const mesajadet = parseInt(deletedMessages.size) - 1;
							msg.channel.send('<:basari:515169439206080514> ' + mesajadet + ' adet mesaj **silindi!**').then(msg => msg.delete(3000));	
						})
					})
  }
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["prune", "sil", "temizçek"], 
  permLevel: 0
};

exports.help = {
  name: 'temizle', 
  description: 'nblm', 
  usage: 'temizle' 
};