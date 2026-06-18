import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FuturisticInput from "../components/ui/FuturisticInput";
import GlassCard from "../components/ui/GlassCard";
import GlowButton from "../components/ui/GlowButton";
import RangeSlider from "../components/ui/RangeSlider";
import SectionWrapper from "../components/common/SectionWrapper";
import usePageTitle from "../hooks/usePageTitle";
import { mapFormToPredictionPayload, predict, saveEntry } from "../services/api";

const initialForm = {
  dailyScreenTime: 5,
  unlockCount: 68,
  avgSessionDuration: 4.2,
  socialMediaUsage: 2.1,
  educationUsage: 1.7,
  entertainmentUsage: 1.8,
  lateNightUsage: 42,
  typingSpeed: 44,
  typingPause: 1.9,
  backspaceFrequency: 13,
  movementRegularity: 71,
  sleepQuality: 66,
  stressLevel: 52,
  fatigueLevel: 46,
  moodScore: 62
};

function InputFormPage() {
  usePageTitle("Input Form");
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (Number(form.dailyScreenTime) <= 0 || Number(form.sleepQuality) < 0) {
      setError("Please provide valid numeric values for required metrics.");
      return;
    }

    setError("");
    setLoading(true);

    const payload = mapFormToPredictionPayload(form);

    try {
      const prediction = await predict(payload);
      sessionStorage.setItem("lastPrediction", JSON.stringify({ prediction, input: form }));
      navigate("/results", { state: { prediction, input: form } });

      saveEntry(payload).catch((saveError) => {
        console.warn("Prediction saved failed", saveError);
      });
    } catch (submitError) {
      setError(submitError.message || "Unable to connect to backend. Please make sure the API server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper>
      <form onSubmit={onSubmit} className="space-y-5">
        <GlassCard>
          <h2 className="text-xl font-semibold">Device Behavior Signals</h2>
          <p className="text-sm text-white/60 mt-1">Enter everyday usage metrics for model simulation.</p>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mt-5">
            <FuturisticInput label="Daily Screen Time (hours)" name="dailyScreenTime" value={form.dailyScreenTime} onChange={onChange} min={0} />
            <FuturisticInput label="Unlock Count" name="unlockCount" value={form.unlockCount} onChange={onChange} min={0} />
            <FuturisticInput label="Average Session Duration (minutes)" name="avgSessionDuration" value={form.avgSessionDuration} onChange={onChange} min={0} />
            <FuturisticInput label="Social Media Usage (hours)" name="socialMediaUsage" value={form.socialMediaUsage} onChange={onChange} min={0} />
            <FuturisticInput label="Education/Productivity Usage (hours)" name="educationUsage" value={form.educationUsage} onChange={onChange} min={0} />
            <FuturisticInput label="Entertainment Usage (hours)" name="entertainmentUsage" value={form.entertainmentUsage} onChange={onChange} min={0} />
            <FuturisticInput label="Typing Speed (WPM)" name="typingSpeed" value={form.typingSpeed} onChange={onChange} min={0} />
            <FuturisticInput label="Typing Pause Duration (sec)" name="typingPause" value={form.typingPause} onChange={onChange} min={0} />
            <FuturisticInput label="Backspace Frequency (%)" name="backspaceFrequency" value={form.backspaceFrequency} onChange={onChange} min={0} max={100} />
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="text-xl font-semibold">Wellness Indicators</h2>
          <p className="text-sm text-white/60 mt-1">Range scores provide soft self-report context.</p>
          <div className="grid md:grid-cols-2 gap-4 mt-5">
            <RangeSlider label="Late-night Phone Usage" name="lateNightUsage" value={form.lateNightUsage} onChange={onChange} />
            <RangeSlider label="Movement Regularity Score" name="movementRegularity" value={form.movementRegularity} onChange={onChange} />
            <RangeSlider label="Sleep Quality" name="sleepQuality" value={form.sleepQuality} onChange={onChange} />
            <RangeSlider label="Stress Level" name="stressLevel" value={form.stressLevel} onChange={onChange} />
            <RangeSlider label="Fatigue Level" name="fatigueLevel" value={form.fatigueLevel} onChange={onChange} />
            <RangeSlider label="Mood Score" name="moodScore" value={form.moodScore} onChange={onChange} />
          </div>
        </GlassCard>

        {error && <p className="text-sm text-rose-300">{error}</p>}

        <div className="flex justify-end">
          <GlowButton type="submit" size="lg" disabled={loading}>
            {loading ? "Generating..." : "Generate Prediction"}
          </GlowButton>
        </div>
      </form>
    </SectionWrapper>
  );
}

export default InputFormPage;
