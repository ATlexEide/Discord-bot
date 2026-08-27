import { Guild } from "discord.js";
import {
  membersCache,
  membersCache_lastUpdate,
  updateCache
} from "../server.js";
import { error } from "node:console";
import { globalErrorHandler } from "../../main.js";

export async function fetchMembers(guild: Guild | undefined) {
  if (guild === undefined) return { error: "no yippie" };
  console.log("membersCache: ", membersCache);

  const date = new Date();
  date.setDate(membersCache_lastUpdate.getDate() + 1);

  console.log(date);
  console.log(membersCache_lastUpdate);

  console.log(membersCache_lastUpdate < date);
  const hasCache =
    membersCache.length && membersCache_lastUpdate < date ? true : false;

  console.log("hasCache: ", hasCache);

  const members: any = hasCache
    ? membersCache
    : await guild.members
        .fetch()
        .then((res) =>
          res
            .filter((element) => !element.user.bot)
            .map((element) => {
              if (element.user.bot) return false;
              return {
                name: element.displayName,
                avatar: element.user.displayAvatarURL()
              };
            })
        )
        .catch((error) => globalErrorHandler(error));
  updateCache(members);
  console.log("members: ", members);

  return membersCache;
}
