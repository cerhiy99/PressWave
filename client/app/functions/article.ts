import { $authHost, $host } from "@/app/http";

export const addArticles=async(name1:string,name2:string,name3:string,date:string,image:File|null,description1:string,description2:string,
    description3:string,countWatch:number,isImage:boolean,video:File|null,time:string,timeReading:string,isHot:boolean,isHotMain:Boolean,
    listCategories:string[]=[],listHestegs:string[]=[])=>{
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

export const getHot=async(limit:number,language:string)=>{
    try{
        const resp=await $host.get("article/getLatest",{params:{language,limit}});
        if(resp.status===200){
            return resp.data.res;
        }else return [];
    }catch(err){
        console.log(err);
        return [];
    }
}
export const getArticleForCategory=async(language:string,limit:number,page:number,categoryId:number,sortBy:string="Date")=>{
    try{
        const resp=await $host.get("article/getForCategories",{params:{language,limit,categoryId,page,sortBy}});
        if(resp.data.status===200){
            return {articles:resp.data.res,count:resp.data.res}
        }else {
            return {articles:[],count:0}
        }
    }catch(err){
        console.log(err);
        return {articles:[],count:0}
    }
}