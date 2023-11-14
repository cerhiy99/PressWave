import { Dispatch } from "redux";
import { $authHost } from "../../http";

export const AddArticles=(name1:string,name2:string,name3:string,date:string,image:File|null,description1:string,description2:string,
    description3:string,countWatch:number,isImage:boolean,video:File|null,time:string,timeReading:string,isHot:boolean,isHotMain:Boolean)=>
    async (dispatch: Dispatch) => {
    try {
        console.log(1)
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
        await formData.append("listCategories","1 2");
        await formData.append("listHestegs","1 2");

        const resp=await $authHost.post("article/add",formData);
        
        if(resp.data.status==200){
            console.log(resp);
        }else console.log(resp)
    }catch(err){
        console.log(err);
    }
}
/*
{
  name1: 'fdfd  sfd',
  name2: 'fdg d df d',
  name3: 'df d df d f',
  date: '2023-11-13T12:00:00',
  description1: 'fsdf s fs',
  description2: 'sfs fsf s f',
  description3: 'fdsfd sgd g sdgs',
  countWatch: '434353',
  isImage: 'true',
  video: '',
  time: '',
  timeReading: '1 h',
  isHot: 'false',
  isHotMain: 'false',
  listHestegs: '1 2',
  listCategories: '1 2'
}
{
  name1: 'dsdsd',
  name2: 'dsdsd',
  name3: 'dsdsd',
  date: '2023-11-14T12:00:00',
  description1: '<p>ds</p>',
  description2: '<p>dsd</p>',
  description3: '<p>dsd</p>',
  countWatch: '43434',
  isImage: 'true',
  time: '',
  timeReading: '5 s',
  isHot: 'true',
  isHotMain: 'false',
  listCategories: '[1 2]',
  listHestegs: '[1 2]'
}

*/