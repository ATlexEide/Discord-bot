import express from "express";
import {
  handleEvent,
  lastEvent,
  serverStatus
} from "./minecraft/event-handler.js";

const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req: any, res: any) => {
  res.send("Welcome to my server!");
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
