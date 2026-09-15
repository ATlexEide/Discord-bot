export function getChatEmbed(event: any) {
  console.log(event.player.includes("§"));
  console.log(typeof event.player);
  // console.log(removeColorCode(event.player));
  // const username = event.player.includes("§")
  //   ? removeColorCode(event.player)
  //   : event.player;

  const username = event.player;
  const date = new Date();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `[${hours}:${minutes}]  <${username}>  ${event.message}`;
}

function removeColorCode(name: any) {
  let regex = /§(.)/g;
  return name.replace(regex, "");
}
