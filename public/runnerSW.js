function showNotification (e) {
  const data = e.data.json()
  self.registration.showNotification(data.title, {body: data.body, icon: 'http://localhost:8080/favicon.ico'})
}

self.addEventListener('push', showNotification)
