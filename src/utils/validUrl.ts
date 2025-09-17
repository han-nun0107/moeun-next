const isValidUrl = (url: string): boolean => {
  if (url.startsWith('/') || url.startsWith('data:')) {
    return true
  }
  try {
    new URL(url)
    return url.startsWith('http')
  } catch {
    return false
  }
}

export default isValidUrl
