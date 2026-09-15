export function getChatEmbed(event: any) {
  if (event.player.includes("§")) event.player = removeColorCode(event.player);

  const date = new Date();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `[${hours}:${minutes}]  <${event.player}>  ${event.message}`;
}

function removeColorCode(name: any) {
  let regex = /§(.)/g;
  return name.replaceAll(regex, "");
}
