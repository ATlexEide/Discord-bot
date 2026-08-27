import { QueryError, QueryResult } from "mysql2";
import mysql from "mysql2";

export async function getChannel(gameData: any) {
  console.log("//////////", "STEP 2:", "Calling getChannelOut", "//////////");
  console.log(getChannelOut(gameData));
}

// TYPE: chat || log || whitelist
export function TESTgetChannelOut(gameData: any) {
  try {
    const db = mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });
    let result;
    db.query(
      `SELECT ${gameData.eventType}_channel_id FROM guilds WHERE guildId = ${gameData.guild_id}`,
      (err, res: QueryResult) => {
        if (err) {
          console.error(err);
          return;
        }
        // @ts-expect-error
        result = Object.values(res[0])[0];

        return result;
      }
    );
  } catch (err) {
    console.log(err);
  }
}
// TYPE: chat || log || whitelist
export function getChannelOut(gameData: any) {
  try {
    // TODO: Fix
    // @ts-expect-error
    const [r, f] = db.query(
      `SELECT ${gameData.eventType}_channel_id FROM guilds WHERE guildId = ${gameData.guild_id}`,
      (err: QueryError, res: QueryResult) => {
        if (err) {
          console.error(err);
          return;
        }
        // @ts-expect-error
        if (!res[0]) {
          console.error(
            `couldnt find chat channel for guild id ${gameData.guild_id}`
          );
        }

        console.log("channel");
        // @ts-expect-error
        return Object.values(res[0])[0];
      }
    );
  } catch (err) {
    console.log(err);
  }
}
