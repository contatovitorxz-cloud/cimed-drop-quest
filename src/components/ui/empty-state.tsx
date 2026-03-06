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
    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
      <Icon className="w-7 h-7 text-muted-foreground" />
    </div>
    <h3 className="text-sm font-bold text-foreground mb-1">{title}</h3>
    <p className="text-xs text-muted-foreground max-w-[240px]">{description}</p>
    {actionLabel && onAction && (
      <Button onClick={onAction} size="sm" className="mt-4 gradient-orange border-0 rounded-xl text-xs font-bold">
        {actionLabel}
      </Button>
    )}
  </div>
);

export default EmptyState;
