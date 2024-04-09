const { SlashCommandBuilder } = require("@discordjs/builders");
const axios = require("axios");
const fs = require("fs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("revamp")
    .setDescription("bernard's group finder for Area 27")
    .addIntegerOption((option) =>
      option
        .setName("user_id")
        .setDescription("The user ID to fetch data for")
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const userId = interaction.options.getInteger("user_id");
      if (isNaN(userId)) {
        await interaction.reply('A user ID should be like this: "56826178"');
        return;
      }

      const apiUrl = `https://groups.roblox.com/v2/users/${userId}/groups/roles?includeLocked=true`;
      const apiThumbnail = `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=false`;

      const response = await axios.get(apiUrl);
      const imgResponse = await axios.get(apiThumbnail);
      const data = response.data;
      const targetGroupIds = [
        2760782, 15077415, 14389513, 11285998, 4267627, 4095963, 7809854,
        4095977, 4095973, 4095951, 4095954, 4095958, 4095960, 4096130, 4095949,
        4095944, 4095947, 33954928, 33954913, 33954921, 33960983, 9726189,
        9726211, 9726215, 9726229, 12669464, 5774192, 5255365, 5038735,
        10175681, 5615447, 5615445, 17210923, 5215824, 13819146,
      ];

      const groupInfo = data.data
        .filter(({ group }) => targetGroupIds.includes(group.id))
        .map(({ group, role }) => ({
          groupName: group.name,
          roleId: role.id,
          roleName: role.name,
          rank: role.rank,
        }));
      if (imgResponse.status === 200 && imgResponse.data.data.length > 0) {
      } else {
        console.error("Error fetching avatar or no avatar found");
      }
      const avatarUrl = imgResponse.data.data[0].imageUrl;

      if (groupInfo.length === 0) {
        await interaction.reply(`User ${userId} is not in any relevant group.`);
      } else {
        const formattedInfo = groupInfo
          .map((info) => `**${info.groupName}**,  ${info.roleName}`)
          .join("\n\n");

        await interaction.reply({
          embeds: [
            {
              author: {
                name: "bernard's data store",
                icon_url:
                  "https://media.discordapp.net/attachments/957895040116596819/1215435294434656286/a4a61d82180136ae564d5ff58fe414d9.png?ex=65fcbd53&is=65ea4853&hm=75e8d4a33b55e0ca87bf140784a0e446947ba82646149dc2664fe88688eec123&=&format=webp&quality=lossless",
                url: `https://www.roblox.com/users/${userId}/profile`,
              },
              title: `${userId}`,
              url: `https://www.roblox.com/users/${userId}/profile`,
              description: "```\nBernard has gathered the following:\n```",
              fields: [
                ...groupInfo.map(({ groupName, roleName }) => ({
                  name: `**${groupName}\n**`,
                  value: `*${roleName}*`,
                  inline: false,
                })),
              ],
              thumbnail: {
                url: `${avatarUrl}`,
              },
              color: parseInt("FFFFF7", 16),
              footer: {
                text: "hit_db",
                icon_url:
                  "https://media.discordapp.net/attachments/957895040116596819/1215427357230239794/hit.png?ex=65fcb5ef&is=65ea40ef&hm=a75ef1a350d0555584bed5599ee002f1ccea50ea62dec42485094cc9cde7793b&=&format=webp&quality=lossless&width=360&height=360",
              },
              timestamp: new Date(),
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error fetching data from API:", error);
      await interaction.reply(
        `Error fetching data from API. Error details: ${error.message}`
      );
    }
  },
};
