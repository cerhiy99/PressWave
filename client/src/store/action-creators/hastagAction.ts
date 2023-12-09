import { Dispatch } from "redux"
import { $authHost, $host } from "../../http";
import { HastagTypes } from "../reducers/hastagRefducer";


export const GetHashtag = () => async (dispatch: Dispatch) => {
    try{
        const resp=await $host.get("hashtag/get");
        if(resp.data.status==200){
            dispatch({type:HastagTypes.HASTAG_GET,payload:resp.data.res});
        }else console.log(resp)
    }catch(err){
        console.log(err);
    }
}

export const AddHashtag=(name:string)=>async(dispatch:Dispatch)=>{
    try{
        const resp=await $authHost.post("/hashtag/add",{name});
        if(resp.data.status!=200)console.log(resp)
    }catch(err){
        console.log(err);
    }
}