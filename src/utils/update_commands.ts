import { Guild, REST, Routes } from "discord.js";
import dotenv from "dotenv";
import { cmdArr } from "../main.js";
dotenv.config();

export async function refreshCommands(guild: Guild): Promise<boolean> {
  if (!process.env.DISCORD_TOKEN) {
    throw new Error("You're being stupid, no token dumbass");
  }

  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

  try {
    let _cmdArray: any = [];
    cmdArr.map((cmd) => {
      _cmdArray.push(cmd.data);
    });

    const id = process.env.BOT_ID;
    if (!id) throw new Error("No Bot id");
    if (!guild) throw new Error("No Guild");

    await rest.put(Routes.applicationCommands(id /*GUILD ID*/), {
      body: _cmdArray
    });

    await rest.put(Routes.applicationGuildCommands(id, guild.id /*GUILD ID*/), {
      body: _cmdArray
    });

    return true;
  } catch (error: any) {
    console.log(error);
    throw new Error({ ...error });
  }
  return false;
}
