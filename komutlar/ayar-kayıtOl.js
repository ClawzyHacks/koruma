
const Discord = require("discord.js");
const db = require('quick.db');

exports.run = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':no_entry: Bu komudu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın!') 
    if (!args[0]) return message.channel.send(":no_entry: Kayıt sistemi ayarlamak için gerekli parametreler vardır, parametreler: `aç, kapat, otorol` ayarlamak için bir parametre belirtmelisin.")
  
  if (args[0] == 'aç') {
    if (db.has(`kayıt_${message.guild.id}`)) return message.channel.send('***Sanırım, bu sunucuda kayıt sistemi aktif.***')
    let rol;
    try{
        rol = await message.guild.createRole({
        name: `Kayıtsız`,
        color: "#000000",
        permissions:[]
        })

    message.guild.channels.forEach((channel, id) => {
         channel.overwritePermissions(rol, {
              VIEW_CHANNEL: false,
              CONNECT: false
            });
          });
    }catch (e){
      return message.channel.send('Gerekli rolleri ve izinleri **oluşturamıyorum.** Lütfen yetkimin tam olduğundan emin olun.')
    }
    
    message.guild.createChannel("kayıtsız", "text").then(async o => {
      let role = message.guild.roles.find("name", "@everyone");
       await o.overwritePermissions(role, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: false,
            CONNECT: false
     })
      o.overwritePermissions(rol, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
      })
    
      await db.set(`kayıt_${message.guild.id}`, 'acik')
      await db.set(`kayıtrol_${message.guild.id}`, rol.id)
      o.send('Aşağıdaki emojiye tıklayarak sunucuya kayıt olabilirsiniz!').then(async m => {
        await db.set(`kayıtmesaj_${message.guild.id}`, m.id)
        m.react('💚')
      })
      message.channel.send("***Başarıyla kayıt sistemi kuruldu.***")
    })
  } else if (args[0] == 'kapat') {
    if (!db.has(`kayıt_${message.guild.id}`)) return message.channel.send('***Bu sunucuda zaten kayıt sistemi kapalı?***')
    let bos;
    let i = await db.fetch(`kayıtrol_${message.guild.id}`)
    if (!i) bos = 'uhm'
    let iiii = await message.guild.roles.get(i)
    if (!iiii) bos = 'uhmmmm'
    await iiii.delete()
    await db.delete(`kayıt_${message.guild.id}`)
    await db.delete(`kayıtrol_${message.guild.id}`)
    await db.delete(`kayıtmesaj_${message.guild.id}`)
    message.channel.send('***Kayıt sistemi başarıyla kapatıldı.***')
  } else if (args[0] == 'otorol') {
    if (!db.has(`kayıt_${message.guild.id}`)) return message.channel.send('***Görüşüne göre bir sıkıntı var, bu sunucuda kayıt sistemi kapalı!***')
    let rol = message.mentions.roles.first()
    if (!rol) return message.channel.send('***Lütfen bir rol etiketleyin.***')
    
    db.set(`kayıtotorol_${message.guild.id}`, rol.id)
    message.channel.send('***Kayıt için otorol ayarlandı.***')
  } else return message.channel.send(':no_entry: Kayıt sistemi ayarlamak için gerekli parametreler vardır, parametreler: `aç, kapat, otorol` ayarlamak için bir parametre belirtmelisin.')
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kayıt'],
  permLevel: 0
};

exports.help = {
  name: 'kayıt-sistemi',
  description: 'nblm',
  usage: 'kayıt-sistemi'
};