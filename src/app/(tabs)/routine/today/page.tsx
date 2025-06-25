
'use client';

import Link from 'next/link';
import PageHeader from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { routine } from '@/lib/mock-data';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TodaysRoutinePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full">
        <div className="p-4 pt-8">
            <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
                <ArrowLeft className="h-4 w-4" />
                Volver a Mis Rutinas
            </button>
            <h1 className="text-3xl font-bold font-headline">Rutina de Hoy: Pecho y Tríceps</h1>
        </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-3">
        {routine.map((exercise) => (
          <Link href={`/routine/${exercise.id}`} key={exercise.id}>
            <Card className="shadow-lg transition-transform active:scale-95 cursor-pointer">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div onClick={(e) => { e.preventDefault(); /* Logic to toggle completion state would go here */ }}>
                    <Checkbox 
                      checked={exercise.completed} 
                      id={`ex-${exercise.id}`} 
                      className="h-8 w-8 rounded-full data-[state=checked]:bg-accent"
                      aria-label={`Mark ${exercise.name} as complete`}
                    />
                  </div>
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
