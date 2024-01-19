import { Locale } from '@/i18n.config'
import Link from 'next/link'
import React from 'react'
import "./SortOption.scss";
import { getDictionary } from '@/lib/dictionary';

type Props = {
    lang:Locale,
    sortfor:string,
    category:string,
    page:string
}

const optionsSort=[
    'date','views','name'
  ]

const SortOption = async({lang,sortfor,category,page}: Props) => {
    const {article}=await getDictionary(lang);
  return (
    <div className="sort">
            {article.sortBy}
        <div className="sort-options">
            {optionsSort.map((option,idx)=>(   
                <div key={idx} className={`sort-option${option===sortfor?"-active":""}`}>
                    <Link href={`/${lang}/article/${category}/${option}/${page}`}>
                        {option}
                    </Link>
                </div>
            ))}
        </div>           
    </div>
   
  )
}

export default SortOption