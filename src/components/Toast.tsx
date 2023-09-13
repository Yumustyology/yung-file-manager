import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToastMsg = (toastMsg:string,toastId:string)=> toast.dark(toastMsg,{toastId})
