import axios from "axios"
import { useOpenaiStorage } from "../storages/openai.js"

const config = useOpenaiStorage().config

export const getModels = async () => {
  try {
    const res = await axios.get(`${config.apiUrl}/models`, {},
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${config.apiKey}`
        }
      }
    )
    return res.data
  } catch (e) {
    console.error(String(e).slice(0, 100))
    return false
  }
}
