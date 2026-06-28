const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : '/api'

export const getApiUrl = (endpoint) => {
  const endpointPath = endpoint.startsWith('/api/') ? endpoint.replace('/api', '') : endpoint

  return `${API_BASE_URL}${endpointPath.startsWith('/') ? endpointPath : `/${endpointPath}/`}`
}

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

export const fetchApiItems = async (endpoint) => {
  const response = await fetch(getApiUrl(endpoint))

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  return normalizeResponseItems(await response.json())
}