// Default notification interval in minutes
const DEFAULT_INTERVAL = 0.2;
let isMuted = false; // Tracks mute status

// List of prompts for notifications
const PROMPTS = [
  "Hey champ! 🏆 Even superheroes need a breather. Time for a quick escape to nature?",
  "You've been crushing it for hours—time to recharge with a peaceful nature break?",
  "Hey superstar, you’ve been in the zone! 🖥️ How about a little forest magic to reset your focus?"
];

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

// Listen for alarms to trigger the custom notification window
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "breakReminder" && !isMuted) {
    const randomMessage = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
    chrome.windows.create({
      url: `popup.html?message=${encodeURIComponent(randomMessage)}`,
      type: "popup",
      width: 400,
      height: 350,
    });
  }
});
