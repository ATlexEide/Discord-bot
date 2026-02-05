import fs from "node:fs";
import path from "node:path";
import express from "express";
import { handleEvent } from "../minecraft/event-handler.js";

let channels = {
  minecraft_server: {
    chat_channel: "",
    log_channel: "",
    whitelist_channel: ""
  }
};

export function startServer() {
  const port = 1337;
  const app = express();
  app.use(express.json());

  app.get("/channels", (req: any, res: any) => {
    res.send();
  });

  app.get("/", (req: any, res: any) => {
    res.json({ status: "OK", message: "yipp" });
  });

  app.post("/test", (req: any, res: any) => {
    res.send("This is a test yippieeee");
  });

  app.get("/events/last", (req: any, res: any) => {
    res.send("lastEvent");
  });

  app.get("/server/status", (req: any, res: any) => {
    res.send("serverStatus");
  });

  app.post("/chat", async (req: any, res: any) => {
    console.clear();
    console.log(req.body);
    const event = await req.body;
    console.log("Request recieved");
    console.log(event);
    handleEvent(event);
    res.json({ status: "OK", message: "yipp" });
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
