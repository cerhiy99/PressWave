import { Dispatch } from "redux";
import { $authHost, $host } from "../../http";
import { ArticlesTypes } from "../reducers/articlesReducers";

export const GetForYou=(language:string,limit:number,arrayAticles:number[])=>async(dispatch:Dispatch)=>{
    try{
        let res=[];
        for(let id of arrayAticles){
            const resp=await $host.get("article/getMiniForId",{params:{language,id}});
            if(resp.data.status==200) {
                res.push(...resp.data.res);
            } else console.log(resp);
        }
        if(arrayAticles.length!==limit){
            const limitMostPopular=limit-arrayAticles.length;
            const mostPopular=await $host.get("article/getMostPopular",{params:{language,limit:limitMostPopular}});
            if(mostPopular.data.status==200){
                res.push(...mostPopular.data.res);
            }
        }
        dispatch({type:ArticlesTypes.ARTICLE_GET_FOR_YOU,payload:res});
        
    }catch(err){
        console.log(err);
    } 
}

export const GetArticleForCategory=(language:string,limit:number,page:number,categoryId:number,sortBy:string="Date")=>async(dispatch:Dispatch)=>{
    try{
        const resp=await $host.get("article/getForCategories",{params:{language,limit,categoryId,page,sortBy}});
        if(resp.data.status==200){
            dispatch({type:ArticlesTypes.ARTICLE_GET_ARTICLE_FOR_CATEGORIES,
                payload:{categoryId,page,articles:resp.data.res,count:resp.data.count}});
        }else console.log(resp);
    }catch(err){
        console.log(err);
    }
}

export const GetArticleMostPopular=(language:string,limit:number)=>async(dispatch:Dispatch)=>{
    try{
        const resp=await $host.get("article/getMostPopular",{params:{language,limit}});
        if(resp.data.status==200){
            dispatch({type:ArticlesTypes.ARTICLE_GET_MOST_POPULAR,payload:resp.data.res});
        }else console.log(resp);
    }catch(err){
        console.log(err);
    }
}

export const GetArticle=(language:string,id:number)=>async(dispatch:Dispatch)=>{
    try{
        const resp=await $host.get("article/getForId",{params:{language,id}});
        if(resp.data.status==200){
            dispatch({type:ArticlesTypes.ARTICLES_GET_ID,payload:resp.data.res});
        }else console.log(resp);
    }catch(err){
        console.log(err);
    }
}

export const GetArticleHot=(language:string,limit:number)=>async(dispatch:Dispatch)=>{
    try{
        const resp=await $host.get("article/getHot",{params:{language,limit}});
        if(resp.data.status==200){
            dispatch({type:ArticlesTypes.ARTICLE_GET_HOT,payload:resp.data.res});
        }else console.log(resp);
    }catch(err){        
        console.log(err);
    }
}

export const GetLatestArticles=(language:string,limit:number)=>
    async(dispatch:Dispatch)=>{
    try{
        const resp=await $host.get("article/getLatest",{params:{language,limit}});
        if(resp.data.status==200){
            dispatch({type:ArticlesTypes.ARTICLES_GET_LATEST,payload:resp.data.res});
        }else console.log(resp);
    }catch(err){
        console.log(err);
    }

    
}

export const GetMiniVideo=(language:string,page:number,limit:number,sortBy:string)=>async(dispatch:Dispatch)=>{
    try{
        const resp=await $host.get("article/getVideo",{params:{language,limit,page,sortBy}});
        if(resp.data.status==200){
            dispatch({type:ArticlesTypes.ARTICLE_GET_MINI_VIDEO,payload:resp.data.res});
        }else console.log(resp);     
    }catch(err){
        console.log(err);
    }
}

export const AddArticles=(name1:string,name2:string,name3:string,date:string,image:File|null,description1:string,description2:string,
    description3:string,countWatch:number,isImage:boolean,video:File|null,time:string,timeReading:string,isHot:boolean,isHotMain:Boolean,
    listCategories:string[]=[],listHestegs:string[]=[])=>
    async (dispatch: Dispatch) => {
    try {
        let formData=new FormData();
        await formData.append("name1",name1);
        await formData.append("name2",name2);
        await formData.append("name3",name3);
        await formData.append("date",(date+"T12:00:00"));
        if(image)await formData.append("image",image);
        await formData.append("description1",description1);
        await formData.append("description2",description2);
        await formData.append("description3",description3);
        await formData.append("countWatch",countWatch.toString());
        await formData.append("isImage",isImage.toString());
        if(video)await formData.append("video",video);
        await formData.append("time",time);
        await formData.append("timeReading",timeReading);
        await formData.append("isHot",isHot.toString());
        await formData.append("isHotMain",isHotMain.toString());
        if(listCategories.length>0) await formData.append("listCategories",listCategories.join(" "));
        if(listCategories.length>0) await formData.append("listHestegs",listHestegs.join(" "));
        const resp=await $authHost.post("article/add",formData);
        
        if(resp.data.status==200){
            console.log(resp);
        }else console.log(resp)
    }catch(err){
        console.log(err);
    }
}