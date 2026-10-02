import { useI18n } from '../lib/i18n';

export default function MapLatency() {
  const { t } = useI18n();

  const points = [
    { id: 'qro', label: t('infra.latency.qro'), value: t('infra.latency.qro.value'), x: 52, y: 38 },
    { id: 'cel', label: 'Celaya', value: '0 ms', x: 48, y: 42 },
    { id: 'mex', label: t('infra.latency.mex'), value: t('infra.latency.mex.value'), x: 46, y: 50 },
    { id: 'slp', label: 'SLP', value: '<12 ms', x: 42, y: 36 },
    { id: 'dal', label: t('infra.latency.dal'), value: t('infra.latency.dal.value'), x: 24, y: 22 },
  ];

  return (
    <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl border border-white/10 bg-obsidian overflow-hidden">
      <svg
        viewBox="0 0 100 80"
        className="fill-abs w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Stylized Mexico outline */}
        <path
          d="M20 55 L28 45 L26 35 L32 25 L45 18 L58 14 L68 16 L72 24 L70 34 L75 40 L72 48 L66 55 L60 62 L52 68 L44 70 L36 68 L28 62 Z"
          fill="rgba(46, 157, 99, 0.08)"
          stroke="rgba(46, 157, 99, 0.35)"
          strokeWidth="0.4"
        />

        {/* Dallas reference */}
        <circle cx="24" cy="22" r="1.2" fill="rgba(201, 168, 76, 0.3)" />

        {/* Connection lines from Celaya */}
        {points
          .filter((p) => p.id !== 'cel')
          .map((p) => (
            <line
              key={p.id}
              x1="48"
              y1="42"
              x2={p.x}
              y2={p.y}
              stroke="rgba(201, 168, 76, 0.25)"
              strokeWidth="0.3"
              strokeDasharray="1 1"
            />
          ))}

        {/* Points */}
        {points.map((p) => (
          <g key={p.id}>
            <circle cx={p.x} cy={p.y} r={p.id === 'cel' ? 2 : 1.2} fill={p.id === 'cel' ? '#C9A84C' : '#2E9D63'} />
            {p.id === 'cel' && (
              <circle cx={p.x} cy={p.y} r="3.5" fill="none" stroke="#C9A84C" strokeWidth="0.3" opacity="0.5">
                <animate attributeName="r" values="3.5;5.5;3.5" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
        ))}
      </svg>

      {/* Labels overlay */}
      <div className="fill-abs p-4 md:p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 overlay-abs bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
          {points.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-2 rounded bg-obsidian-deep/80 border border-white/5 text-xs">
              <span className="text-white/60">{p.label}</span>
              <span className={`font-mono ${p.id === 'cel' ? 'text-gold' : 'text-teal'}`}>{p.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
