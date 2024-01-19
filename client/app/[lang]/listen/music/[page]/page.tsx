import { Locale } from '@/i18n.config'
import React from 'react'

type Props = {
    params:{
      lang:Locale,
      page:string
    }
}

export async function generateStaticParams() {
  let res=await fetch(process.env.NEXT_PUBLIC_API_SERVER+'music/getPages?limit=12',{next:{revalidate:36}});
  if(!res.ok)throw new Error('Не вдалося отримати дані');
  const data=await res.json();
  if(data.status!=200)throw new Error('Не вдалося отримати дані');
  return data.res;
}

const getData=async(page:string)=>{
  const res=await fetch(process.env.NEXT_PUBLIC_API_SERVER+`music/get?page=${page}&limit=${12}`,{next:{revalidate:36}});
  if(!res.ok)throw new Error('Не вдалося отримати дані');
  const data=await res.json();
  if(data.status!=200)throw new Error('Не вдалося отримати дані');
  return data.res;
}


const Music = async({params}:Props) => {
  const music=await getData(params.page);
  return (
    <div>
      {music.map((x:any)=>(
        <audio key={x.id} controls autoPlay>
          <source src={process.env.NEXT_PUBLIC_SERVER+`${x.src}`} type="audio/mp3" />
          Your browser does not support the audio element.
      </audio>
      ))}
    </div>
  )
}

export default Music;