import express from "express";
import { fetchEvents } from "./utils/fetchEvents.js";
import path from "node:path";

import { client, globalErrorHandler } from "../main.js";
import {
  escapeSpoiler,
  Guild,
  Interaction,
  Message,
  MessageFlags,
  TextChannel
} from "discord.js";
import { fetchMembers } from "./utils/fetchMembers.js";
import cors from "cors";
import { getChannelId } from "../utils/DB.js";
import { getChatEmbed } from "../minecraft/event_embeds/chat-embed.js";
import { getConnectionEmbed } from "../minecraft/event_embeds/connection-embed.js";
import { getServerStatusEmbed } from "../minecraft/event_embeds/serverstatus-embed.js";
import {
  getFailedWhitelistEmbed,
  getWhitelistEmbed
} from "../minecraft/event_embeds/whitelistEmbed.js";

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

  app.use(express.static(path.join(import.meta.dirname, "public")));
  console.log(path.join(import.meta.dirname, "public"));
  app.use(express.json());

  app.get("/members", async (req: any, res: any) => {
    // const guild = client.guilds.cache.get("1440456875320807576");
    console.log("fetching users");
    if (theBurrow === undefined) res.error("Couldnt find guild");
    res.json(await fetchMembers(theBurrow));
  });
  app.get("/events", async (req: any, res: any) => {
    if (theBurrow === undefined) res.error("Couldnt find guild");
    res.json(await fetchEvents(theBurrow));
  });

  app.get("/mc/status", async (req: any, res: any) => {
    try {
      fetch("http://127.0.0.1:3001/status")
        .then((r) => r.json())
        .then((r) => res.send(r));
    } catch (e) {
      globalErrorHandler(e);
    }
  });
  // app.post("/mc/chat", async (req: any, res: any) => {
  //   const event = await req.body;
  //   console.log("Request recieved");
  //   console.log(event);

  //   res.json({ status: "OK", message: "yipp" });
  // });
  app.post("/mc/log", async (req: any, res: any) => {
    const event = await req.body;
    console.log("Request recieved");
    console.log(event);

    res.json({ status: "OK", message: "yipp" });
  });

  app.post("/mc/chat", async (req: any, res: any) => {
    const event = await req.body;
    console.log(event);
    handleServerEvent(event, res);
  });

  app.post("/mc/whitelist", async (req: any, res: any) => {
    const event = await req.body;
    console.log("Request recieved");
    console.log(event);

    res.json({ status: "OK", message: "yipp" });
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export async function sendMcMessage(message: Message) {
  console.log(message);
  const bodyContent = `[Discord]<${message.author.displayName}> ${message.content}`;

  console.log(bodyContent);
  const _message = await fetch("http://127.0.0.1:3001/chat", {
    method: "POST",
    body: bodyContent
    // headers: { "Content-Type": "application/json" }
  });
}
export function removeWhitelist(id, interaction) {
  console.log("removing " + id);
  interaction.message.delete();
}
export async function whitelistPlayer(message: Message) {
  const playerInfo = await fetch(
    `https://playerdb.co/api/player/minecraft/${message.content}`
  ).then((res) => res.json());
  console.log(playerInfo);

  if (playerInfo) {
    const author = message.author;
    let isValid = false;
    switch (playerInfo.code) {
      case "player.found":
        const username = playerInfo.data.player.username;
        const uuid = playerInfo.data.player.raw_id;
        (message.channel as TextChannel).send(
          getWhitelistEmbed(message.author, playerInfo)
        );
        message.delete();
        break;
      case "minecraft.invalid_username":
        message.reply(getFailedWhitelistEmbed(author));
        message.delete();
        break;

      default:
        break;
    }
  }

  return;
  const bodyContent = `${message.author.displayName}|${message.content}`;

  console.log(bodyContent);
  const _message = await fetch("http://127.0.0.1:3001/whitelist", {
    method: "POST",
    body: bodyContent
    // headers: { "Content-Type": "application/json" }
  });
}

async function handleServerEvent(event: any, res: any) {
  try {
    const eventChannelId = await getChannelId(event);
    const channel = client.channels.cache.get(eventChannelId);

    switch (event.name) {
      case "PlayerJoinEvent":
      case "PlayerQuitEvent":
        (channel as TextChannel).send(getConnectionEmbed(event));
        break;

      case "ChatEvent":
        (channel as TextChannel).send(getChatEmbed(event));
        break;

      case "ServerStart":
      case "ServerStop":
        (channel as TextChannel).send(getServerStatusEmbed(event));
        break;

      default:
        break;
    }
    res.send("OK");
  } catch (e) {
    globalErrorHandler(e);
  }
}
