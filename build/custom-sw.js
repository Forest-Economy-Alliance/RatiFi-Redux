const CACHE_VERSION = `app-static-${new Date().toISOString()}`; 
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll(["/", "/index.html", "/offline.html"]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_VERSION) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method === "GET" && event.request.url.startsWith("http")) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(event.request)
            .then((response) => {
              const clonedResponse = response.clone();
              if (event.request.method === "GET") {
                caches.open(CACHE_VERSION).then((cache) => {
                  cache.put(event.request, clonedResponse);
                });
              }
              return response;
            })
            .catch(() => caches.match("/offline.html"))
        );
      })
    );
  }
});

self.addEventListener("sync", (event) => {
  if (event.tag === "sync-claim-docs") {
    event.waitUntil(syncPendingClaims());
  }
});

const syncPendingClaims = async () => {
  console.log("Syncing pending claims...");
  try {
    const db = await openDB();
    const tx = db.transaction("claim-images", "readonly");
    const store = tx.objectStore("claim-images");

    const images = await store.getAll();

    if (Array.isArray(images) && images.length > 0) {
      for (const image of images) {
        try {
          console.log("Uploading image:", image);

          const payload = {
            fileName: "DUMMY_NAME",
            base64Data: await blobToBase64(image.blob),
            userId: image?.userId,
            isPdf: false,
          };

          const BASE_URL = 'https://4kmtkz4pcv.us-east-1.awsapprunner.com';
          const response = await fetch(`${BASE_URL}/get-gcp-url`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (response.ok) {
            const data = await response.json();
            const gcpUrl = data.response.Location;
            console.log("Image uploaded successfully:", gcpUrl);

            const deleteTx = db.transaction("claim-images", "readwrite");
            deleteTx.objectStore("claim-images").delete(image.id);
            console.log("Image removed from IndexedDB:", image.id);
          } else {
            console.error("Failed to upload image:", response.statusText);
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    } else {
      console.log("No images to sync");
    }
  } catch (error) {
    console.error("Error syncing pending claims:", error);
  }
};

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ClaimSyncDB", 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("claim-images")) {
        db.createObjectStore("claim-images", { keyPath: "id", autoIncrement: true });
      }
      if (!db.objectStoreNames.contains("claims")) {
        db.createObjectStore("claims", { keyPath: "claimId" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = (event) => reject(event.target.error);
  });
}
