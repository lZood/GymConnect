'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { routine } from '@/lib/mock-data';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function TodaysRoutinePage() {
  const router = useRouter();
  const [completedExercises, setCompletedExercises] = useState(new Set(
      routine.filter(ex => ex.completed).map(ex => ex.id)
  ));

  const handleCheck = (exerciseId: string) => {
    // This is for visual toggling only in the prototype.
    setCompletedExercises(prev => {
        const newSet = new Set(prev);
        if (newSet.has(exerciseId)) {
            newSet.delete(exerciseId);
        } else {
            newSet.add(exerciseId);
        }
        return newSet;
    });
  };

  return (
    <div className="flex flex-col h-full">
        <div className="p-4 pt-8">
            <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
                <ArrowLeft className="h-4 w-4" />
                Volver a Mis Rutinas
            </button>
            <h1 className="text-3xl font-bold font-headline">Hoy: Empuje Pesado</h1>
        </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-3">
        {routine.map((exercise) => {
          const isCompleted = completedExercises.has(exercise.id);
          return (
            <Card 
              key={exercise.id} 
              className="shadow-lg transition-transform active:scale-95 cursor-pointer data-[completed=true]:bg-muted/50"
              data-completed={isCompleted}
              onClick={() => router.push(`/routine/${exercise.id}`)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div onClick={(e) => { e.stopPropagation(); handleCheck(exercise.id); }}>
                    <Checkbox 
                      checked={isCompleted}
                      id={`ex-${exercise.id}`} 
                      className="h-8 w-8 rounded-full data-[state=checked]:bg-green-500 border-green-500 text-white"
                      aria-label={`Mark ${exercise.name} as complete`}
                    />
                  </div>
                  <div className={isCompleted ? 'line-through text-muted-foreground' : ''}>
                    <p className="font-bold text-lg">{exercise.name}</p>
                    <p className="text-sm">
                      {exercise.sets} series x {exercise.reps} reps
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-6 w-6 text-muted-foreground" />
              </CardContent>
            </Card>
          )
        })}
        <div className="h-4"></div>
      </div>
    </div>
  );
}
