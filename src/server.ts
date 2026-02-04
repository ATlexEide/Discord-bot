import express from "express";
import {
  handleEvent,
  lastEvent,
  serverStatus
} from "./minecraft/event-handler.ts";
export function startServer() {
  const port = 1337;
  const app = express();
  app.use(express.json());

  app.get("/", (req: any, res: any) => {
    res.send("Welcome to my server!");
  });
  app.get("/test", (req: any, res: any) => {
    res.send("This is a test yippieeee");
  });

  app.get("/events/last", (req: any, res: any) => {
    res.send(lastEvent);
  });

  app.get("/server/status", (req: any, res: any) => {
    res.send(serverStatus);
  });

  app.post("/events", async (req: any, res: any) => {
    console.clear();
    console.log(req.body);
    const event = await req.body;
    handleEvent(event);
    console.log("Request recieved");
    console.log(event);
    res.json({ status: "OK" });
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}
