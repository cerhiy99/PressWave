import { Dispatch } from "redux";
import { $authHost, $host } from "../../http";
import { AdditionalPagesTypes } from "../reducers/additionalPagesReducers";

export const GetPrivacyPolicy=(language:string)=>async(dispatch:Dispatch)=>{
    try{
        const resp=await $host.get("additionalPages/getPrivacyPolicy",{params:{language}});
        if(resp.data.status==200){
            dispatch({type:AdditionalPagesTypes.ADDITIONAL_PAGES_GET_PRIVACY_POLICY,payload:resp.data.res});
        }else console.log(resp);
    }catch(err){
        console.log(err);
    }
}

export const GetCookies=(language:string)=>async(dispatch:Dispatch)=>{
    try{
        const resp=await $host.get("additionalPages/getCookies",{params:{language}});
        if(resp.data.status==200){
            dispatch({type:AdditionalPagesTypes.ADDITIONAL_PAGES_GET_COOKIES,payload:resp.data.res});
        }else console.log(resp);
    }catch(err){
        console.log(err);
    }
}

export const GetTermsOfUse=(language:string)=>async(dispatch:Dispatch)=>{
    try{
        const resp=await $host.get("additionalPages/getTermsOfUse",{params:{language}});
        if(resp.data.status==200){
            dispatch({type:AdditionalPagesTypes.ADDITIONAL_PAGES_GET_TERMS_OF_USE,payload:resp.data.res});
        }else console.log(resp);
    }catch(err){
        console.log(err);
    }
}

export const AddPrivacyPolicy=(text1:string,text2:string,text3:string)=>async(dispatch:Dispatch)=>{
    try{
        await $authHost.post("additionalPages/addPrivacyPolicy",{text1,text2,text3});
    }catch(err){
        console.log(err);
    }
}
export const AddTermsOfUse=(text1:string,text2:string,text3:string)=>async(dispatch:Dispatch)=>{
    try{
        await $authHost.post("additionalPages/addTermsOfUse",{text1,text2,text3});
    }catch(err){
        console.log(err);
    }
}
export const AddCookies=(text1:string,text2:string,text3:string)=>async(dispatch:Dispatch)=>{
    try{
        let formData=new FormData();
        formData.append('text1',text1);
        formData.append('text2',text2);
        formData.append('text3',text3);
        const resp=await $authHost.post("additionalPages/addCookies",formData);
        console.log(resp);
    }catch(err){
        console.log(err);
    }
}