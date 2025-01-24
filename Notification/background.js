// Default interval for notifications (6 seconds for testing)
const DEFAULT_INTERVAL = 0.1; // 0.1 minutes = 6 seconds

// Track mute status
let isMuted = false;

// Set up the alarm when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("breakReminder", { delayInMinutes: DEFAULT_INTERVAL, periodInMinutes: DEFAULT_INTERVAL });
});

// Listen for the alarm and trigger the popup if not muted
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "breakReminder" && !isMuted) {
    chrome.windows.create({
      url: "popup.html",
      type: "popup",
      width: 400,
      height: 300
    });
  }
});

// Handle mute status
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "mute") {
    const muteDurationInMinutes = message.duration;
    isMuted = true;

    // Clear the alarm and set it to resume after the mute duration
    chrome.alarms.clear("breakReminder", () => {
      setTimeout(() => {
        isMuted = false; // Resume notifications after mute period
        chrome.alarms.create("breakReminder", {
          delayInMinutes: DEFAULT_INTERVAL,
          periodInMinutes: DEFAULT_INTERVAL
        });
      }, muteDurationInMinutes * 60 * 1000); // Convert minutes to milliseconds
    });
  }
});
