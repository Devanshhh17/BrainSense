const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? "/_/backend" : "http://127.0.0.1:8000");

async function request(path, payload = null, method = "POST") {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (payload !== null && method !== "GET") {
    options.body = JSON.stringify(payload);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, options);
  const payloadData = await response.json();

  if (!response.ok) {
    const message = payloadData.detail || payloadData.message || response.statusText;
    throw new Error(message);
  }

  return payloadData;
}

export function predict(data) {
  return request("/predict", data, "POST");
}

export function saveEntry(data) {
  return request("/save-entry", data, "POST");
}

export function getHistory() {
  return request("/history", null, "GET");
}

export function mapFormToPredictionPayload(form) {
  return {
    daily_screen_time: Number(form.dailyScreenTime),
    unlock_count: Number(form.unlockCount),
    avg_session_duration: Number(form.avgSessionDuration),
    social_media_usage: Number(form.socialMediaUsage),
    productivity_usage: Number(form.educationUsage),
    entertainment_usage: Number(form.entertainmentUsage),
    late_night_usage: Number(form.lateNightUsage),
    typing_speed: Number(form.typingSpeed),
    typing_pause_duration: Number(form.typingPause),
    backspace_frequency: Number(form.backspaceFrequency),
    movement_regularity: Number(form.movementRegularity),
    sleep_quality: Number(form.sleepQuality),
    stress_level: Number(form.stressLevel),
    fatigue_level: Number(form.fatigueLevel),
    mood_score: Number(form.moodScore),
  };
}
