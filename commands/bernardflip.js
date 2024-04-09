const { SlashCommandBuilder } = require("@discordjs/builders");

function coinflip() {
  const randomValue = Math.random();

  if (randomValue < 0.48) {
    return "Heads";
  } else if (randomValue < 0.96) {
    return "Tails";
  } else {
    return "The coin went into the atmosphere";
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bernflip")
    .setDescription("bernard flips it for you [H:49%, T:49%, S:2%]"),
  async execute(interaction) {
    const result = coinflip();
    await interaction.reply({ content: result });
  },
};
