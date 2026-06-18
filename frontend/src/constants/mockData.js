export const dashboardStats = [
  { label: "Average Risk", value: "38%", change: "+4.1%", tone: "cyan" },
  { label: "Confidence Mean", value: "87%", change: "+1.8%", tone: "purple" },
  { label: "Sessions Analyzed", value: "1,204", change: "+12%", tone: "blue" },
  { label: "Critical Alerts", value: "09", change: "-2", tone: "rose" }
];

export const screenTimeTrend = [
  { day: "Mon", value: 4.5 },
  { day: "Tue", value: 5.1 },
  { day: "Wed", value: 4.8 },
  { day: "Thu", value: 5.6 },
  { day: "Fri", value: 5.2 },
  { day: "Sat", value: 6.1 },
  { day: "Sun", value: 5.7 }
];

export const stressTrend = [
  { week: "W1", stress: 38, fatigue: 41 },
  { week: "W2", stress: 45, fatigue: 43 },
  { week: "W3", stress: 49, fatigue: 48 },
  { week: "W4", stress: 44, fatigue: 46 }
];

export const riskHistory = [
  { name: "Jan", risk: 25 },
  { name: "Feb", risk: 31 },
  { name: "Mar", risk: 35 },
  { name: "Apr", risk: 33 },
  { name: "May", risk: 40 },
  { name: "Jun", risk: 37 }
];

export const recentPredictions = [
  { id: 1, date: "2026-03-28", risk: "Moderate", confidence: 0.89, factors: "Stress, Sleep" },
  { id: 2, date: "2026-03-24", risk: "Low", confidence: 0.91, factors: "Stable patterns" },
  { id: 3, date: "2026-03-21", risk: "Elevated", confidence: 0.86, factors: "Fatigue, Late-night use" }
];

export const historyRecords = [
  { id: "BRN-8121", date: "2026-03-28", risk: "Moderate", confidence: 89, factors: ["Stress", "Sleep quality"] },
  { id: "BRN-8040", date: "2026-03-24", risk: "Low", confidence: 91, factors: ["Balanced usage", "Good mood"] },
  { id: "BRN-7988", date: "2026-03-21", risk: "Elevated", confidence: 86, factors: ["Late-night usage", "Fatigue"] },
  { id: "BRN-7899", date: "2026-03-18", risk: "Moderate", confidence: 84, factors: ["Unlock spikes", "Typing pauses"] },
  { id: "BRN-7754", date: "2026-03-13", risk: "Low", confidence: 88, factors: ["Regular movement", "Low stress"] }
];

export const predictionSnapshot = {
  riskLevel: "Moderate",
  confidence: 88,
  disclaimer:
    "This result is an awareness indicator, not a medical diagnosis. Please consult qualified professionals for clinical decisions."
};

export const featureImportance = [
  { name: "Stress Level", impact: 28 },
  { name: "Sleep Quality", impact: 22 },
  { name: "Late-night Usage", impact: 18 },
  { name: "Typing Pause Duration", impact: 14 },
  { name: "Fatigue Level", impact: 12 },
  { name: "Screen Time", impact: 6 }
];

export const awarenessTips = [
  "Use a fixed bedtime and avoid screen exposure 45 minutes before sleep.",
  "Take 5-minute breaks after every 45 minutes of phone use.",
  "Track stress triggers and apply short breathing routines.",
  "Limit late-night social media scrolling windows."
];
