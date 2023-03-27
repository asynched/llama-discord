import { CacheType, CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { LLaMA } from '@/llama/client'
import { logger } from '@/shared/logger'
import { Measure } from '@/utils/decorators'
import { Command } from '@/commands/traits'

export class PromptCommand implements Command {
  data: SlashCommandBuilder
  private llama: LLaMA

  constructor() {
    this.llama = new LLaMA()
    this.data = new SlashCommandBuilder()
      .setName('prompt')
      .setDescription('Prompt the model for a response')
      .addStringOption((option) =>
        option
          .setName('question')
          .setDescription('The message to prompt the model with')
          .setRequired(true)
      ) as SlashCommandBuilder
  }

  @Measure({ async: true })
  async execute(interaction: CommandInteraction<CacheType>) {
    await interaction.deferReply()

    try {
      const user = interaction.user
      const option = interaction.options.get('question', true)
      const question = option.value as string

      logger.info(`User ${user.username} asked: ${question}`)

      const start = Date.now()
      const data = await this.llama.getCompletion(question)
      const end = Date.now()

      const answer = `🤔 Question: ${question}\n\n🤖 Answer: ${data.completion}\n\n<@${user.id}>`

      await interaction.editReply({
        content: answer,
      })

      logger.info(`Answered in ${end - start}ms`)
    } catch (err) {
      logger.error(err)
      await interaction.editReply('Something went wrong!')
    }
  }
}
