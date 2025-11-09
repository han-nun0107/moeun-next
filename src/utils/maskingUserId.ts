const maskingUserId = (userId: string) => {
  return userId.slice(0, 3) + '*'.repeat(userId.length - 3)
}

export default maskingUserId
