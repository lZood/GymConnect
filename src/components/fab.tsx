import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Fab() {
  return (
    <Button
      className="absolute bottom-24 right-6 h-16 w-16 rounded-full shadow-lg"
      size="icon"
      aria-label="Añadir registro"
    >
      <Plus className="h-8 w-8" />
    </Button>
  );
}
