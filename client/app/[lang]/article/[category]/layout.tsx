import type { Metadata } from 'next'
import { Locale } from '@/i18n.config'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export async function generateStaticParams({params}:{params:{lang:Locale}}) {
    let res=await fetch(process.env.NEXT_PUBLIC_API_SERVER+'categories/getPosts',{next:{revalidate:3600*24}});
    if(!res.ok)throw new Error('Не вдалося отримати дані');
    let data=(await res.json()).slice(1);
    data.unshift({category:"all"})
    return data;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        children
  )
}
