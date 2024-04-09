const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commands")
    .setDescription("Displays detailed information about Bernard's commands."),
  async execute(interaction) {
    try {
      await interaction.reply({
        embeds: [
          {
            author: {
              name: "bernard's data store",
              icon_url:
                "https://media.discordapp.net/attachments/957895040116596819/1215435294434656286/a4a61d82180136ae564d5ff58fe414d9.png?ex=65fcbd53&is=65ea4853&hm=75e8d4a33b55e0ca87bf140784a0e446947ba82646149dc2664fe88688eec123&=&format=webp&quality=lossless",
            },
            title: "Bernard's Commands",
            description:
              "Detailed list describing Bernard's commands and how to use them",
            fields: [
              {
                name: "**b  /fetchid [Username]** *│*Roblox Username",
                value: "Returns the Roblox User ID from the username given.",
              },
              {
                name: "**b  /find [UserID]** *│*Roblox User ID",
                value: "Returns all pathos related relevant groups.",
              },
              {
                name: "**b  /goi**",
                value:
                  "Returns pathos affiliated enemy groups, and their subdivisions of the given user.",
              },
              {
                name: "**b  /revamp**",
                value: "Returns Area-27 groups user is in.",
              },
              {
                name: "**b  /sendtochannel [Channel ID] │ [Message Content]**",
                value:
                  "Bernard sends the input as a message to the specified Channel ID.\n*Access given only by Xek and d2*",
              },
              {
                name: "**b  /bernflip │ Coinflip..?**",
                value:
                  "Bernard flips a coin, returns either Heads, Tails, or has a 2% chance of landing sideways.",
              },
              {
                name: "**b  /raffle bernard bob mary michael**",
                value: "Bernard dropkicks one person from the selected users.",
              },
              {
                name: "**b  /nerdify [@Human] │ [Duration] **",
                value: "Bernard nerd reacts the victim for set duration.",
              },
              {
                name: "**b  /commands**",
                value: "This command you dumbo...",
              },
            ],
            thumbnail: {
              url: "https://media.discordapp.net/attachments/957895040116596819/1215434889709486140/hit1.png?ex=65fcbcf3&is=65ea47f3&hm=b21a9277435ad07dd58c0163f99cea4e09c16b1872e618b026ed0725fe261d10&=&format=webp&quality=lossless",
            },
            color: parseInt("000000", 16),
            footer: {
              text: "hit_db",
              icon_url:
                "https://media.discordapp.net/attachments/957895040116596819/1215427357230239794/hit.png?ex=65fcb5ef&is=65ea40ef&hm=a75ef1a350d0555584bed5599ee002f1ccea50ea62dec42485094cc9cde7793b&=&format=webp&quality=lossless&width=360&height=360",
            },
            timestamp: new Date().toISOString(),
          },
        ],
      });
    } catch (error) {
      console.error("Error executing:", error);
      await interaction.reply("bernard broke!");
    }
  },
};
