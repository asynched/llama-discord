"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const commands_1 = require("@/commands");
const logger_1 = require("@/shared/logger");
const client = new discord_js_1.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds],
});
client.once('ready', () => logger_1.logger.info('Bot is ready.'));
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    if (interaction.commandName === commands_1.promptCommand.data.name) {
        return await commands_1.promptCommand.execute(interaction);
    }
    await interaction.reply({
        content: 'The command you are trying to execute does not exist',
        ephemeral: true,
    });
});
async function main() {
    logger_1.logger.info('Trying to login into discord');
    await client.login(process.env.DISCORD_APPLICATION_TOKEN);
    logger_1.logger.info('Logged in successfully');
    const rest = new discord_js_1.REST({ version: '10' }).setToken(process.env.DISCORD_APPLICATION_TOKEN);
    logger_1.logger.info('Trying to register slash commands');
    await rest.put(discord_js_1.Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
        body: [commands_1.promptCommand.data.toJSON()],
    });
    logger_1.logger.info('Registered slash commands successfully');
}
main();
