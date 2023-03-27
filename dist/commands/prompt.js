"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptCommand = void 0;
const discord_js_1 = require("discord.js");
const client_1 = require("@/llama/client");
const logger_1 = require("@/shared/logger");
const decorators_1 = require("@/utils/decorators");
class PromptCommand {
    constructor() {
        this.llama = new client_1.LLaMA();
        this.data = new discord_js_1.SlashCommandBuilder()
            .setName('prompt')
            .setDescription('Prompt the model for a response')
            .addStringOption((option) => option
            .setName('question')
            .setDescription('The message to prompt the model with')
            .setRequired(true));
    }
    async execute(interaction) {
        await interaction.deferReply();
        try {
            const user = interaction.user;
            const option = interaction.options.get('question', true);
            const question = option.value;
            logger_1.logger.info(`User ${user.username} asked: ${question}`);
            const start = Date.now();
            const data = await this.llama.getCompletion(question);
            const end = Date.now();
            const answer = `🤔 Question: ${question}\n\n🤖 Answer: ${data.completion}\n\n<@${user.id}>`;
            await interaction.editReply({
                content: answer,
            });
            logger_1.logger.info(`Answered in ${end - start}ms`);
        }
        catch (err) {
            logger_1.logger.error(err);
            await interaction.editReply('Something went wrong!');
        }
    }
}
__decorate([
    (0, decorators_1.Measure)({ async: true })
], PromptCommand.prototype, "execute", null);
exports.PromptCommand = PromptCommand;
