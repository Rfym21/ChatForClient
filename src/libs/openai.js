import OpenAI from 'openai'
import { useOpenaiStorage } from '../storages/openai'

const openaiStore = useOpenaiStorage()
const config = openaiStore.config

const client = new OpenAI({
  baseURL: config.baseUrl,
  apiKey: config.apiKey,
})

async function chatNoStream(messages, model = "gpt-4o-mini", max_tokens = 8192, temperature = 1) {
  try {
    // 如果 messages 为 undefined 或 null，则返回 false
    if (messages === undefined || messages === null) {
      return false
    }

    // 如果 messages 不是数组，则处理为数组
    if (!Array.isArray(messages) && typeof messages === 'object') {
      messages = [messages]
    }

    const chatCompletion = await client.chat.completions.create(
      {
        messages: messages,
        model: model,
        stream: false,
        max_tokens: max_tokens,
        temperature: temperature
      }
    )
    if (!chatCompletion || !chatCompletion.choices) {
      return false
    }
    return chatCompletion.choices[0].message.content
  } catch (e) {
    return false
  }
}

const chatStream = async (messages, model = "gpt-4o-mini", max_tokens = 8192, temperature = 1) => {
  if (messages === undefined || messages === null) {
    return false
  }
  if (!Array.isArray(messages) && typeof messages === 'object') {
    messages = [messages]
  }

  let result = ''

  const stream = await client.chat.completions.create({
    model: model,
    messages: messages,
    stream: true,
    max_tokens: max_tokens,
    temperature: temperature
  })
  return Promise((resolve, reject) => {
    for await (const chunk of stream) {
      result += chunk.choices[0]?.delta?.content || ''
    }
    resolve(result)
  })
}

export {
  chatNoStream,
  chatStream
}

