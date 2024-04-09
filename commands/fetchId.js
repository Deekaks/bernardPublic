const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fetchid')
    .setDescription('Finds the first result for a username.')
    .addStringOption((option) =>
      option.setName('keyword').setDescription(' - ').setRequired(true)
    ),
  async execute(interaction) {
    try {
      const keyword = interaction.options.getString('keyword');
      const apiUrl = `https://users.roblox.com/v1/users/search?keyword=${encodeURIComponent(keyword)}`;

      const response = await axios.get(apiUrl);
      const data = response.data;

      if (data.data && data.data.length > 0) {
        const firstUser = data.data[0];
        
        const userName = firstUser.name || 'N/A';
        const userId = firstUser.id || 'N/A';
        const isBanned = firstUser.isBanned || 'N/A';

        const formattedInfo = `**${userName}**\n\`\`\`${userId}\`\`\``;

        await interaction.reply(`\n${formattedInfo}`);
      } else {
        await interaction.reply('No users found with the specified keyword.');
      }
    } catch (error) {
      console.error('Error fetching data from API:', error);
      await interaction.reply(`Roblox API request is on cooldown.`);
    }
  },
};
