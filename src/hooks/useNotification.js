import {useToast} from '../components/common/ToastProvider';

export default function useNotification(){
 const {showToast}=useToast();
 return {
   success:(message)=>showToast(message,'success'),
   error:(message)=>showToast(message,'error'),
   info:(message)=>showToast(message,'info')
 };
}
