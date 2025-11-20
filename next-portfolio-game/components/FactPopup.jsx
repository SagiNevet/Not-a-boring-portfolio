'use client';

const CARD_WIDTH = 260;
const CARD_HEIGHT = 190;

const FactPopup = ({ fact, position, visible, blockSize, boundsWidth }) => {
  if (!visible) return null;

  const halfWidth = CARD_WIDTH / 2;
  const minX = halfWidth + 12;
  const maxX = Math.max(boundsWidth - halfWidth - 12, minX);
  const centerX = position.x + blockSize / 2;
  const clampedX = Math.min(Math.max(centerX, minX), maxX);

  const desiredTop = position.y - CARD_HEIGHT - 20;
  const clampedTop = Math.max(desiredTop, 32);

  return (
    <div
      className="absolute z-30 animate-card-pop rounded-2xl border border-emerald-300/50 bg-slate-950/95 px-4 py-4 text-left text-sm text-emerald-50 shadow-[0_12px_35px_rgba(16,185,129,0.35)] backdrop-blur"
      style={{
        left: clampedX - halfWidth,
        top: clampedTop,
        width: CARD_WIDTH,
        minHeight: CARD_HEIGHT,
      }}
    >
      <p className="text-[11px] font-semibold tracking-[0.35em] text-emerald-300">
        {fact.title}
      </p>
      <ul className="mt-3 space-y-1.5 text-xs text-white/90">
        {fact.points.map((item) => (
          <li key={item} className="leading-relaxed">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FactPopup;

