import express from "express";

import { handleEvent } from "../minecraft/event-handler.js";
import { getChannel, TESTgetChannelOut } from "../utils/DB.js";
import { fetchEvents } from "./utils/fetchEvents.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { client } from "../main.js";
import { Guild } from "discord.js";
import { fetchMembers } from "./utils/fetchMembers.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

  // app.use(express.static("public"));
  // app.use(express.static(path.join(__dirname, "public")));
  app.use(express.static("src/API/public"));

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

  app.get("/channels", (req: any, res: any) => {
    res.send().catch((e: Error) => console.log(e));
  });

  app.post("/test", (req: any, res: any) => {
    res.send("This is a test yippieeee").catch((e: Error) => console.log(e));
  });

  app.get("/events/last", (req: any, res: any) => {
    res.send("lastEvent").catch((e: Error) => console.log(e));
  });

  app.get("/server/status", (req: any, res: any) => {
    res.send("serverStatus").catch((e: Error) => console.log(e));
  });

  app.post("/chat", async (req: any, res: any) => {
    console.clear();
    console.log(
      "//////////",
      "STEP 1:",
      "Data hit endpoint and calls eventhandler",
      "//////////"
    );
    const event = await req.body;
    console.log("Request recieved");
    // console.log(event);

    // getChannel(event);
    console.log(await TESTgetChannelOut(event));
    res.json({ status: "OK", message: "yipp" });
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
