const { SlashCommandBuilder } = require("@discordjs/builders");
const allowedUserIds = ["341840818954305536", "478465863285211167"];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sendtochannel")
    .setDescription("Send a message to a specific channel")
    .addStringOption((option) =>
      option
        .setName("channel_id")
        .setDescription("Target channel ID")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message_content")
        .setDescription("Content of the message")
        .setRequired(true)
    ),
  async execute(interaction) {
    if (!allowedUserIds.includes(interaction.user.id)) {
      return interaction.reply({
        content: "You lack permission to do this..",
        ephemeral: true,
      });
    }

    const channelId = interaction.options.getString("channel_id");
    const messageContent = interaction.options.getString("message_content");
    const targetChannel = await interaction.client.channels.fetch(channelId);

    await targetChannel.send(messageContent);
    await interaction.reply({
      content: "bernard has spread your word",
      ephemeral: true,
    });
  },
};
