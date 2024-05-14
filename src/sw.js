self.addEventListener("install",(e)=>{
  e.waitUntil(
    caches.open("service-worker").then((cache)=>{
        cache.addAll(['./index.html','script.js'])
    })
  )
})

self.addEventListener("fetch",(e)=>{
     e.respondWith(
        fetch(e.request).then(res=>{
            const cloneData = res.clone();
            caches.open("service-worker").then(cache=>{
                cache.put(e.request,cloneData);
            });
            return res;
        }).catch(()=>{
            console.log('cache offline');
            return caches.match(e.request).then(file=>file)
        })
     )
})