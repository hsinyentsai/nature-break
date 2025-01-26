// List of prompts for random selection
const PROMPTS = [
  "Hey champ! 🏆 Even superheroes need a breather. Time for a quick escape to nature?",
  "You've been crushing it for hours—time to recharge with a peaceful nature break?",
  "Hey superstar, you’ve been in the zone! 🖥️ How about a little forest magic to reset your focus?"
];

// Select a random message from the list
const randomMessage = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];

// Update the notification message dynamically
document.getElementById("notification-message").innerText = randomMessage;

// Open YouTube when "Yes, take me there!" is clicked
document.getElementById("youtube-btn").addEventListener("click", () => {
  window.open("https://hsinyentsai.github.io/paws-for-break/", "_blank");
  window.close();
});

// Close the popup when "I'd rather keep working." is clicked
document.getElementById("work-btn").addEventListener("click", () => {
  window.close();
});

// Toggle mute options visibility
document.getElementById("mute-btn").addEventListener("click", () => {
  const muteOptions = document.getElementById("mute-options");
  muteOptions.style.display = muteOptions.style.display === "flex" ? "none" : "flex";
});

// Handle mute duration selection
document.querySelectorAll(".mute-option").forEach((button) => {
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
      }
    }
  );
});
