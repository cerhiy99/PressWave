import { Locale } from '@/i18n.config'
import React from 'react'
import "./ListListen.scss";
import { getDictionary } from '@/lib/dictionary';
import Link from 'next/link';

type Props = {
    lang:Locale
}

const ListListen =async ({lang}:Props) => {
    const {listen}=await getDictionary(lang);
  return (
    <div className='list-listen-main'>
        <div className="list-listen-container">
            <ul>
                <li><Link href={`/${lang}/listen/live`}>{listen.live}</Link></li>
                <li><Link href={`/${lang}/listen/music`}>{listen.music}</Link></li>
                <li><Link href={`/${lang}/listen/podcast`}>{listen.podcast}</Link></li>
                <li><Link href={`/${lang}/listen/audio-news`}>{listen.audio_news}</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default ListListen