import("node-fetch")
  .then(async (module) => {
    const fetch = module.default;
    const { Client, GatewayIntentBits, ActivityType } = require("discord.js");
    const { REST } = require("@discordjs/rest");
    const { Routes } = require("discord-api-types/v9");
    const fs = require("fs");
    const allowedRoles = ["1188460178639683684"]; 
    const pollKeyword = "vote";
    const reactions = ["✅", "🟨", "❌"];
    const nerdemoji = ["🤓"];
    const cooldownInterval = 3000000;
    const cooldowns = new Map();
        const responses = new Map([
      ["trigger", "response"],
    ]);

    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
    client.on("messageCreate", async (message) => {
      if (message.content.toLowerCase().includes("actually")) {
        try {
          for (const reaction of nerdemoji) {
            await message.react(reaction);
          }
        } catch (error) {
          console.error("Error adding nerdemoji:", error);
        }
      }
    });

    client.on("messageCreate", async (message) => {
      const lowerCaseContent = message.content.toLowerCase();
      if (
        lowerCaseContent.includes(pollKeyword) &&
        allowedRoles.some((roleId) => message.member.roles.cache.has(roleId))
      ) {
        try {
          for (const reaction of reactions) {
            await message.react(reaction);
          }
        } catch (error) {
          console.error("Error adding reaction:", error);
        }
      }
    });

    client.on("messageCreate", async (message) => {
      const lowerCaseContent = message.content.toLowerCase();

      for (const [trigger, response] of responses.entries()) {
        const cooldown = cooldowns.get(message.author.id);
        const now = Date.now();

        if (cooldown && now - cooldown < cooldownInterval) {
          console.log(
            `${message.author.username} is on cooldown for ${trigger}`
          );
          return;
        }

        const regex = new RegExp(`\\b${trigger}\\b`, "g");
        if (regex.test(lowerCaseContent)) {
          message.channel.send(response);
          cooldowns.set(message.author.id, now);
          setTimeout(
            () => cooldowns.delete(message.author.id),
            cooldownInterval
          );
          break;
        }
      }
    });

    client.commands = new Map();

    const commandsFolder = "./commands";
    const commandFiles = fs
      .readdirSync(commandsFolder)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      client.commands.set(command.data.name, command);
    }

    const { token, clientId, guildId } = require("./config.json");
    const commands = Array.from(client.commands.values()).map((command) =>
      command.data.toJSON()
    );

    const rest = new REST({ version: "9" }).setToken(token);
    const sendToChannelCommand = require("./commands/channelmsg");
    client.commands.set(sendToChannelCommand.data.name, sendToChannelCommand);

    let totalPlayers = 0;
    let totalPing = 0;
    let totalFPS = 0;

    async function updateStatus() {
      try {
        const response = await fetch(
          "https://games.roblox.com/v1/games/4572543057/servers/0?sortOrder=2&excludeFullGames=false"
        );
        const data = await response.json();

        const servers = data.data || [];

        if (servers.length > 0) {
          const firstServer = servers[0];
          const totalPlayers = firstServer.playing || 0;
          const totalFPS = firstServer.fps || 0;
          const totalPing = firstServer.ping || 0;
          const formattedTotalFPS = totalFPS.toFixed(0);

          const playingStatus = `${totalPlayers} | Ping ${totalPing} | FPS ${formattedTotalFPS}`;

          console.log("Setting activity:", playingStatus);

          if (client.user) {
            let newStatus;
            if (totalPlayers < 40) {
              newStatus = "online";
            } else if (totalPlayers < 65) {
              newStatus = "idle";
            } else {
              newStatus = "dnd";
            }
            client.user.setPresence({
              activities: [
                { name: playingStatus, type: ActivityType.Streaming },
              ],
              status: newStatus,
            });
          } else {
            console.error("client.user N/A");
          }
        } else {
          console.log("No servers found.");
        }
      } catch (error) {
        console.error("Failed to fetch API data:", error);
      }
    }
    client.once("ready", async () => {
      try {
        console.log("Bernard is live.");

        console.log("Updating...");
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
          body: commands,
        });
        console.log("Success!");

        await updateStatus();
        setInterval(updateStatus, 60000);
      } catch (error) {
        console.error(error);
      }
    });

    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;
      const { commandName } = interaction;
      if (!client.commands.has(commandName)) return;
      try {
        await client.commands.get(commandName).execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    });

    client.login(token);
  })
  .catch((error) => {
    console.error("Error loading node-fetch:", error);
  });
