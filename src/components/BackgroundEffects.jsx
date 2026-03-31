function BackgroundEffects() {
  return (
    <>
      <div className="fixed inset-0 pointer-events-none bg-hero-gradient -z-20" />
      <div className="fixed inset-0 pointer-events-none grid-overlay -z-10" />
      <div className="fixed inset-0 pointer-events-none noise-overlay -z-10" />
      <div className="fixed top-12 left-[-120px] w-96 h-96 bg-cyan-400/20 blur-[120px] rounded-full -z-10 animate-drift" />
      <div className="fixed bottom-12 right-[-140px] w-[28rem] h-[28rem] bg-purple-500/20 blur-[120px] rounded-full -z-10 animate-drift" />
      <div className="fixed top-[45%] left-[35%] w-72 h-72 bg-blue-500/15 blur-[100px] rounded-full -z-10 animate-drift" />
    </>
  );
}

export default BackgroundEffects;
