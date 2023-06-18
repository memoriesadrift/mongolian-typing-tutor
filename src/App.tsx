import {
  Button,
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
import { getRandomText } from './utils/useGetRandomText'

function App() {
  const [text, setText] = useState<Array<String>>(getRandomText())
  const [typedText, setTypedText] = useState<Array<String>>([])
  const [displayText, setDisplayText] = useState<Array<ReactNode>>([])

  const keyPressCallback = ({ key }: UseKeyDownCallbackParams) => {
    if (key === 'Backspace') {
      setTypedText((letters) => letters.slice(0, -1))
      return
    }

    // Ignore typing non-character keys
    if (key.length > 1) {
      return
    }

    setTypedText((letters) => [...letters, key])
  }

  useKeyDown(keyPressCallback)

  useEffect(() => {
    if (typedText.length >= text.length) {
      return
    }

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

  const refreshText = () => {
    setText(getRandomText())
    setTypedText([])
  }

  return (
    <Grommet theme={grommet} full>
      <Page kind="narrow" fill>
        <PageContent>
          <Heading alignSelf="center">Mongolian Typing Tutor 🇲🇳</Heading>
          <Paragraph alignSelf="center" style={{ whiteSpace: 'pre-line' }}>
            {displayText}
          </Paragraph>
          <Paragraph alignSelf="center" style={{ whiteSpace: 'pre-line' }}>
            {typedText.join('')}
          </Paragraph>
          <Button size="small" label="New Text" onClick={refreshText} />
        </PageContent>
      </Page>
    </Grommet>
  )
}

export default App
