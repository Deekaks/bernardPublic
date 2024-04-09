const {
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require("@discordjs/builders");
const { MessageReaction, User } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nerdify")
    .setDescription("bernard nerds this user!")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user to nerd")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("duration")
        .setDescription("Duration to nerdify the user (in seconds)")
        .setRequired(true)
    ),

  async execute(interaction) {
    try {
      const resolvedDuration = await getDuration(interaction);
      console.log("Retrieved duration:", resolvedDuration);

      const targetUser = interaction.options.getUser("target");
      const emoji = "🤓";
      const requiredRoleId = "1188460178639683684";

      if (!interaction.member.roles.cache.has(requiredRoleId)) {
        return await interaction.reply({
          content: "you aint got bernards premium subscription",
          ephemeral: true,
        });
      }

      try {
        const reactionHandler = (message) => {
          if (message.author.id === targetUser.id) {
            message.react(emoji);
          }
        };

        interaction.client.on("messageCreate", reactionHandler);
        await interaction.reply({
          content: `nerding ${targetUser} for ${
            resolvedDuration / 1000
          } seconds`,
          ephemeral: true,
        });

        setTimeout(() => {
          interaction.client.off("messageCreate", reactionHandler);
        }, resolvedDuration);
      } catch (error) {
        console.error("Error nerding user:", error);
        await interaction.reply({
          content: "Failed to nerd user!",
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error("Error getting duration:", error);
      await interaction.reply({
        content: "Invalid duration entered!",
        ephemeral: true,
      });
    }
  },
};
const getDuration = (interaction) => {
  return new Promise((resolve, reject) => {
    console.log("Interaction options:", interaction.options);
    const durationOption = interaction.options.getInteger("duration");
    console.log("Duration option:", durationOption);
    if (!durationOption) {
      reject(new Error("Please enter a duration!"));
    } else if (isNaN(durationOption)) {
      reject(new Error("Invalid duration input!"));
    } else {
      resolve(Math.floor(durationOption * 1000));
    }
  });
};
