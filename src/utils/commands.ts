import dotenv from "dotenv";

dotenv.config();
import {
  projectList,
  createProjectButtons
} from "../action_rows/project-list.js";
import { projects } from "../projects/projects.js";
import { EmbedBuilder } from "@discordjs/builders";
import { refreshCommands } from "./update_commands.js";
import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  MessageFlags
} from "discord.js";
import createInformationalEmbed from "../discord/embeds/informationalEmbed.js";
import createListEmbed from "../discord/embeds/listEmbed.js";

export interface ICommand {
  name: string;
  description: string;
  response: Function;
  menuResponse?: Function;
}

export let commands: { [id: string]: ICommand } = {
  help: {
    name: "help",
    description: "Lists all commands",
    response: (interaction: ChatInputCommandInteraction) => {
      let cmdArr: ICommand[] = [];
      for (const [key, value] of Object.entries(commands)) {
        cmdArr.push(value);
      }
      interaction.reply({
        embeds: [createListEmbed("Commands", cmdArr)],
        flags: MessageFlags.Ephemeral
      });
    }
  },

  ping: {
    name: "ping",
    description: "Replies with Pong!",
    response: (interaction: ChatInputCommandInteraction) => {
      interaction.reply({
        content: "pong",
        flags: MessageFlags.Ephemeral
      });
      console.log(interaction);
    }
  },

  tarkovgod: {
    name: "tarkovgod",
    description: "Who is the god of tarkov",
    response: async (interaction: any) => {
      interaction.reply({ content: "Terrox is the tarkov god" });
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

  refresh: {
    name: "refresh",
    description: "Refresh commands",

    response: async (interaction: ChatInputCommandInteraction) => {
      if (!interaction.guild) throw new Error("No guild found");

      const res = await refreshCommands(interaction.guild);

      const embed = createInformationalEmbed({
        author: interaction.guild.name,
        title: "Updating commands ... "
      });

      await interaction.reply({
        embeds: [embed],
        flags: ["Ephemeral"]
      });

      res
        ? embed.setTitle("Commands updated")
        : embed.setTitle("Failed to update commands");

      await interaction.editReply({ embeds: [embed] });
    }
  },

  map: {
    name: "map",
    description: "show a tarkov map",
    response: async (interaction: any) => {
      switch ("map") {
        case "map":
          // files: [{ attachment: "YourImage.jpg" }];
          break;

        default:
          break;
      }
    }
  }
};

// const builder = new SlashCommandBuilder();
// builder
//   .setName("test")
//   .setDescription("test desc")
//   .addStringOption((option) =>
//     option.setName("test option").setDescription("test option")
//   );
// builder.response = (interaction) => {
//   interaction.reply("THIS IS A TEST");
// };

// commands["test"] = builder;
