"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLaMA = void 0;
const axios_1 = __importDefault(require("axios"));
const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
};
class LLaMA {
    constructor(httpClient = axios_1.default.create({
        baseURL: process.env.LLAMA_API_URL,
        headers: DEFAULT_HEADERS,
    })) {
        this.httpClient = httpClient;
    }
    async getCompletion(prompt) {
        const { data } = await this.httpClient.post('/run-inference-1', { prompt });
        return data;
    }
}
exports.LLaMA = LLaMA;
