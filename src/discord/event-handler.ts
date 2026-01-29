import { Interaction } from "discord.js";
import { commands } from "../utils/commands.js";

export function handleDiscordEvent(interaction: Interaction) {
  if (!interaction) throw new Error("No interaction");
  if (interaction.isCommand()) {
    const id = interaction.commandName;
    const cmd = commands[interaction.commandName];
    cmd.response(interaction);
  }

  // If interaction is on a select menu
  if (interaction.isStringSelectMenu()) {
    commands[interaction.customId].menuResponse(interaction);
  }

  // If interaction is on a button
  if (interaction.isButton()) {
    const id = interaction.customId;
    if (id === "remove-proj-message") {
      interaction.message.delete();
    }
  }
}
