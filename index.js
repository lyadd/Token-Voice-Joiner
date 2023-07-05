const Discord = require("discord.js-self");
const fs = require('fs');
require("colors");

class Lyad {
  constructor(token) {
    this.token = token;
    this.client = new Discord.Client({ checkUpdate: false });
  }

  async go() {
    try {
      await this.client.login(this.token);
      this.joinVoiceChannel();
    } catch (err) {
      console.log(`Échec de connexion avec le token ${this.token.red}`);
    }
  }

  joinVoiceChannel() {
    const channel = this.client.channels.cache.get(Configuration().CHANNEL_ID);
    if (!channel) {
      console.log('Salon vocal introuvable'.red);
      process.exit();
    }
    channel.join().catch(() => { });
    console.log(`Connecté sur ${this.client.user.username} (${this.client.user.id})`.green);
  }
}

function Configuration() {
  return require("./config");
}

async function Connexion(tokens) {
  const connections = tokens.map(async (token) => {
    const lyad = new Lyad(token);
    await lyad.go();
  });

  await Promise.all(connections);
}

const tokens = fs.readFileSync('tokens.txt', 'utf-8').replace(/\r/g, '').split('\n');

Connexion(tokens);