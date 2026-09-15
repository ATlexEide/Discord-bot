import express from "express";
import { fetchEvents } from "./utils/fetchEvents.js";
import path from "node:path";

import { client, globalErrorHandler } from "../main.js";
import { ButtonInteraction, Guild, Message, TextChannel } from "discord.js";
import { fetchMembers } from "./utils/fetchMembers.js";
import cors from "cors";
import { getChannelId } from "../utils/DB.js";
import { getChatFormat } from "../minecraft/event_embeds/chat-embed.js";
import { getConnectionEmbed } from "../minecraft/event_embeds/connection-embed.js";
import { getServerStatusEmbed } from "../minecraft/event_embeds/serverstatus-embed.js";
import {
  getFailedWhitelistEmbed,
  getWhitelistEmbed
} from "../minecraft/event_embeds/whitelistEmbed.js";
import { getDeathEmbed } from "../minecraft/event_embeds/deathEmbed.js";

let channels = {
  minecraft_server: {
    chat_channel: "",
    log_channel: "",
    whitelist_channel: ""
  }
};

const theBurrowId: string = "1440456875320807576";

interface Member {
  name: string;
  avatar: string;
}

export function updateCache(data: Member[]) {
  membersCache = data;
}
export let membersCache: Member[] = [];
export let membersCache_lastUpdate = new Date();

export function startServer() {
  const theBurrow: Guild | undefined = client.guilds.cache.get(theBurrowId);

  const port = process.env.PORT || 1337;
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(express.static(path.join(import.meta.dirname, "public")));

  app.post("posttest", (req: any, res: any) => {
    res.send("DOES IT WORK???");
  });

  app.post("/mc/chat", async (req: any, res: any) => {
    const event = await req.body;
    await handleServerEvent(event, res);
  });

  app.post("/mc/whitelist", async (req: any, res: any) => {
    const event = await req.body;

    res.send({ status: "OK", message: "yipp" });
  });

  app.get("/members", async (req: any, res: any) => {
    // const guild = client.guilds.cache.get("1440456875320807576");
    if (theBurrow === undefined) res.error("Couldnt find guild");
    res.json(await fetchMembers(theBurrow));
  });
  app.get("/events", async (req: any, res: any) => {
    if (theBurrow === undefined) res.error("Couldnt find guild");
    res.json(await fetchEvents(theBurrow));
  });

  app.get("/mc/status", async (req: any, res: any) => {
    try {
      fetch(`http://${process.env.MC_SERVER_IP}/status`)
        .then((r) => r.json())
        .then((r) => res.send(r));
    } catch (e) {
      res.send("FAILED");
      globalErrorHandler(e);
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export async function sendMcMessage(message: Message) {
  const bodyContent = `[Discord]<${message.author.displayName}> ${message.content}`;

  const _message = await fetch(`http://${process.env.MC_SERVER_IP}/chat`, {
    method: "POST",
    body: bodyContent
    // headers: { "Content-Type": "application/json" }
  });
}
export function removeWhitelist(id: string, interaction: ButtonInteraction) {
  try {
    fetch(`http://${process.env.MC_SERVER_IP}/whitelist/remove`, {
      method: "POST",
      body: interaction.message.embeds[0].author?.name
    })
      .then((res) => interaction.message.delete())
      .catch((e) => globalErrorHandler(e));
  } catch (e) {
    globalErrorHandler(e);
  }
}

function formatDiscordName(name: string) {
  const arr = name.split("");
  arr[0] = arr[0].toUpperCase();
  const str = arr
    .join("")
    .replace(/\s+([a-zA-Z])/g, (_, letter) => letter.toUpperCase());

  return str;
}

export async function whitelistPlayer(message: Message) {
  const _message = message.content.split(" ").join();
  try {
    const playerInfo = await fetch(
      `https://playerdb.co/api/player/minecraft/${_message}`
    ).then((res) => res.json());

    if (playerInfo) {
      const author = message.author;
      switch (playerInfo.code) {
        case "player.found":
          const username = message.author.displayName.includes(" ")
            ? formatDiscordName(message.author.displayName)
            : message.author.displayName;

          fetch(`http://${process.env.MC_SERVER_IP}/whitelist/add`, {
            method: "POST",
            body: `${username}|${playerInfo.data.player.username}`
          }).then((res) => {
            (message.channel as TextChannel).send(
              getWhitelistEmbed(message.author, playerInfo)
            );
          });
          message.delete();
          break;
        case "minecraft.invalid_username":
          // @ts-ignore
          message.reply(getFailedWhitelistEmbed(author));
          message.delete();
          break;

        default:
          break;
      }
    }

    return;
  } catch (e) {
    globalErrorHandler(e);
  }
}

let firstUpdate = true;
let updateString = "🟢 Minecraft 0 / 20";
let lastUpdateString = "🟢 Minecraft 0 / 20";
let minutes = 0;
const minecraftCategoryId = "1547254845981859880";
async function handleServerEvent(event: any, res: any) {
  const eventChannelId = await getChannelId(event);
  const channel = client.channels.cache.get(eventChannelId);
  const category = client.channels.cache.get(minecraftCategoryId);
  try {
    switch (event.name) {
      case "PlayerDeathEvent":
        (channel as TextChannel).send(getDeathEmbed(event));
        break;
      case "PlayerJoinEvent":
      case "PlayerQuitEvent":
        (channel as TextChannel).send(getConnectionEmbed(event));
        updateString = `🟢 Minecraft ${event.player_count} / 20`;
        break;

      case "ChatEvent":
        (channel as TextChannel).send(getChatFormat(event));
        break;

      case "ServerStart":
      case "ServerStop":
        (channel as TextChannel).send(getServerStatusEmbed(event));
        updateString =
          event.name === "ServerStart" ? "🟢 Minecraft 0 / 20" : "🔴 Minecraft";
        break;

      default:
        break;
    }

    if (firstUpdate) {
      firstUpdate = false;
      startTimer();
    }
    res.send("OK");
  } catch (e) {
    res.send("FAILED");
    globalErrorHandler(e);
  }
  function startTimer() {
    lastUpdateString = updateString;
    (category as TextChannel).setName(lastUpdateString);
    console.log("Status changed, checking again in 5 minutes");
    const timer = setInterval(() => {
      if (!updateString) return;
      minutes += 1;

      if (minutes >= 5 && updateString != lastUpdateString) {
        (category as TextChannel).setName(updateString);
        lastUpdateString = updateString;
        minutes = 0;
      } else if (minutes > 5 && updateString === lastUpdateString) {
        console.log("No status change, pausing check");
        firstUpdate = true;
        clearInterval(timer);
      }
    }, 1 * 60 * 1000);
  }
}
