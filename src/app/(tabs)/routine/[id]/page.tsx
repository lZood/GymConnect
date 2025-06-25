import { routine } from '@/lib/mock-data';
import PageHeader from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ExerciseDetailPage({ params }: { params: { id: string } }) {
  const exercise = routine.find((ex) => ex.id === params.id);

  if (!exercise) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-xl font-bold">Ejercicio no encontrado</h1>
        <Link href="/routine">
            <Button variant="link">Volver a la rutina</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 pt-8">
        <Link href="/routine" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Volver a la rutina
        </Link>
        <h1 className="text-3xl font-bold font-headline">{exercise.name}</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 space-y-4">
        <div className="aspect-video w-full rounded-lg overflow-hidden border">
           <iframe
            className="w-full h-full"
            src={exercise.videoUrl}
            title={`Video de ${exercise.name}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="flex gap-2">
            <Badge variant="secondary">{exercise.sets} Series</Badge>
            <Badge variant="secondary">{exercise.reps} Reps</Badge>
        </div>

        <div>
            <h2 className="text-xl font-bold mb-2">Instrucciones</h2>
            <p className="text-muted-foreground">
                {exercise.description}
            </p>
        </div>
        <div className="h-4"></div>
      </div>
    </div>
  );
}
