const cache=new Map();

export async function cachedRequest(key,fn,ttl=30000){
 const item=cache.get(key);
 if(item && Date.now()-item.time < ttl) return item.value;
 const value=await fn();
 cache.set(key,{value,time:Date.now()});
 return value;
}

export function clearRequestCache(key){
 if(key) cache.delete(key);
 else cache.clear();
}

export function invalidateRequestPrefix(prefix){
 for(const key of cache.keys()) if(String(key).startsWith(prefix)) cache.delete(key);
}
