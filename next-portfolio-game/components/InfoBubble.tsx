'use client';

export type InfoItem = {
  id: string;
  x: number;
  y: number;
  vy: number;
  text: string;
  state: 'falling' | 'idle';
};

type InfoBubbleProps = {
  item: InfoItem;
};

export default function InfoBubble({ item }: InfoBubbleProps) {
  return (
    <div
      className="absolute flex flex-col items-center pointer-events-none z-20"
      style={{
        left: item.x,
        bottom: item.y,
        transform: 'translateX(-50%)',
      }}
    >
      <div 
        className="rounded-xl bg-emerald-400 px-2 py-1.5 text-xs font-semibold text-slate-900 shadow-lg max-w-[140px] text-center mb-1"
        style={{
          fontSize: '11px',
          padding: '6px 8px',
          lineHeight: '1.3',
          animation: item.state === 'idle' ? 'blockFloat 3s ease-in-out infinite' : 'fadeIn 0.3s ease-out',
        }}
      >
        {item.text}
      </div>
      <img
        src="/assets/sprites/question-mark.svg"
        alt="Info item"
        className="w-5 h-5 pixelated"
        style={{
          imageRendering: 'pixelated',
        }}
        draggable={false}
      />
    </div>
  );
}
