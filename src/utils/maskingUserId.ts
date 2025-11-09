const maskingUserId = (userId: string) => {
  if (userId.length <= 1) {
    return userId
  }
  if (userId.length <= 3) {
    return userId[0] + '*'.repeat(userId.length - 1)
  }
  return userId.slice(0, 2) + '*'.repeat(userId.length - 2)
}

export default maskingUserId
