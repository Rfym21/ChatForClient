import OpenAI from 'openai'
import { useOpenaiStorage } from '../storages/openai'

const openaiStore = useOpenaiStorage()
const config = openaiStore.config
const state = openaiStore.state
const client = new OpenAI({
  baseURL: config.baseUrl,
  apiKey: config.apiKey,
})

async function chatNoStream(messages) {
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
        model: state.model,
        stream: false,
        max_tokens: state.max_tokens,
        temperature: state.temperature
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

const chatStream = async (messages) => {
  if (messages === undefined || messages === null) {
    return false
  }
  if (!Array.isArray(messages) && typeof messages === 'object') {
    messages = [messages]
  }

  let result = ''

  const stream = await client.chat.completions.create({
    model: state.model,
    messages: messages,
    stream: true,
    max_tokens: state.max_tokens,
    temperature: state.temperature
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

