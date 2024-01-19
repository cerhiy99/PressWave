import { $authHost, $host } from '@/app/http';
import axios from 'axios';

export const getHastags = async () => {
  try {
    const response = await $host.get(`/hashtag/get`);
    console.log(response);
    return response.data.res;
    
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const addHastag=async(name:string)=>{
  try{
    const resp=await $authHost.post("/hashtag/add",{name});
    if(resp.data.status!=200)console.log(resp)
  }catch(err){
    console.log(err);
}
}