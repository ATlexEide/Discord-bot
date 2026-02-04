import { Interaction } from "discord.js";
import { cmdArr } from "../main.js";

export function handleDiscordEvent(interaction: Interaction) {
  if (!interaction) throw new Error("No interaction");
  if (interaction.isCommand()) {
    const id = interaction.commandName;
    console.log(`${interaction.user.displayName} used ${id}`);

    const cmd = cmdArr.find(
      (item) => item.name === interaction.commandName
    )?.command;
    console.log(cmd);

    if (!cmd) throw new Error("Command not found");
    console.log(cmd);
    // @ts-ignore
    cmd.response(interaction);
  }

  // If interaction is on a select menu
  // if (interaction.isStringSelectMenu()) {
  //   if (!interaction) return;
  //   if (!commands[interaction.customId]) return;
  //   if ("menuResponse" in commands[interaction.customId]) {
  //     commands[interaction.customId].menuResponse
  //       ? console.log("yay")
  //       : console.log("nay");
  //   }
  // }

  // If interaction is on a button
  if (interaction.isButton()) {
    const id = interaction.customId;
    if (id === "delete-map") {
      interaction.message.delete();
    }
  }
}
