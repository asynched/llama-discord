import { CacheType, CommandInteraction, SlashCommandBuilder } from 'discord.js'
import { LLaMA } from '@/llama/client'
import { logger } from '@/shared/logger'
import { Measure } from '@/utils/decorators'
import { Command } from '@/commands/traits'

const funnyMessages: Record<string, string> = {
  // L2
  '571831426861760522': '(Apaixonado em Rust 🦀)',
  '755502859021189241': '(Apaixonado em Rust 🦀)',
  // L3
  '844280610989539400': 'tá vendo esses 4 dedos aqui? 🤚',
  '584026784757055496': 'tá vendo esses 4 dedos aqui? 🤚',
  // Template
  '811681505532444683': '(Comprou Diablo na pré-venda 🤡)',
  // Alê
  '844280142586576907': '(Rouba boné no Energia 🧢)',
  // Mitch
  '844279742122557480': 'AH NÃO MEU! 🤯',
  '1029383001123078174': 'AH NÃO MEU! 🤯',
  // Matheus
  '334464322619179031': 'Chegou o sadboy 🥺',
  // Eder
  '484713335980294145': '(Programa em Go 🐹)',
}

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

      logger.info(`Request took ${end - start}ms`)

      let answer: string = `🤔 Question: ${question}\n\n🦙 Answer: ${data.completion}\n\n<@${user.id}>`

      if (user.id in funnyMessages) {
        answer += ` ${funnyMessages[user.id]}`
      }

      await interaction.editReply({
        content: answer,
      })
    } catch (err) {
      logger.error(err)
      await interaction.editReply('Oh shoot! Something went wrong. 🦙')
    }
  }
}
