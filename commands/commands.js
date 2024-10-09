import dotenv from "dotenv";
dotenv.config();
import {
  projectList,
  createProjectButtons,
} from "../actionRows/project-list.js";
import { projects } from "../projects/projects.js";
import { EmbedBuilder } from "@discordjs/builders";

export const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
    response: (interaction) => {
      interaction.reply("Pong!");
      console.log(interaction);
    },
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
      interaction.reply({ components: [projectList] });
      console.log(interaction);
      const selectResponse = interaction.replied;
      console.log(selectResponse);
    },
    reply: async (interaction) => {
      const currProj = projects.find(
        (obj) => obj.id === String(interaction.values)
      );
      interaction.message.delete();
      interaction.channel.send({
        content: `> ## ${currProj.projectName}\n> ${currProj.projectDesc}`,
        components: [await createProjectButtons(currProj)],
      });
    },
  },
  {
    name: "cat",
    description: "CAT GIFs!",
    apiKey: process.env.GIPHY_API_KEY,
    response: async (interaction) => {
      let data = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=CATS&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
      );
      const cat_data = await data.json();
      console.log(cat_data.data[0]);
      const catGIF = await cat_data.data[
        Math.floor(Math.random() * cat_data.data.length)
      ].images.fixed_width_downsampled.url;
      const catEmbed = new EmbedBuilder().setTitle("CAT!").setImage(catGIF);
      console.log(catEmbed);
      interaction.reply({ embeds: [catEmbed] });
    },
  },
];
