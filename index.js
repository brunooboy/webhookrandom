require('dotenv').config(); // Importa e configura dotenv
const Discord = require('ecliptic-selfbot-15');
const { MessageEmbed } = require('ecliptic-selfbot-15');
const client = new Discord.Client({
  checkNamespacing: false
});

const http = require('http');

http.createServer((req, res) => {
  if (req.url === '/') {
    console.log('Ping recebido!');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Ping recebido!');
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Rota não encontrada!');
  }
}).listen(80, () => {
  console.log('Servidor HTTP rodando na porta 80');
});

setInterval(() => {
console.log('HeartBeat-ativo')
}, 60000)

// Criação do cliente de webhook
const webhook = new Discord.WebhookClient({
  id: '1319634653300264972',
  token: 'ceYpca8PbLKkR0vtK4yJL2ZmF23-VvJpVfwhU_cTPrcKb_5NfyovrGE8pzSJgJ_slTiC'
});

setInterval(async () => {
  try {
    // Coleta todos os membros de todos os servidores
    const members = [];
    
    client.guilds.cache.forEach(guild => {
      if(guild.id == "1313726337994723441") return
      const allMembers = guild.members.cache.filter(member => !member.user.bot); // Filtra apenas membros que não são bots
      allMembers.forEach(member => {
        members.push(member);
      });
    });

    // Seleciona 3 membros diferentes
    const selectedMembers = [];
    while (selectedMembers.length < 3 && members.length > 0) {
      const member = members[Math.floor(Math.random() * members.length)];
      if (!selectedMembers.includes(member)) {
        selectedMembers.push(member);
      }
    }

    // Envia os ícones dos 3 membros selecionados
    for (const member of selectedMembers) {
      const profilePicture = member.user.displayAvatarURL({ dynamic: true, size: 2048 }); // Aumenta a resolução da imagem

      const embed = new MessageEmbed()
        .setDescription(`[Download](${profilePicture})`)
        .setImage(profilePicture)
        .setColor('#313338');

      await webhook.send({
        embeds: [embed],
        allowedMentions: { parse: [] } // Envia a mensagem sem notificar usuários
      });
    }
  } catch (error) {
    console.error(error);
  }
}, 3300000); // 1 hora

client.login(process.env.BOT_TOKEN); // Substitua pelo seu token de bot
