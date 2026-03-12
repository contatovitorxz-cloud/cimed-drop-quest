import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
    <div className="w-16 h-16 bg-muted dark:bg-muted/50 flex items-center justify-center mb-4 border-[3px] border-border">
      <Icon className="w-7 h-7 text-muted-foreground" />
    </div>
    <h3 className="text-sm font-black text-foreground mb-1 uppercase">{title}</h3>
    <p className="text-xs text-muted-foreground max-w-[240px]">{description}</p>
    {actionLabel && onAction && (
      <Button onClick={onAction} size="sm" className="mt-4 text-xs font-black">
        {actionLabel}
      </Button>
    )}
  </div>
);

export default EmptyState;
