const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../ayarlar.json')

module.exports = async (oldMsg, newMsg) => {
  
  let client = newMsg.client;
  let prefix = await db.fetch(`prefix_${newMsg.guild.id}`) || ayarlar.prefix
  if (newMsg.author.bot) return;
  if (!newMsg.content.startsWith(prefix)) return;
  let command = newMsg.content.split(' ')[0].slice(prefix.length)
  let params = newMsg.content.split(' ').slice(1)
  let perms = client.elevation(newMsg);
  let cmd;
  if (client.commands.has(command)) cmd = client.commands.get(command);
  else if (client.aliases.has(command)) cmd = client.commands.get(client.aliases.get(command));
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, newMsg, params, perms);
  }
};