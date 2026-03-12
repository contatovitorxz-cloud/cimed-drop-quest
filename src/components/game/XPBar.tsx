interface XPBarProps {
  level: number;
  xp: number;
  maxXp?: number;
}

const XPBar = ({ level, xp, maxXp = 1000 }: XPBarProps) => {
  const pct = Math.min((xp / maxXp) * 100, 100);

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-10 h-10 bg-accent text-accent-foreground font-black text-sm border-[2px] border-border">
        {level}
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-xs mb-1">
          <span className="font-black uppercase">Nível {level}</span>
          <span className="text-muted-foreground font-bold">{xp}/{maxXp} XP</span>
        </div>
        <div className="h-2 bg-muted overflow-hidden border-[2px] border-border">
          <div
            className="h-full bg-accent transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default XPBar;
