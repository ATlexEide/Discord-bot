import { client, globalErrorHandler } from "../main.js";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  MessageFlags,
  PermissionFlagsBits
} from "discord.js";

const name: string = "setlogchannel";
export default {
  name,
  data: new SlashCommandBuilder()
    .setName(name)
    .setDescription("Sets this channel as the minecraft log channel"),

  async response(interaction: ChatInputCommandInteraction) {
    if (!interaction.guildId) {
      interaction.reply({
        content: "Failed to set log channel, no guild id",
        flags: MessageFlags.Ephemeral
      });
      return;
    }
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });
    connection.connect();

    const user = await interaction.guild?.members.fetch(interaction.user.id);
    const userRoles = user?.roles.cache;

    if (!user) return;
    if (!userRoles) return;

    const hasMcAdmin = userRoles.get("1542467267500183552");

    if (!hasMcAdmin) {
      await interaction.reply({
        content: "You must be an mc admin to perform this action.",
        flags: MessageFlags.Ephemeral
      });
      return;
    }

    //////
    try {
      const [res] = await connection.query(
        `SELECT guildId FROM guilds WHERE guildId = ${interaction.guildId}`
      );

      // @ts-ignore
      console.log("RESULT YIPPIEEEE", res[0]);

      // @ts-ignore
      if (!res[0]) {
        console.log("DID NOT FIND GUILD\nCreating record...");

        const [res2] = await connection.query(`
          INSERT INTO guilds (guildId, log_channel_id)
          VALUES (${interaction.guildId}, ${interaction.channelId})
          `);

        console.log("RESS2222", res2);
        console.log("Created record: \n", res2);
      } else {
        console.log("FOUND GUILD");

        const [res3] = await connection.query(`
            UPDATE guilds
            SET log_channel_id = ${interaction.channelId}
            WHERE guildId = ${interaction.guildId}
            `);
        console.log("Updated record: \n", res3);
      }

      const guild = client.guilds.cache.get(interaction.guildId);
      const channel = guild?.channels.cache.get(interaction.channelId);
      channel?.edit({ topic: "Minecraft log channel" });

      interaction.reply({
        content: "Set this channel as the minecraft log channel",
        flags: MessageFlags.Ephemeral
      });
    } catch (error) {
      globalErrorHandler(error);
    }

    connection.end();
  }
};
