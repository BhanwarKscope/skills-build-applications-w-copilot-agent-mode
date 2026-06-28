const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : '/api'

export const getApiUrl = (component) => `${API_BASE_URL}/${component}/`

export const normalizeResponseItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.docs)) {
    return payload.docs
  }

  return []
}

export const fetchApiItems = async (component) => {
  const response = await fetch(getApiUrl(component))

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return normalizeResponseItems(await response.json())
}