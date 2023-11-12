import { $authHost, $host } from "../../http";
import { Dispatch } from "redux";
import { CategoriesTypes } from "../reducers/categoriesReducers";

export const GetCategories = (language: string) => async (dispatch: Dispatch) => {
  try {
    const resp = await $host.get("/categories/get",{params:{language}});
    if (resp.data.status == 200) {
      dispatch({ type: CategoriesTypes.CATEGORIES_GET, payload: resp.data.res });
    } else {
      console.log(resp);
    }
  } catch (err) {
    console.log(err);
  }
};

export const AddCategories=(name1:string,name2:string,name3:string)=>async(dispatch:Dispatch)=>{
  try{
    const resp=await $authHost.post("categories/add",{name1,name2,name3});
    console.log(resp)
    if(resp.data.status==200){
      dispatch({type:CategoriesTypes.CATEGORIES_ADD,payload:resp.data.res});
    }else {
      console.log(resp);
    }
  } catch (err) {
    console.log(err);
  }
}