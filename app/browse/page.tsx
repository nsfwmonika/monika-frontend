import { Suspense } from 'react'
import Browse from './Browse'

export default function BrowsePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Browse />
    </Suspense>
  )
}

