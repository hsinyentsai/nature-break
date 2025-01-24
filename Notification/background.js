// Default notification interval in minutes
const DEFAULT_INTERVAL = 1;
let isMuted = false; // Tracks mute status

// On installation or extension load, set default interval
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(["notificationInterval"], (result) => {
    if (!result.notificationInterval) {
      chrome.storage.local.set({ notificationInterval: DEFAULT_INTERVAL });
    }
  });

  setAlarm(); // Create the alarm based on the saved interval
});

// Function to set the alarm based on the current interval
function setAlarm() {
  chrome.storage.local.get("notificationInterval", (result) => {
    const interval = result.notificationInterval || DEFAULT_INTERVAL;
    chrome.alarms.create("breakReminder", { delayInMinutes: interval, periodInMinutes: interval });
  });
}

// Listen for updates to notification interval or mute requests
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "updateInterval") {
    const newInterval = message.interval;
    chrome.storage.local.set({ notificationInterval: newInterval }, () => {
      chrome.alarms.clear("breakReminder", () => {
        setAlarm();
        sendResponse({ success: true });
      });
    });
    return true;
  } else if (message.action === "mute") {
    const muteDuration = message.duration;
    isMuted = true;
    chrome.alarms.clear("breakReminder", () => {
      setTimeout(() => {
        isMuted = false;
        setAlarm(); // Resume notifications after mute period
      }, muteDuration * 60 * 1000); // Convert minutes to milliseconds
    });
    sendResponse({ success: true });
    return true;
  }
});

// Listen for alarms to trigger the popup, unless muted
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "breakReminder" && !isMuted) {
    chrome.windows.create({
      url: "popup.html",
      type: "popup",
      width: 400,
      height: 350,
    });
  }
});
