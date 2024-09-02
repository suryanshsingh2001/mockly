import Header from '@/components/layout/Header'
import MockupEditor from '@/components/shared/MockupEditor'
import ScreenshotEditor from '@/components/shared/ScreenshotEditor'
import React from 'react'

const App = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <MockupEditor />

    </div>
  )
}

export default App
