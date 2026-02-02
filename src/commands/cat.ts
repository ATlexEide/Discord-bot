import dotenv from "dotenv";
dotenv.config();

import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder
} from "discord.js";

export default {
  data: new SlashCommandBuilder().setName("cat").setDescription("CAT GIF!"),

  async response(interaction: ChatInputCommandInteraction) {
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
};
