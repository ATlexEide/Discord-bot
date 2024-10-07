import { SlashCommandBuilder } from "discord.js";
import { testaction, createProjectButtons } from "../actionRows/testrow.js";
import { projects } from "../projects/projects.js";

export const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
    response: (interaction) => interaction.reply("Pong!"),
  },
  {
    name: "radiocheck",
    description: "Replies with Lima charlie!",
    response: (interaction) => interaction.reply("Lima charlie"),
  },
  {
    name: "date",
    description: "Replies with the time!",
    response: (interaction) => {
      const date = new Date();
      interaction.reply(`It is now ${date}`);
    },
  },
  {
    name: "oppai",
    description: "Cave...",
    response: (interaction) => {
      interaction.reply(`:regional_indicator_b: :a: :regional_indicator_n: `);
      interaction.user.send(
        ":regional_indicator_b: :a: :regional_indicator_n:"
      );
    },
  },
  {
    name: "projects",
    description: "Test menu",
    response: async (interaction) => {
      interaction.reply({ components: [testaction] });
      console.log(interaction);
      const selectResponse = interaction.replied;
      console.log(selectResponse);
    },
    reply: async (interaction, message) => {
      const currProj = projects.find(
        (obj) => obj.id === String(interaction.values)
      );
      message.message.delete();
      interaction.channel.send({
        content: `> ## ${currProj.projectName}\n> ${currProj.projectDesc}`,
        components: [await createProjectButtons(currProj)],
      });
    },
  },
];
