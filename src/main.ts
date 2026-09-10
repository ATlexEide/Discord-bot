import dotenv from "dotenv";
dotenv.config();
import {
  Client,
  EmbedBuilder,
  GatewayIntentBits,
  TextChannel
} from "discord.js";
import { handleDiscordEvent } from "./discord/event-handler.js";
import { startServer } from "./API/server.js";

import ping from "./commands/ping.js";
import tarkovgod from "./commands/tarkovgod.js";
import cat from "./commands/cat.js";
import refresh from "./commands/refresh.js";
import map from "./commands/map.js";
import hiLove from "./commands/hiLove.js";
import help from "./commands/help.js";
import setchatchannel from "./commands/setchatchannel.js";
import setlogchannel from "./commands/setlogchannel.js";
import setwhitelistchannel from "./commands/setwhitelistchannel.js";
import army from "./commands/army.js";
import test from "./commands/test.js";
import testing from "./commands/testing.js";
import child from "./commands/child.js";

export let cmdArr = [
  refresh,
  test,
  testing,
  ping,
  army,
  setwhitelistchannel,
  setlogchannel,
  setchatchannel,
  help,
  hiLove,
  map,
  cat,
  tarkovgod,
  child
];

/////////
// Discord Bot
export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages
  ]
});

try {
  //////
  // Load bot
  client.login(process.env.DISCORD_TOKEN);
  client.on("clientReady", () => {
    if (!client.user) throw new Error("No client user");
    console.log(`Logged in as ${client.user.tag}, ready to serve!`);
    startServer();
  });

  //////
  // Listen for interactions
  client.on("interactionCreate", async (interaction) => {
    handleDiscordEvent(interaction);
  });

  // if (!process.env.DISCORD_CHAT_CHANNEL_ID)
  //   throw new Error("No chat channel id in local enviroment");

  client.on("messageCreate", async (message) => {
    try {
      if (message.author.bot) return;
      if (message.content === "kys") {
        console.log(message);
        throw new Error("furries ate the code");
      }
    } catch (error: any) {
      globalErrorHandler(error);
      return;
    }
  });
} catch (e: any) {
  globalErrorHandler(e);
}

export async function globalErrorHandler(error: any, interaction = null) {
  const embed = new EmbedBuilder()
    .setAuthor({ name: "Error" })
    .setTitle(error.message)
    .setColor(0xff0000)
    .setDescription(error.stack);

  try {
    const channel = await client.guilds.cache
      .get("1440456875320807576")
      ?.channels.cache.get("1543265734669504592")
      ?.fetch();

    if (channel?.isTextBased) {
      const message = (channel as TextChannel)?.send({ embeds: [embed] });
    }

    console.log(error.message);

    for (const [key, val] of Object.entries(error)) {
      console.log(key, val);
    }
  } catch (error: any) {
    console.log(error);
  }
  return;
}

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE
// });

//     let payload = `${message.author.displayName} | ${message.content}`;
//     db.query(
//       `SELECT chat_channel_id FROM guilds WHERE guildId = ${message.guildId}`,
//       (err, res) => {
//         if (err) {
//           console.error(err);
//           return;
//         }
//         // @ts-expect-error
//         if (!res[0]) {
//           console.error(
//             `couldnt find chat channel for guild id ${message.guildId}`
//           );
//         }
//       }
//     );

import { createClient } from "@libsql/client/web";
if (!process.env.BUNNY_DATABASE_URL || !process.env.BUNNY_DATABASE_AUTH_TOKEN) {
  throw new Error("Missing env variable");
}

const dbUrl: string = process.env.BUNNY_DATABASE_URL;
const authToken: string = process.env.BUNNY_DATABASE_AUTH_TOKEN;

console.log("Started bunny client");
export const dbClient = createClient({
  url: dbUrl,
  authToken: authToken
});
