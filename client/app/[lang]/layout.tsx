import type { Metadata } from 'next'
import { Locale, i18n } from '@/i18n.config'
import Header from '@/app/components/header'

import { Inter } from 'next/font/google'
import Footer from '../components/Footer/Footer'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

async function getData(lang:Locale) {
  let res = (await fetch(process.env.NEXT_PUBLIC_API_SERVER+`categories/get?language=`+lang, { next: { revalidate: 3600*24 }}))
  if(!res.ok)throw new Error('Не вдалося отримати дані');
  const data=await res.json();
  if(data.status!=200)throw new Error('Не вдалося отримати дані');
  return data.res;
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  let categories=await getData(params.lang);
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
        <header><Header lang={params.lang} /></header>
        <main>{children}</main>
        <footer><Footer categories={categories} lang={params.lang}/></footer>
      </body>
    </html>
  )
}