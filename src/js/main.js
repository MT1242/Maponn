document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menuButton");
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const userMenu = document.getElementById("userMenu");
  const locateButton = document.getElementById("locate");
  const zoomInButton = document.getElementById("zoom-in");
  const zoomOutButton = document.getElementById("zoom-out");
  const sidebarCollapsed = document.getElementById("sidebarCollapsed");

  // Initialize Map
  const map = new maplibregl.Map({
    style: "https://tiles.openfreemap.org/styles/liberty",
    center: [105.811879, 21.584572],
    zoom: 12,
    container: "map",
  });

  let userMarker = null;

  // Sidebar luôn đóng khi mở lại trang
  sidebar?.classList.add("-translate-x-full");
  getCurrentLocation(true);

  // Toggle Sidebar
  const toggleSidebar = () => {
    const isCollapsed = sidebar?.classList.toggle("-translate-x-full");
    sidebarCollapsed?.classList.toggle("hidden", !isCollapsed);
  };

  menuButton?.addEventListener("click", toggleSidebar);
  menuToggle?.addEventListener("click", toggleSidebar);

  // Toggle User Menu
  const toggleUserMenu = () => userMenu?.classList.toggle("show");

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".user-box")) {
      userMenu?.classList.remove("show");
    }
  });

  // Lấy vị trí hiện tại
  function getCurrentLocation(centerOnly = true) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.flyTo({ center: [longitude, latitude], zoom: 15 });

          if (!userMarker) {
            userMarker = new maplibregl.Marker({ color: "#FF0000" })
              .setLngLat([longitude, latitude])
              .addTo(map);
          } else {
            userMarker.setLngLat([longitude, latitude]);
          }
        },
        (error) => {
          let errorMessage = "Không thể lấy vị trí của bạn.";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Bạn đã từ chối quyền truy cập vị trí.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Thông tin vị trí không khả dụng.";
              break;
            case error.TIMEOUT:
              errorMessage = "Yêu cầu lấy vị trí đã hết thời gian chờ.";
              break;
          }
          alert(errorMessage);
          console.error("Lỗi khi lấy vị trí:", error.message);
        }
      );
    } else {
      alert("Trình duyệt của bạn không hỗ trợ định vị.");
    }
  }

  locateButton?.addEventListener("click", () => getCurrentLocation(true));
  zoomInButton?.addEventListener("click", () => map.zoomIn());
  zoomOutButton?.addEventListener("click", () => map.zoomOut());
});
