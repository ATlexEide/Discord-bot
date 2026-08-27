import { Guild, REST, Routes } from "discord.js";
import dotenv from "dotenv";
import { client, cmdArr } from "../main.js";

dotenv.config();

export async function refreshCommands(guild: Guild): Promise<boolean> {
  console.log("Updating commands for:");
  if (!process.env.DISCORD_TOKEN) {
    throw new Error("You're being stupid, no token dumbass");
  }

  const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
  try {
    let _cmdArray: any = [];
    cmdArr.map((cmd) => {
      _cmdArray.push(cmd.data);
    });

    const id = client.user?.id;
    if (!id) throw new Error("No Bot id");
    if (!guild) throw new Error("No Guild");

    return await rest
      .put(Routes.applicationGuildCommands(id, guild.id), {
        body: _cmdArray
      })
      .then((res) => {
        console.log("res !!!!!", res);
        return res ? true : false;
      })
      .catch((error) => {
        return false;
      });
    // console.log(test);
    // await rest.put(Routes.applicationCommands(id), {
    //   body: _cmdArray
    // });
  } catch (error: any) {
    console.log(error);
    throw new Error({ ...error });
  }
}
