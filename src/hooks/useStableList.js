import {useMemo} from "react";

export default function useStableList(items){
  return useMemo(()=>Array.isArray(items)?items:[],[items]);
}
