import { Interaction } from "discord.js";
import { cmdArr } from "../main.js";

export function handleDiscordEvent(interaction: Interaction) {
  if (!interaction) throw new Error("No interaction");
  if (interaction.isCommand()) {
    try {
      const id = interaction.commandName;
      const cmd = cmdArr.find((item) => item.name === interaction.commandName);

      if (!cmd) throw new Error("Command not found");
      // @ts-ignore
      cmd.response(interaction);
    } catch (err) {
      interaction.reply({
        content: "Something went wrong",
        flags: ["Ephemeral"]
      });
    }
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
