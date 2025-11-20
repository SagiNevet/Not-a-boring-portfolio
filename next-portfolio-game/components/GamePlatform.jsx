'use client';

const GamePlatform = ({ height, width }) => {
  return (
    <div
      className="absolute rounded-[28px] border border-white/5 bg-gradient-to-r from-[#1c2340] via-[#11152a] to-[#1c2340] shadow-[0_-15px_25px_rgba(5,6,17,0.85),0_10px_30px_rgba(0,0,0,0.6)]"
      style={{
        bottom: 0,
        left: 0,
        height,
        width,
      }}
    >
      <div className="absolute inset-x-4 top-3 h-2 rounded-full bg-white/5 blur-xl" />
    </div>
  );
};

export default GamePlatform;

