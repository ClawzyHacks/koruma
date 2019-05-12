const Discord = require('discord.js');
const db = require('quick.db')

exports.run = async (client, message, args, member) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${process.env.basarisiz} Bu komutu kullanabilmek için "Yönetici" yetkisine sahip olman gerek.`)
  if (!args[0]) { 
    message.channel.send(":no_entry: Özel komut eklemek için belirle parametreler var, Parametreler `ekle-1, ekle-2, ekle-3, sil, sil-2, sil-3, liste`. `/komut ekle-1 [<komut>] [<cevap>]`")
  }
  let seçenek = args[0]
  let nesne = args[1]
  let nesne2 = args[2]
  
  if (seçenek === 'ekle-1') {
  db.set(`ozelkomut_${message.guild.id}`, nesne)
  db.set(`ozelmesaj_${message.guild.id}`, args.slice(2).join(" "))
  db.set(`ozelkomutgecmisi_${message.guild.id}`, nesne)
  message.channel.send(`<:LOXYscheckMark:512968343570087946> Özel komut başarıyla ayarlandı, Komut: \`${nesne}\` Cevap: \`${args.slice(2).join(" ")}\``)
  }
  
  if (seçenek === 'ekle-2') {
  db.set(`ozelkomut-1_${message.guild.id}`, nesne)
  db.set(`ozelmesaj-1_${message.guild.id}`, args.slice(2).join(" "))
  db.set(`ozelkomutgecmisi-2_${message.guild.id}`, nesne)
  message.channel.send(`<:LOXYscheckMark:512968343570087946> Özel komut başarıyla ayarlandı, Komut: \`${nesne}\` Cevap: \`${args.slice(2).join(" ")}\``)
  }
  
  if (seçenek === 'ekle-3') {
  db.set(`ozelkomut-2_${message.guild.id}`, nesne)
  db.set(`ozelmesaj-2_${message.guild.id}`, args.slice(2).join(" "))
  db.set(`ozelkomutgecmisi-3_${message.guild.id}`, nesne)  
  message.channel.send(`<:LOXYscheckMark:512968343570087946> Özel komut başarıyla ayarlandı, Komut: \`${nesne}\` Cevap: \`${args.slice(2).join(" ")}\``)
  }
  
  //
  
  if (seçenek === 'sil') {
  db.delete(`ozelkomut_${message.guild.id}`)
  db.delete(`ozelmesaj_${message.guild.id}`)
  let gecmis = await db.fetch(`ozelkomutgecmisi_${message.guild.id}`)
  message.channel.send(`<:LOXYscheckMark:512968343570087946> \`${gecmis}\` adlı özel komut başarıyla silindi.`)
  }
  
  if (seçenek === 'sil-2') {
  db.delete(`ozelkomut-1_${message.guild.id}`)
  db.delete(`ozelmesaj-1_${message.guild.id}`)
  let gecmis = await db.fetch(`ozelkomutgecmisi-2_${message.guild.id}`)
  message.channel.send(`<:LOXYscheckMark:512968343570087946> \`${gecmis}\` adlı özel komut başarıyla silindi.`)
  }
  
  if (seçenek === 'sil-3') {
  db.delete(`ozelkomut-2_${message.guild.id}`)
  db.delete(`ozelmesaj-2_${message.guild.id}`)  
  let gecmis = await db.fetch(`ozelkomutgecmisi-3_${message.guild.id}`)
  message.channel.send(`<:LOXYscheckMark:512968343570087946> \`${gecmis}\` adlı özel komut başarıyla silindi.`)
  }
  
  //
  
  if (seçenek === 'liste') {
  //
  let ok1 = await db.fetch(`ozelkomut_${message.guild.id}`);
  let ozelkomut;
  if (ok1 == null) ozelkomut = 'Ayarlanmamış!'
  else ozelkomut = `${ok1}`
  //
  let om1 = await db.fetch(`ozelmesaj_${message.guild.id}`);
  let ozelmesaj;
  if (om1 == null) ozelmesaj = 'Ayarlanmamış!'
  else ozelmesaj = `${om1}`
  //
  let ok2 = await db.fetch(`ozelkomut-1_${message.guild.id}`);
  let ozelkomut1;
  if (ok2 == null) ozelkomut1 = 'Ayarlanmamış!'
  else ozelkomut1 = `${ok2}`
  //
  let om2 = await db.fetch(`ozelmesaj-1_${message.guild.id}`);
  let ozelmesaj1;
  if (om2 == null) ozelmesaj1 = 'Ayarlanmamış!'
  else ozelmesaj1 = `${om2}`
  //
  let ok3 = await db.fetch(`ozelkomut-2_${message.guild.id}`);
  let ozelkomut2;
  if (ok3 == null) ozelkomut2 = 'Ayarlanmamış!'
  else ozelkomut2 = `${ok3}`
  //
  let om3 = await db.fetch(`ozelmesaj-2_${message.guild.id}`);
  let ozelmesaj2;
  if (om3 == null) ozelmesaj2 = 'Ayarlanmamış!'
  else ozelmesaj2 = `${om3}`
  
  const embed = new Discord.RichEmbed()
    .setColor(0xffa300)
    .addField(`Özel komutlar listesi`, `**Komut 1**: ${ozelkomut}\n**Mesaj 1**: ${ozelmesaj}\n
              **Komut 2**: ${ozelkomut1}\n**Mesaj 2**: ${ozelmesaj1}\n
              **Komut 3**: ${ozelkomut2}\n**Mesaj 3**: ${ozelmesaj2}`)
    .setFooter(`${message.guild.name} adlı sunucunun özel komutları.`, message.guild.iconURL)
  message.channel.send(embed)
  }
  }

exports.conf = {
enabled: true,
guildOnly: true,
aliases: [],
permLevel: 4
};

exports.help = {
name: 'komut',
description: 'neblm',
usage: 'komut'
};
