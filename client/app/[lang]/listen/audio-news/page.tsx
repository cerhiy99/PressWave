import { Locale } from '@/i18n.config'
import React from 'react'

type Props = {
    params:{lang:Locale}
}

const page = async({params:{lang}}:Props) => {

  return (
    <div>audio-news</div>
  )
}

export default page;