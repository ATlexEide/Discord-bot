import dotenv from "dotenv";
dotenv.config();

import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  SlashCommandBuilder
} from "discord.js";
import createMapEmbed from "../discord/embeds/mapEmbed.ts";

export default {
  data: new SlashCommandBuilder()
    .setName("map")
    .setDescription("show a tarkov map")
    .addStringOption((Option) =>
      Option.setName("location").setDescription("location").setRequired(true)
    ),

  async response(interaction: ChatInputCommandInteraction) {
    if (!interaction.options.get("location")) return;
    const map = interaction.options.get("location")?.value;

    let mapLink: string = "";
    let wikiLink: string = "";

    // @ts-expect-error
    switch (map.toLowerCase()) {
      case "woods":
        mapLink =
          "https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/0/05/Glory4lyfeWoods_map_v4_marked.png";
        wikiLink = "https://escapefromtarkov.fandom.com/wiki/Woods";
        break;

      case "customs":
        mapLink =
          "https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/0/0b/CustomsMapRealNorthColour_Reemr.png/revision/latest?cb=20250713153259";
        wikiLink = "https://escapefromtarkov.fandom.com/wiki/Customs";
        break;

      case "factory":
        mapLink =
          "https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/3/33/Factory2DMapbyRe3mr.jpg/revision/latest?cb=20251127130957";
        wikiLink = "https://escapefromtarkov.fandom.com/wiki/Factory";
        break;

      case "ground zero":
      case "gz":
        mapLink =
          "https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/9/9b/GroundZeroByxTycho.png/revision/latest?cb=20250821174458";
        wikiLink = "https://escapefromtarkov.fandom.com/wiki/Ground_Zero";
        break;

      case "interchange":
      case "ic":
        mapLink =
          "https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/f/f0/InterchangeMapByre3mr.png/revision/latest?cb=20250715161627";
        wikiLink = "https://escapefromtarkov.fandom.com/wiki/Interchange";
        break;

      case "lighthouse":
      case "lh":
        mapLink =
          "https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/1/13/Jindouz_Lighthouse_Map_V1.png/revision/latest?cb=20251231170812";
        wikiLink = "https://escapefromtarkov.fandom.com/wiki/Lighthouse";
        break;

      case "reserve":
        mapLink =
          "https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/3/38/Re3mrReserveCardinalNorthWikiVer.jpg/revision/latest?cb=20260113163242";
        wikiLink = "https://escapefromtarkov.fandom.com/wiki/Reserve";
        break;

      case "shoreline":
      case "sl":
        mapLink =
          "https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/1/17/Shoreline2DMapByMonkiUpdatedByJindouz.png/revision/latest?cb=20260123072630";
        wikiLink = "https://escapefromtarkov.fandom.com/wiki/Shoreline";
        break;

      case "street":
      case "streets":
      case "streets of tarkov":
        mapLink =
          "https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/7/71/StreetsOfTarkov2DMapByJindouz.png/revision/latest?cb=20260120064230";
        wikiLink = "https://escapefromtarkov.fandom.com/wiki/Streets_of_Tarkov";
        break;

      case "terminal":
        mapLink =
          "https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/5/58/Terminal2DMapByRE3MR.jpg/revision/latest?cb=20260125151206";
        wikiLink = "https://escapefromtarkov.fandom.com/wiki/Terminal";
        break;

      case "lab":
      case "labs":
      case "the lab":
        mapLink =
          "https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/0/0b/TheLabMapFull.png/revision/latest?cb=20181225202712";
        wikiLink = "https://escapefromtarkov.fandom.com/wiki/The_Lab";
        break;

      case "the labyrinth":
      case "labyrinth":
      case "tl":
        mapLink =
          "https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/0/0b/TheLabMapFull.png/revision/latest?cb=20181225202712";
        wikiLink = "https://escapefromtarkov.fandom.com/wiki/The_Labyrinth";
        break;

      default:
        interaction.reply({
          content: `I couldn't find a location called *${map}*`,
          flags: "Ephemeral"
        });
        return;
    }

    const deleteBtn = new ButtonBuilder()
      .setCustomId("delete-map")
      .setStyle(ButtonStyle.Danger)
      .setLabel(`Remove map`);

    const openInBrowserBtn = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setLabel(`Open map`)
      .setURL(mapLink);

    const openWikiBtn = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setLabel(`Open wiki page`)
      .setURL(wikiLink);

    const row = new ActionRowBuilder().addComponents(
      deleteBtn,
      openWikiBtn,
      openInBrowserBtn
    );

    await interaction.reply({
      embeds: [createMapEmbed(mapLink)],
      //@ts-ignore
      components: [row]
    });
  }
};
