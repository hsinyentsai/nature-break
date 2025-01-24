// Open YouTube when "Yes, take me there!" is clicked
document.getElementById("youtube-btn").addEventListener("click", () => {
  chrome.tabs.create({ url: "https://www.youtube.com" });
  window.close();
});

// Log action when "I'd rather keep working." is clicked
document.getElementById("work-btn").addEventListener("click", () => {
  console.log("User chose to keep working.");
  window.close();
});

// Show mute options when "Mute me to stay focused" is clicked
document.getElementById("mute-btn").addEventListener("click", () => {
  const muteOptions = document.getElementById("mute-options");
  muteOptions.style.display = muteOptions.style.display === "block" ? "none" : "block";
});

// Handle mute duration selection
document.querySelectorAll(".mute-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const duration = parseInt(event.target.getAttribute("data-duration")); // Duration in minutes
    chrome.runtime.sendMessage({ action: "mute", duration });
    alert(`Notifications muted for ${duration / 60} hour(s).`);
    window.close();
  });
});
