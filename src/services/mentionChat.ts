// Chat with the bot by mentioning.

import type { BaseMessageOptions, Message, Snowflake } from "discord.js";
import { chat, chatHistory } from "../chat";
import { hasMath, renderMessage } from "../render";

export function removeMention(id: Snowflake, content: string): string {
  const mentionPattern = new RegExp(String.raw`\s*<@!?(${id})>\s*`, "g");
  return content.replace(mentionPattern, "");
}

export default async function (message: Message) {
  const { client, author, mentions, content, channel, id } = message;

  if (!client.user) return;
  if (author.id == client.user.id) return; // Don't reply to self
  if (!mentions.has(client.user, { ignoreEveryone: true })) return;

  // The chat input is the message without the bot mention
  const chatMessage = removeMention(client.user.id, content);
  console.log(`Mention chat message: ${chatMessage}`);

  // Make the bot typing while we wait for the reply.
  await channel.sendTyping();
  const typing = setInterval(async () => {
    await channel.sendTyping();
  }, 10000);

  const reply = await chat(chatMessage, channel.id);
  
  const channelMessages = await channel.messages.fetch({ limit: 1 });
  const isLastMessage = channelMessages.last()?.id == id;
  const replyMethod = (content: string | BaseMessageOptions) =>
    isLastMessage ? channel.send(content) : message.reply(content);

  // If reply contains math, render the reply into image.
  let replyMessage;
  if (hasMath(reply)) {
    replyMessage = await replyMethod(await renderMessage(reply));
  } else {
    replyMessage = await replyMethod(reply);
  }
  clearInterval(typing);

  chatHistory.push(channel.id, [
    { id, role: "user", content },
    { id: replyMessage.id, role: "assistant", content: reply },
  ]);
}
