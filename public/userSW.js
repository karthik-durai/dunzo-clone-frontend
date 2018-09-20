function showNotification (e) {
    const data = e.data.json()
    self.registration.showNotification(data.title)
}

self.addEventListener('push', showNotification)