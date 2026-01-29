import dotenv from "dotenv";
dotenv.config();
import {
  projectList,
  createProjectButtons
} from "../action_rows/project-list.js";
import { projects } from "../projects/projects.js";
import { EmbedBuilder } from "@discordjs/builders";
import { serverStatus } from "../minecraft/event-handler.js";
import { Interaction } from "discord.js";

export const commands: any = {
  ping: {
    name: "ping",
    description: "Replies with Pong!",
    response: (interaction: any) => {
      interaction.reply("Pong!");
      console.log(interaction);
    }
  },
  radiocheck: {
    name: "radiocheck",
    description: "Replies with Lima charlie!",
    response: (interaction: any) => interaction.reply("Lima charlie")
  },
  date: {
    name: "date",
    description: "Replies with the time!",
    response: (interaction: any) => {
      const date = new Date();
      interaction.reply(`It is now ${date}`);
    }
  },

  projects: {
    name: "projects",
    description: "Test menu",
    response: async (interaction: any) => {
      interaction.reply({ components: [projectList] });
    },
    menuResponse: async (interaction: any) => {
      const currProj = projects.find((obj) => obj.id === interaction.values[0]);
      if (!currProj) throw new Error("No project found");
      interaction.message.delete();
      interaction.channel.send({
        content: `> ## ${currProj.projectName}\n> ${currProj.projectDesc}`,
        components: [await createProjectButtons(currProj)]
      });
    }
  },

  cat: {
    name: "cat",
    description: "CAT GIFs!",
    apiKey: process.env.GIPHY_API_KEY,
    response: async (interaction: any) => {
      let data = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=CATS&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
      );
      const cat_data = await data.json();
      const currCat = await cat_data.data[
        Math.floor(Math.random() * cat_data.data.length)
      ];
      console.log(cat_data.data[0]);
      const catGIF = currCat.images.fixed_width_downsampled.url;
      const catEmbed = new EmbedBuilder()
        .setTitle(currCat.title)
        .setImage(catGIF);
      console.clear();
      console.log(currCat);
      interaction.reply({ embeds: [catEmbed] });
    }
  },

  ip: {
    name: "ip",
    description: "Minecraft server ip",
    response: async (interaction: Interaction) => {
      if (!serverStatus) {
        interaction.reply("I cant find any ip, is the server running?");
        return;
      }
      if (!serverStatus.ip) interaction.reply(`localhost:${serverStatus.port}`);
      if (serverStatus.ip)
        interaction.reply(`${serverStatus.ip}:${serverStatus.port}`);
    }
  },

  mctest: {
    name: "mctest",
    description: "Testing minecraft server util",
    response: async (interaction: any) => {
      interaction.reply("mctest");
    }
  },

  help: {
    name: "help",
    description: "List commands",
    response: async (interaction: any) => {
      const result = [];
      for (const [key, val] of Object.entries(commands)) {
        console.log(key, val);
        // result.push()
      }
      interaction.reply("result");
    }
  }
};
