import { QueryResult } from "mysql2";
import { db } from "../main.js";

export async function getChannel(gameData: any) {
  console.log("//////////", "STEP 2:", "Calling getChannelOut", "//////////");
  console.log(getChannelOut(gameData));
}

// TYPE: chat || log || whitelist
export function TESTgetChannelOut(gameData: any) {
  try {
    let result;
    db.query(
      `SELECT ${gameData.eventType}_channel_id FROM guilds WHERE guildId = ${gameData.guild_id}`,
      (err, res: QueryResult) => {
        if (err) {
          console.error(err);
          return;
        }
        result = Object.values(res[0])[0];

        return result;
      }
    );
  } catch (err) {
    console.log(err);
  }
}
// // TYPE: chat || log || whitelist
// export function getChannelOut(gameData: any) {
//   try {
//     const [r, f] = db.query(
//       `SELECT ${gameData.eventType}_channel_id FROM guilds WHERE guildId = ${gameData.guild_id}`,
//       (err, res: QueryResult) => {
//         if (err) {
//           console.error(err);
//           return;
//         }
//         // @ts-expect-error
//         if (!res[0]) {
//           console.error(
//             `couldnt find chat channel for guild id ${gameData.guild_id}`
//           );
//         }
//         // @ts-expect-error
//         //   console.log(Object.values(res[0])[0]);
//         // @ts-expect-error
//         console.log("channel");
//         return Object.values(res[0])[0];
//       }
//     );
//   } catch (err) {
//     console.log(err);
//   }
// }
