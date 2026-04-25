 // Just for the WOW factor during your demo:
    setInterval(() => {
      const pulse = Math.floor(Math.random() * (75 - 68 + 1) + 68);
      document.getElementById('pulse-val').innerHTML = `${pulse} <span>BPM</span>`;
      
      const logBox = document.getElementById('sys-logs');
      const entry = document.createElement('p');
      entry.className = 'log-entry';
      entry.innerText = `[${new Date().toLocaleTimeString()}] Heartbeat: Active...`;
      logBox.prepend(entry);
    }, 3000);
    // 1. Initialize the map (Centered on India by default)
const map = L.map('map').setView([28.6139, 77.2090], 13); 

// 2. Add the OpenStreetMap tiles (The "Skin" of the map)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 3. Create a custom "Accident" icon
const accidentIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/564/564619.png',
    iconSize: [40, 40],
});

// 4. Add the Marker
let marker = L.marker([28.6139, 77.2090], {icon: accidentIcon}).addTo(map)
    .bindPopup('<b>Vehicle Status:</b> Normal<br>Location: New Delhi')
    .openPopup();

// 5. FUNCTION TO UPDATE LOCATION (Call this when your API gets new data)
function updateVehicleLocation(lat, lng, status) {
    const newCoords = [lat, lng];
    marker.setLatLng(newCoords);
    map.panTo(newCoords);
    marker.getPopup().setContent(`<b>Status:</b> ${status}<br>Lat: ${lat}, Lng: ${lng}`).openOn(map);
    
    // Log it to your terminal
    const logBox = document.getElementById('sys-logs');
    const entry = document.createElement('p');
    entry.className = 'log-entry';
    entry.innerText = `[${new Date().toLocaleTimeString()}] GPS Updated: ${lat}, ${lng}`;
    logBox.prepend(entry);
}

// Example: Simulating an API update after 5 seconds
setTimeout(() => {
    updateVehicleLocation(28.6200, 77.2100, "ACCIDENT DETECTED!");
}, 5000);