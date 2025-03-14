const menuButton = document.getElementById("menuButton");
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const sidebarCollapsed = document.getElementById("sidebarCollapsed");
const userMenu = document.getElementById("userMenu");
const locateButton = document.getElementById("locate");
const zoomInButton = document.getElementById("zoom-in");
const zoomOutButton = document.getElementById("zoom-out");

// Initialize Map
const map = new maplibregl.Map({
  style: "https://tiles.openfreemap.org/styles/liberty",
  center: [105.811879, 21.584572],
  zoom: 12,
  container: "map",
});

// Marker for current location
let userMarker = null;

// Toggle Sidebar
const toggleSidebar = () => {
  const isCollapsed = sidebar.classList.toggle("-translate-x-full");
  sidebarCollapsed.classList.toggle("hidden", !isCollapsed);
};

menuButton.addEventListener("click", toggleSidebar);
menuToggle.addEventListener("click", toggleSidebar);

// Toggle User Menu
function toggleUserMenu() {
  userMenu.classList.toggle("show");
}

// Close User Menu when clicking outside
window.onclick = (event) => {
  if (!event.target.closest(".user-box")) {
    userMenu.classList.remove("show");
  }
};

// Get Current Location and Show on Map
function getCurrentLocation(centerOnly = true) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Center map to current location
        map.flyTo({ center: [longitude, latitude], zoom: 15 });

        // Add or move marker for current location
        if (!userMarker) {
          userMarker = new maplibregl.Marker({ color: "#FF0000" })
            .setLngLat([longitude, latitude])
            .addTo(map);
        } else {
          userMarker.setLngLat([longitude, latitude]);
        }
      },
      (error) => {
        console.error("Lỗi khi lấy vị trí:", error.message);
      }
    );
  } else {
    console.error("Trình duyệt của bạn không hỗ trợ định vị.");
  }
}

// Automatically center map on load
document.addEventListener("DOMContentLoaded", () => getCurrentLocation(true));

// Attach Event Listener
locateButton.addEventListener("click", () => getCurrentLocation(true));
zoomInButton.addEventListener("click", () => map.zoomIn());
zoomOutButton.addEventListener("click", () => map.zoomOut());