import Link from 'next/link'
import { useRouter } from 'next/router';

import { i18n } from '@/i18n.config'

export default function LocaleSwitcher() {
  
  return (
    <ul className='list-language'>
      <li key={"ua"}>
        <Link
          href={"/ua"}
        >
          |ua|
        </Link>
        <Link
          href={"/en"}
        >
          |en|
        </Link>
        <Link
          href={"/in"}
        >
          |in|
        </Link>
      </li>
    </ul>
  )
}
