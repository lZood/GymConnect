
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, GripVertical, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { allExercises } from '@/lib/mock-data';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

type Exercise = {
  id: string;
  name: string;
  muscleGroup: string;
};

type RoutineExercise = {
  id: string;
  name: string;
  sets: number;
  reps: number;
  rest: number;
};

function ExerciseLibrary({ onAddExercises }: { onAddExercises: (exercises: Exercise[]) => void }) {
  const [selectedExercises, setSelectedExercises] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const muscleGroups = [...new Set(allExercises.map(e => e.muscleGroup))];
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedExercises(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredExercises = allExercises.filter(e => 
    (e.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (!selectedGroup || e.muscleGroup === selectedGroup)
  );

  const handleAdd = () => {
    const exercisesToAdd = allExercises.filter(e => selectedExercises.has(e.id));
    onAddExercises(exercisesToAdd);
    setSelectedExercises(new Set());
  };

  return (
    <>
      <SheetHeader>
        <SheetTitle>Biblioteca de Ejercicios</SheetTitle>
      </SheetHeader>
      <div className="p-4 space-y-4">
        <Input 
          placeholder="Buscar ejercicio..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          <Button variant={!selectedGroup ? 'default': 'secondary'} onClick={() => setSelectedGroup(null)} size="sm">Todos</Button>
          {muscleGroups.map(group => (
            <Button key={group} variant={selectedGroup === group ? 'default': 'secondary'} onClick={() => setSelectedGroup(group)} size="sm">{group}</Button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 space-y-2">
        {filteredExercises.map(exercise => (
          <div 
            key={exercise.id}
            onClick={() => handleSelect(exercise.id)}
            className="flex items-center gap-4 p-3 rounded-lg border cursor-pointer data-[selected=true]:bg-muted data-[selected=true]:border-primary"
            data-selected={selectedExercises.has(exercise.id)}
          >
            <Checkbox checked={selectedExercises.has(exercise.id)} id={`lib-${exercise.id}`} />
            <div>
              <p className="font-semibold">{exercise.name}</p>
              <Badge variant="outline">{exercise.muscleGroup}</Badge>
            </div>
          </div>
        ))}
      </div>
      <SheetFooter className="p-4">
        <SheetClose asChild>
          <Button onClick={handleAdd} disabled={selectedExercises.size === 0}>
             Añadir {selectedExercises.size > 0 ? `(${selectedExercises.size})` : ''} Ejercicios
          </Button>
        </SheetClose>
      </SheetFooter>
    </>
  )
}

export default function CreateRoutinePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [routineName, setRoutineName] = useState('');
  const [description, setDescription] = useState('');
  const [exercises, setExercises] = useState<RoutineExercise[]>([]);

  const addExercises = (newExercises: Exercise[]) => {
    const exercisesToAdd: RoutineExercise[] = newExercises.map(e => ({
      id: e.id,
      name: e.name,
      sets: 4,
      reps: 10,
      rest: 60,
    }));
    setExercises(prev => [...prev, ...exercisesToAdd]);
  };

  const updateExercise = (index: number, field: keyof RoutineExercise, value: string | number) => {
    setExercises(prev => {
        const updated = [...prev];
        const numValue = typeof value === 'string' ? parseInt(value, 10) : value;
        if (!isNaN(numValue)) {
            (updated[index] as any)[field] = numValue;
        }
        return updated;
    });
  }

  const removeExercise = (index: number) => {
    setExercises(prev => prev.filter((_, i) => i !== index));
  }

  const handleSave = () => {
    // In a real app, this would be a server action to save the routine.
    console.log({ routineName, description, exercises });
    toast({
      title: "¡Rutina Guardada!",
      description: `La rutina "${routineName}" ha sido creada.`,
    })
    router.push('/routine');
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 pt-8 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <div className="flex items-center gap-2">
            <Button onClick={() => router.back()} variant="ghost" size="icon" className="-ml-2">
                <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold">Crear Nueva Rutina</h1>
        </div>
        <Button onClick={handleSave} disabled={!routineName || exercises.length === 0}>Guardar</Button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <Label htmlFor="routineName">Nombre de la Rutina</Label>
              <Input id="routineName" placeholder="Ej: Lunes de Pecho y Tríceps" value={routineName} onChange={(e) => setRoutineName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="description">Descripción (Opcional)</Label>
              <Textarea id="description" placeholder="Ej: Enfocado en fuerza y volumen" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
            {exercises.map((ex, index) => (
                <Card key={index} className="bg-card/50">
                    <CardHeader className="flex flex-row items-center justify-between p-4">
                        <CardTitle className="text-lg">{ex.name}</CardTitle>
                        <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" onClick={() => removeExercise(index)}>
                                <Trash2 className="h-5 w-5 text-destructive" />
                            </Button>
                            <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab"/>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 grid grid-cols-3 gap-3">
                         <div>
                            <Label htmlFor={`sets-${index}`} className="text-xs">Series</Label>
                            <Input id={`sets-${index}`} type="number" value={ex.sets} onChange={e => updateExercise(index, 'sets', e.target.value)} />
                         </div>
                         <div>
                            <Label htmlFor={`reps-${index}`} className="text-xs">Reps</Label>
                            <Input id={`reps-${index}`} type="number" value={ex.reps} onChange={e => updateExercise(index, 'reps', e.target.value)} />
                         </div>
                          <div>
                            <Label htmlFor={`rest-${index}`} className="text-xs">Descanso (s)</Label>
                            <Input id={`rest-${index}`} type="number" value={ex.rest} onChange={e => updateExercise(index, 'rest', e.target.value)} />
                         </div>
                    </CardContent>
                </Card>
            ))}
        </div>

        <Sheet>
          <SheetTrigger asChild>
             <Button variant="secondary" className="w-full h-14 border-dashed border-2">
                <Plus className="mr-2 h-5 w-5" />
                Añadir Ejercicio
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90%] flex flex-col">
            <ExerciseLibrary onAddExercises={addExercises} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
