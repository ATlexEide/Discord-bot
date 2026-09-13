import { Guild } from "discord.js";
import {
  membersCache,
  membersCache_lastUpdate,
  updateCache
} from "../server.js";

import { globalErrorHandler } from "../../main.js";

export async function fetchMembers(guild: Guild | undefined) {
  if (guild === undefined) return { error: "no yippie" };
  const date = new Date();
  date.setDate(membersCache_lastUpdate.getDate() + 1);

  const hasCache =
    membersCache.length && membersCache_lastUpdate < date ? true : false;

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

  return membersCache;
}
