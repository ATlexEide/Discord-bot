import { client, dbClient, globalErrorHandler } from "../main.js";
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
    if (dbClient.closed) dbClient.reconnect();
    const result = await dbClient.execute(
      `SELECT guild_id FROM guild_channels WHERE guild_id = ${interaction.guildId}`
    );

    async function previousReply() {
      return await interaction.fetchReply().then((res) => {
        console.log(res.content.replace(/\~/g, "").replace(/\./g, ""));
        return res.content.replace(/\~/g, "").replace(/\./g, "");
      });
    }
    // @ts-ignore
    if (!result.rows) {
      interaction.editReply({
        content: `~~${await previousReply()}~~\nGuild not found, creating record. . .`
      });

      const result = await dbClient.execute(`
          INSERT INTO guild_channels (guild_id, ${type}_channel_id)
          VALUES (${interaction.guildId}, ${interaction.channelId})
          `);

      if (!result) {
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

      const result = await dbClient.execute(`
            UPDATE guild_channels
            SET ${type}_channel_id = ${interaction.channelId}
            WHERE guild_id = ${interaction.guildId}
            `);

      if (!result) {
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
    interaction.editReply({
      content: `Action failed `
    });
    globalErrorHandler(error);
  }

  dbClient.close();
}
