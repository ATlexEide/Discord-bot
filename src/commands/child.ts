import dotenv from "dotenv";
dotenv.config();

import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder
} from "discord.js";

const name: string = "child";
let headersList = {
  "User-Agent": "Velvet's Burrow",
  "API-KEY": process.env.BNUUY_KEY,
  "Content-Type": "application/json"
};

let bodyContent = JSON.stringify({
  "API-KEY": process.env.BNUUY_KEY
});

export default {
  name,
  data: new SlashCommandBuilder().setName(name).setDescription("MY CHILD!"),

  async response(interaction: ChatInputCommandInteraction) {
    try {
      await interaction.reply("Picking a child from the burrow...");
      let data = await fetch(
        "https://burrowapi.buskenisse.com/velvet/generate_child",
        {
          method: "POST",
          body: bodyContent,
          // @ts-expect-error
          headers: headersList
        }
      );
      const bnuuy_data = await data.json();
      const bnuuy = await bnuuy_data.result;
      console.log(bnuuy_data);
      const bnuuyEmbed = new EmbedBuilder()
        .setTitle("RISE, CHILD!")
        .setImage(bnuuy);
      // interaction.reply(bnuuy);

      interaction.editReply({ content: "", embeds: [bnuuyEmbed] });
    } catch (err) {
      console.log(err);
      interaction.reply({
        content: "Something went wrong",
        flags: ["Ephemeral"]
      });
    }
  }
};
