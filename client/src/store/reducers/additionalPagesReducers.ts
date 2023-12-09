export enum AdditionalPagesTypes {
    ADDITIONAL_PAGES_GET_PRIVACY_POLICY = "ADDITIONAL_PAGES_GET_PRIVACY_POLICY",
    ADDITIONAL_PAGES_GET_COOKIES = "ADDITIONAL_PAGES_GET_COOKIES",
    ADDITIONAL_PAGES_GET_TERMS_OF_USE = "ADDITIONAL_PAGES_GET_TERMS_OF_USE",
    ADDITIONAL_PAGES_SET_PRIVACY_POLICY = "ADDITIONAL_PAGES_SET_PRIVACY_POLICY",
    ADDITIONAL_PAGES_SET_COOKIES = "ADDITIONAL_PAGES_SET_COOKIES",
    ADDITIONAL_PAGES_SET_TERMS_OF_USE = "ADDITIONAL_PAGES_SET_TERMS_OF_USE"
}

export interface AdditionalPagesState {
    privacyPolicy: string;
    termsOfUse: string;
    cookies: string;
}
  
const initialState: AdditionalPagesState = {
    privacyPolicy: "",
    termsOfUse: "",
    cookies: "",
};

  
export const AdditionalPagesReducer = (state = initialState, action: { type: AdditionalPagesTypes; payload: any }): AdditionalPagesState => {
    switch (action.type) {
        case AdditionalPagesTypes.ADDITIONAL_PAGES_GET_COOKIES:{
            return {...state,cookies:action.payload};
        }
        case AdditionalPagesTypes.ADDITIONAL_PAGES_GET_PRIVACY_POLICY:{
            return {...state,privacyPolicy:action.payload};
        }
        case AdditionalPagesTypes.ADDITIONAL_PAGES_GET_TERMS_OF_USE:{
            return {...state,termsOfUse:action.payload};
        }
        default:
            return state;
    }
};