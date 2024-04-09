const { SlashCommandBuilder } = require("@discordjs/builders");
const usernameRegex = /^(<@!|@)?[0-9]{17,}$|^[\w\-]{2,32}$/;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("raffle")
    .setDescription("bernard dropkicks one of them")
    .addStringOption((option) =>
      option
        .setName("participants")
        .setDescription('ie. "bernard bob mary michael"')
        .setRequired(true)
    ),
  async execute(interaction) {
    const participantsString = interaction.options.getString("participants");
    const participants = [];
    const usernames = participantsString
      .split(" ")
      .map((username) => username.trim());

    for (const username of usernames) {
      if (!usernameRegex.test(username)) {
        return await interaction.reply({
          content: `Invalid username: ${username}. use the abc's`,
          ephemeral: true,
        });
      }
    }

    const mentionedUsers = usernames.filter(
      (username) => username.startsWith("<@") || username.startsWith("@")
    );
    const mentionedUserIDs = mentionedUsers.map((mention) =>
      mention.replace(/[<@!>]/g, "")
    );
    const mentionedUsernames = mentionedUserIDs.map(
      (userId) => interaction.guild.members.cache.get(userId)?.user.username
    );
    const allUsernames = [
      ...usernames.filter(
        (username) => !username.startsWith("<@") && !username.startsWith("@")
      ),
      ...mentionedUsernames,
    ];

    if (allUsernames.length < 2) {
      return await interaction.reply("add atleast 2 ppl bro");
    }

    const winnerIndex = Math.floor(Math.random() * allUsernames.length);
    const winnerUsername = allUsernames[winnerIndex];
    await interaction.reply(
      `Bernard chose.. **${winnerUsername}** to get dropkicked! :3`
    );
  },
};
