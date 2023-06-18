import {
  Grommet,
  Heading,
  Page,
  PageContent,
  Paragraph,
  Text,
  grommet,
} from 'grommet'
import { ReactNode, useEffect, useState } from 'react'
import { UseKeyDownCallbackParams, useKeyDown } from './utils/useKeyDown'

function App() {
  const [text, _setText] = useState(
    `
    Цаг агаар тэнэг халуун
    Хотын амьдрал нэгэн хэвийн
    Үргэлжилсээр, энх тайвны өргөн чөлөө
    Өчигдөр уусан юмны нөлөө
    Гэнэт чи гарч ирсэн
    Нэрийг чинь би санахгүй гайхсан
    Чи хэлсэн өчигдөр танилцсан
    Би санахгүй өчигдөр уусан байсан, уусан байсан
  `
      .trim()
      .split('')
  )
  const [typedText, setTypedText] = useState<Array<String>>([])
  const [displayText, setDisplayText] = useState<Array<ReactNode>>([])

  const keyPressCallback = ({ key }: UseKeyDownCallbackParams) => {
    if (key === 'Backspace') {
      setTypedText((letters) => letters.slice(0, -1))
      return
    }

    // Ignore typing non-characters
    if (key.length > 1) {
      return
    }

    setTypedText((letters) => [...letters, key])
  }

  useEffect(() => {
    setDisplayText(
      text.map((key, idx) => {
        const isTyped = typedText.length > idx
        const isCorrect = isTyped ? typedText[idx] === key : false
        const color = isTyped ? (isCorrect ? 'green' : 'red') : 'default'

        return (
          <Text key={`letter-${idx}`} color={color}>
            {key}
          </Text>
        )
      })
    )
  }, [typedText])

  useKeyDown(keyPressCallback)

  return (
    <Grommet theme={grommet} full>
      <Page kind="narrow" fill>
        <PageContent>
          <Heading alignSelf="center">Mongolian Typing Tutor 🇲🇳</Heading>
          <Paragraph alignSelf="center">{displayText}</Paragraph>
          <Paragraph alignSelf="center">{typedText.join('')}</Paragraph>
        </PageContent>
      </Page>
    </Grommet>
  )
}

export default App
