const isValidUrl = (url: string): boolean => {
  try {
    if (url.startsWith('data:')) return true

    new URL(url)
    return url.startsWith('http') || url.startsWith('/')
  } catch {
    return false
  }
}

export default isValidUrl
