import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import Editor from '@monaco-editor/react'

export default function App() {
  const [markdown, setMarkdown] = useState(
    '# Hello, Markdown!\n\nEdit this text to see live preview.'
  )

  return (
    <div className='container'>
      <div className='editor-container'>
        <Editor
          height='300px'
          defaultLanguage='markdown'
          value={markdown}
          onChange={value => setMarkdown(value || '')}
          data-testid='monaco-editor'
        />
        <div className='preview'>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}
