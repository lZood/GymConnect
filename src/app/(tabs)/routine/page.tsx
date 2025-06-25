import Link from 'next/link';
import PageHeader from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { routine } from '@/lib/mock-data';
import { ChevronRight } from 'lucide-react';

export default function RoutinePage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Rutina de Hoy" subtitle="Día de Pecho y Tríceps" />
      <div className="flex-1 overflow-y-auto px-4 space-y-3">
        {routine.map((exercise) => (
          <Link href={`/routine/${exercise.id}`} key={exercise.id} passHref>
            <Card className="shadow-lg transition-transform active:scale-95 cursor-pointer">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Checkbox 
                    checked={exercise.completed} 
                    id={`ex-${exercise.id}`} 
                    className="h-8 w-8 rounded-full data-[state=checked]:bg-accent"
                    aria-label={`Mark ${exercise.name} as complete`}
                  />
                  <div>
                    <p className="font-bold text-lg">{exercise.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {exercise.sets} series x {exercise.reps} reps
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-6 w-6 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
        <div className="h-4"></div>
      </div>
    </div>
  );
}
