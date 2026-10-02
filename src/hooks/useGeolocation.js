export function getCurrentLocation(){
 return new Promise((resolve,reject)=>{
  if(!navigator.geolocation) return reject(new Error('Perangkat tidak mendukung GPS.'));
  navigator.geolocation.getCurrentPosition(p=>resolve({latitude:p.coords.latitude,longitude:p.coords.longitude,accuracy:p.coords.accuracy,timestamp:p.timestamp}),e=>reject(new Error(e.code===1?'Izin lokasi ditolak. Aktifkan izin lokasi untuk melakukan absensi.':'Lokasi tidak dapat diperoleh. Coba lagi.')),{enableHighAccuracy:true,timeout:15000,maximumAge:0});
 });
}
