'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { allExercises } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function ExerciseDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const exercise = allExercises.find((ex) => ex.id === params.id);

  if (!exercise) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-xl font-bold">Ejercicio no encontrado</h1>
        <Link href="/routine/today">
            <Button variant="link">Volver a la rutina</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
       <div className="p-4 pt-8">
        <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Volver
        </button>
        <h1 className="text-3xl font-bold font-headline">{exercise.name}</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-4">
        {exercise.videoUrl ? (
          <div className="aspect-video w-full rounded-lg overflow-hidden border">
            <iframe
              className="w-full h-full"
              src={exercise.videoUrl}
              title={`Video de ${exercise.name}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="aspect-video w-full rounded-lg bg-muted flex items-center justify-center">
            <p className="text-muted-foreground">Video no disponible</p>
          </div>
        )}
        
        <div>
          <Badge variant="secondary">{exercise.muscleGroup}</Badge>
        </div>

        <div>
            <h2 className="text-xl font-bold mb-2">Instrucciones</h2>
            <p className="text-muted-foreground">
                Aquí irían las instrucciones detalladas del ejercicio, explicando la forma correcta, los músculos trabajados y consejos para evitar lesiones.
            </p>
        </div>
      </div>
       <div className="p-4 border-t border-border">
          <Button onClick={() => router.push(`/workout/exercise/${exercise.id}`)} className="w-full h-12 text-lg">
              Comenzar Ejercicio
          </Button>
        </div>
    </div>
  );
}
