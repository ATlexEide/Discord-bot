import { client, globalErrorHandler } from "../main.js";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { ChatInputCommandInteraction, MessageFlags } from "discord.js";
dotenv.config();

export default async function setMcChannel(
  interaction: ChatInputCommandInteraction,
  type: string
) {
  interaction.reply({
    content: `Setting ${type} channel . . .`,
    flags: MessageFlags.Ephemeral
  });

  const ErrorMessage = {
    MISSING_GUILD_ID: `Failed to set ${type} channel, no guild id`,
    NOT_ADMIN: "You must be an mc admin to perform this action.",
    WHITELIST: "Failed to set whitelist channel, no guild id"
  };

  if (!interaction.guildId) {
    interaction.editReply({
      content: ErrorMessage.MISSING_GUILD_ID
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
    await interaction.editReply({
      content: ErrorMessage.NOT_ADMIN
    });
    return;
  }

  //////
  try {
    const [res] = await connection.query(
      `SELECT guildId FROM guilds WHERE guildId = ${interaction.guildId}`
      //   `SELECT guildId FROM guilds WHERE guildId = 222`
    );

    async function previousReply() {
      return await interaction.fetchReply().then((res) => {
        console.log(res.content.replace(/\~/g, "").replace(/\./g, ""));
        return res.content.replace(/\~/g, "").replace(/\./g, "");
      });
    }
    // @ts-ignore
    if (!res[0]) {
      interaction.editReply({
        content: `~~${await previousReply()}~~\nGuild not found, creating record. . .`
      });

      const [res2] = await connection.query(`
          INSERT INTO guilds (guildId, ${type}_channel_id)
          VALUES (${interaction.guildId}, ${interaction.channelId})
          `);

      if (!res2) {
        interaction.editReply({
          content: `~~${await previousReply()}~~ \n Creating record failed.`
        });
        return;
      } else {
        interaction.editReply({
          content: `~~${await previousReply()}~~ \n Created record.`
        });
      }
    } else {
      interaction.editReply({
        content: `~~${await previousReply()}~~ \n Guild found, updating ${type} channel. . .`
      });

      const [res3] = await connection.query(`
            UPDATE guilds
            SET ${type}_channel_id = ${interaction.channelId}
            WHERE guildId = ${interaction.guildId}
            `);

      if (!res3) {
        interaction.editReply({
          content: `~~${await previousReply()}~~ \n Update failed. `
        });
      } else {
        interaction.editReply({
          content: `~~${await previousReply()}~~ \n Update complete. `
        });
      }
    }

    const guild = client.guilds.cache.get(interaction.guildId);
    const channel = guild?.channels.cache.get(interaction.channelId);
    channel?.edit({ topic: `Minecraft ${type} channel` });
  } catch (error) {
    globalErrorHandler(error);
  }

  connection.end();
}
