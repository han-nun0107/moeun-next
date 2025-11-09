const maskingUserId = (userId: string) => {
  return userId.slice(0, 3) + '*'.repeat(Math.max(0, userId.length - 3))
}

export default maskingUserId
