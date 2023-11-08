import { $host } from "../../http";
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
