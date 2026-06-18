import GradientHeading from "../components/ui/GradientHeading";
import GlassCard from "../components/ui/GlassCard";
import SectionWrapper from "../components/common/SectionWrapper";
import usePageTitle from "../hooks/usePageTitle";

const sections = [
  {
    title: "Problem Statement",
    description:
      "Early cognitive and mental health risk patterns are often missed due to delayed screening and high-cost monitoring infrastructure."
  },
  {
    title: "Research Objective",
    description:
      "Build an explainable AI pipeline that predicts awareness-level cognitive risk from low-dimensional smartphone behavior markers."
  },
  {
    title: "How the System Works",
    description:
      "The system processes usage rhythms, typing dynamics, and self-reported wellness scores to estimate risk and confidence."
  },
  {
    title: "Minimal Data Principle",
    description:
      "No chat contents, audio, or private files are used. Only aggregate interaction signals are considered for the prototype."
  },
  {
    title: "Privacy and Ethics",
    description:
      "The architecture emphasizes consent, transparency, and strict boundaries around data usage to avoid surveillance harm."
  },
  {
    title: "Future Scope",
    description:
      "Future iterations can include personalized baselines, adaptive feedback loops, and longitudinal trend explainability."
  }
];

function AboutResearchPage() {
  usePageTitle("About Research");

  return (
    <SectionWrapper className="py-14">
      <GradientHeading
        title="About BrainSense Research"
        subtitle="A futuristic, explainable and privacy-aware frontend for minimal-data cognitive risk prediction."
      />
      <div className="grid md:grid-cols-2 gap-5 mt-8">
        {sections.map((section) => (
          <GlassCard key={section.title}>
            <h3 className="text-lg font-semibold">{section.title}</h3>
            <p className="text-sm text-white/70 mt-2 leading-relaxed">{section.description}</p>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default AboutResearchPage;
