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

// Update notification frequency
document.getElementById("update-frequency-btn").addEventListener("click", () => {
  const hours = parseInt(document.getElementById("hours-input").value) || 0;
  const minutes = parseInt(document.getElementById("minutes-input").value) || 0;

  // Calculate total time in minutes
  const totalMinutes = hours * 60 + minutes;

  if (totalMinutes <= 0) {
    alert("Please enter a valid frequency (at least 1 minute).");
    return;
  }

  // Send the new interval to the background script
  chrome.runtime.sendMessage(
    { action: "updateInterval", interval: totalMinutes },
    (response) => {
      if (response && response.success) {
        alert(`Notification frequency updated to ${hours} hour(s) and ${minutes} minute(s).`);
        window.close();
      } else {
        alert("Failed to update the notification frequency.");
      }
    }
  );
});

// Toggle mute options visibility
document.getElementById("mute-btn").addEventListener("click", () => {
  const muteOptions = document.getElementById("mute-options");
  muteOptions.style.display = muteOptions.style.display === "block" ? "none" : "block";
});

// Handle mute duration selection
document.querySelectorAll(".mute-button").forEach((button) => {
  button.addEventListener("click", (event) => {
    const duration = parseInt(event.target.getAttribute("data-duration"));
    chrome.runtime.sendMessage(
      { action: "mute", duration: duration },
      (response) => {
        if (response && response.success) {
          alert(`Notifications muted for ${duration / 60} hour(s).`);
          window.close();
        }
      }
    );
  });
});
