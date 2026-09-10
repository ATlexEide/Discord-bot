import { dbClient, globalErrorHandler } from "../main.js";

export async function getChannelId(EventData: any) {
  if (dbClient.closed) dbClient.reconnect();
  const id = await dbClient
    .execute(
      `SELECT ${EventData.channel_type}_channel_id from guild_channels WHERE guild_id = ${EventData.guildId}`
    )
    .then((res) => res.rows[0][0])
    .catch((e) => globalErrorHandler(e));
  return id;
}
