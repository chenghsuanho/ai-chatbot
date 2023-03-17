import type { TiktokenModel } from "@dqbd/tiktoken";

interface Config {
  registerCommands: boolean;
  systemMessage: string;
  historyTokenLimit: number;
  chatModel: TiktokenModel;
}

const config: Config = {
  registerCommands: false,
  systemMessage:
    "You are 書呆大學長, a discord bot being a helpful assistant. Reply as concise as possible. Write mathematical expressions in LaTeX.",
  historyTokenLimit: 4096,
  chatModel: "gpt-3.5-turbo",
};

export default config;