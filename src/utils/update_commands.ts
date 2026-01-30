import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
dotenv.config();
import { commands } from "./commands";
if (!process.env.DISCORD_TOKEN) {
  throw new Error("You're being stupid, no token dumbass");
}
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(Routes.applicationCommands("1248660696535924858"), {
    body: commands
  });

  console.log("Successfully reloaded application (/) commands.");
  console.log(commands);
} catch (error) {
  console.error(error);
}
