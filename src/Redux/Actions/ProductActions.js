import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../Helpers/apiUrl";
import TaskDataService from '../../Services/task.services'
toast.configure();

export const GetAllProduct = () => {
  return async (dispatch) => {
    console.log('get all product is running')
    let allTaskId = []
    let allTaskFirestore = []
    const data  =  await TaskDataService.getAllTask();
    data.docs.map((doc)=>{
      allTaskId.push(doc.id)
      allTaskFirestore.push({...doc.data(),id:doc.id})
    })
    var getAllProgress = [];
    var getAllSuccess = [];
    allTaskFirestore.forEach((val,index,array)=>{
      if (val.status === 1) {
        getAllSuccess.push(val);
      } else {
        getAllProgress.push(val);
      }
    })
    dispatch({
      type: "GETALLPRODUCT",
      allProduct: allTaskFirestore,
      allOnProgress: getAllProgress,
      allOnSuccess: getAllSuccess,
    });
    console.log(getAllProgress,' get all progress')
    console.log(getAllSuccess,' get all success')
  };
};
