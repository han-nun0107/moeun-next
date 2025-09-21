export const useTasteDisplay = (tasteData: {
  sweetness?: string
  acidity?: string
  body?: string
  carbonation?: string
  aroma?: string
  bitterness?: string
  confidence?: string
}) => {
const tasteInfo = {
  단맛: tasteData.sweetness ? tasteData.sweetness + '점' : undefined,
  신맛: tasteData.acidity ? tasteData.acidity + '점' : undefined,
  바디감: tasteData.body ? tasteData.body + '점' : undefined,
  탄산감: tasteData.carbonation ? tasteData.carbonation + '점' : undefined,
  향: tasteData.aroma ? tasteData.aroma + '점' : undefined,
  쓴맛: tasteData.bitterness ? tasteData.bitterness + '점' : undefined,
}

  const tasteInfoArray = Object.entries(tasteInfo)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key} ${value}`)

  const tasteDisplay = tasteInfoArray.join(', ')
  const confidenceDisplay = tasteData.confidence
    ? ` (신뢰도 ${tasteData.confidence}%)`
    : ''

  return {
    tasteDisplay,
    confidenceDisplay,
    fullTasteDisplay: tasteDisplay + confidenceDisplay,
  }
}
