export const capitalizeWords = (sentence: string): string => {
  const words = sentence.split(' ')

  const firstTwoWords = words.slice(0, 2)

  const capitalizedWords = firstTwoWords.map((word) => {
    return `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`
  })

  return capitalizedWords.join(' ')
}
