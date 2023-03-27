import { Client, GatewayIntentBits, REST, Routes } from 'discord.js'
import { promptCommand } from '@/commands'
import { logger } from '@/shared/logger'

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
})

client.once('ready', () => logger.info('Bot is ready'))

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return
  }

  if (interaction.commandName === promptCommand.data.name) {
    return await promptCommand.execute(interaction)
  }

  await interaction.reply({
    content: 'The command you are trying to execute does not exist',
    ephemeral: true,
  })
})

async function main() {
  logger.info('Trying to login into discord')
  await client.login(process.env.DISCORD_APPLICATION_TOKEN)
  logger.info('Logged in successfully')

  const rest = new REST({ version: '10' }).setToken(
    process.env.DISCORD_APPLICATION_TOKEN
  )

  logger.info('Trying to register slash commands')
  await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT_ID), {
    body: [promptCommand.data.toJSON()],
  })
  logger.info('Registered slash commands successfully')
}

main()
