
'use client';

import Link from 'next/link';
import PageHeader from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { routine, user } from '@/lib/mock-data';
import { Dumbbell, PlusCircle, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RoutinePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Mis Rutinas"
        subtitle="Organiza y ejecuta tus entrenamientos"
        action={
          <Button onClick={() => router.push('/routine/create')} size="sm" className="rounded-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Crear Rutina
          </Button>
        }
      />
      <div className="flex-1 overflow-y-auto px-4 space-y-6">
        
        {/* Rutina de Hoy (Original) */}
        <Card className="shadow-lg border-primary/50">
           <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="text-primary"/>
                Rutina de Hoy
              </CardTitle>
              <CardDescription>Día de Pecho y Tríceps</CardDescription>
            </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
                {routine.slice(0,3).map(ex => (
                    <li key={ex.id} className="flex items-center gap-2">
                        <Dumbbell className="h-4 w-4" />
                        <span>{ex.name} - {ex.sets}x{ex.reps}</span>
                    </li>
                ))}
                 <li className="flex items-center gap-2">
                    <Dumbbell className="h-4 w-4" />
                    <span>y más...</span>
                </li>
            </ul>
            <Button onClick={() => router.push('/routine/today')} className="w-full mt-4">Ver Rutina de Hoy</Button>
          </CardContent>
        </Card>

        {/* Rutinas Personalizadas */}
        {user.customRoutines.map((customRoutine) => (
          <Card key={customRoutine.id} className="shadow-lg">
            <CardHeader>
              <CardTitle>{customRoutine.name}</CardTitle>
              <CardDescription>{customRoutine.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                {customRoutine.exercises.slice(0, 3).map((ex, index) => (
                    <li key={index} className="flex items-center gap-2">
                        <Dumbbell className="h-4 w-4" />
                        <span>{ex.name} - {ex.sets}x{ex.reps}</span>
                    </li>
                ))}
                {customRoutine.exercises.length > 3 && <li>y más...</li>}
              </ul>
              <Button onClick={() => router.push(`/workout/${customRoutine.id}`)} className="w-full">
                ¡Empezar Entrenamiento!
              </Button>
            </CardContent>
          </Card>
        ))}
        
        <div className="h-4"></div>
      </div>
    </div>
  );
}
