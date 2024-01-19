import React from 'react'

export async function generateStaticParams() {
    let res=await fetch(process.env.NEXT_PUBLIC_API_SERVER+'music/getPages?limit=12',{next:{revalidate:36}});
    if(!res.ok)throw new Error('Не вдалося отримати дані');
    const data=await res.json();
    if(data.status!=200)throw new Error('Не вдалося отримати дані');
    return data.res;
}

const getData=async(id:string)=>{
    const res=await fetch(process.env.NEXT_PUBLIC_API_SERVER+`music/getForId?id=${id}`,{next:{revalidate:36}});
    if(!res.ok)throw new Error('Не вдалося отримати дані');
    const data=await res.json();
    if(data.status!=200)throw new Error('Не вдалося отримати дані');
    return data.res;
}

const page = async({params:{id}}:{params:{id:string}}) => {
    const music=await getData(id);
    console.log(music);
  return (
    <div>page</div>
  )
}

export default page