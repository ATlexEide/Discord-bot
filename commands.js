
export const commands = [
 {
    name: 'ping',
    description: 'Replies with Pong!',
    response: async (interaction) => await interaction.reply('Pong!'),
  },
  { 
    name: 'radiocheck',
    description: 'Replies with Lima charlie!',
    response: async (interaction) => await interaction.reply('Lima charlie'),
  },
  { 
    name: 'date',
    description: 'Replies with the time!',
    response: async (interaction) => {
      const date = new Date();
      await interaction.reply(`It is now ${date}`)
    },
  },
];