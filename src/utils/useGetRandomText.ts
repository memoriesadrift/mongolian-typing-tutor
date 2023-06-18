import texts from '../assets/texts'

export const getRandomText = () => {
  const max = Math.floor(texts.length - 1)
  return texts[Math.floor(Math.random() * (max + 1))]
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .split('')
}
