
export const commands = [
 {
    name: 'ping',
    description: 'Replies with Pong!',
    response:  (interaction) =>  interaction.reply('Pong!'),
  },
  { 
    name: 'radiocheck',
    description: 'Replies with Lima charlie!',
    response:  (interaction) =>  interaction.reply('Lima charlie'),
  },
  { 
    name: 'date',
    description: 'Replies with the time!',
    response:  (interaction) => {
      const date = new Date();
      interaction.reply(`It is now ${date}`)
    },
  },
  { 
    name: 'oppai',
    description: 'Cave...',
    response: (interaction) =>{
        interaction.reply(`:regional_indicator_b: :a: :regional_indicator_n: `)
        interaction.user.send(':regional_indicator_b: :a: :regional_indicator_n:')
      },
  },
];