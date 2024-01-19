import { $authHost, $host } from "@/app/http";

export const addCookies=async(text1:string,text2:string,text3:string)=>{
    try{
        let formData=new FormData();
        formData.append('text1',text1);
        formData.append('text2',text2);
        formData.append('text3',text3);
        const resp=await $authHost.post("additionalPages/addCookies",formData);
    }catch(err){
        console.log(err);
    }
}

export const getCookies=async(locale:string)=>{
    try{
        const resp=await $host.get("additionalPages/getCookies",{params:{language:locale}});
        return resp.data.res;
    }catch(err){
        console.log(err);
        return "";
    }
}

export const addTermsOfUse=async(text1:string,text2:string,text3:string)=>{
    try{
        await $authHost.post("additionalPages/addTermsOfUse",{text1,text2,text3});
    }catch(err){
        console.log(err);
    }
}



export const getTermsOfUse = async (locale: string) => {
  try {
    const response = await $host.get("additionalPages/getTermsOfUse",{params:{language:locale}});
    return response.data.res;
  } catch (error) {
    console.log(3,"Error fetching categories:", error);
    return "";
  }
};

export const getPrivacyPolicy=async(locale:string)=>{
    try{
        const resp=await $host.get("additionalPages/getPrivacyPolicy",{params:{language:locale}});
        return resp.data.res;
    }catch(err){
        console.log(err);
        return "";
    }
}

export const addPrivacyPolicy=async(text1:string,text2:string,text3:string)=>{
    try{
        await $authHost.post("additionalPages/addPrivacyPolicy",{text1,text2,text3});
    }catch(err){
        console.log(err);
    }
}