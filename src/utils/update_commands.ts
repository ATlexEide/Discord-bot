import { Guild, InteractionCallback, REST, Routes } from "discord.js";
import { commands, ICommand } from "./commands.js";
import dotenv from "dotenv";
dotenv.config();

export async function refreshCommands(guild: Guild): Promise<boolean> {
  if (!process.env.DISCORD_TOKEN) {
    throw new Error("You're being stupid, no token dumbass");
  }

  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

  try {
    let cmdArray: ICommand[] = [];
    for (const [key, val] of Object.entries(commands)) {
      cmdArray.push(val);
    }
    console.log("Started refreshing application (/) commands.");

    const id = process.env.BOT_ID;
    if (!id) throw new Error("No Bot id");
    if (!guild) throw new Error("No Guild");

    await rest.put(Routes.applicationGuildCommands(id, guild.id /*GUILD ID*/), {
      body: cmdArray
    });

    console.log("Successfully reloaded application (/) commands.");

    return true;
  } catch (error: any) {
    throw new Error({ ...error });
  }
  return false;
}
