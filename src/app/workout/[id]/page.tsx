
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { user, allExercises } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { X, Check } from 'lucide-react';

type Routine = typeof user.customRoutines[0];
type Exercise = Routine['exercises'][0];

// Find a routine from mock data by ID
const findRoutine = (id: string): Routine | undefined => {
    return user.customRoutines.find(r => r.id === id);
}

// Active Exercise View Component
function ActiveExerciseView({
    exercise,
    currentSet,
    onCompleteSet
}: {
    exercise: Exercise,
    currentSet: number,
    onCompleteSet: (log: { weight: number, reps: number }) => void
}) {
    const [weight, setWeight] = useState(0);
    const [reps, setReps] = useState(exercise.reps);

    const exerciseDetails = allExercises.find(e => e.name === exercise.name);

    return (
        <div className="flex flex-col h-full text-white p-6 justify-between">
            <div>
                <h1 className="text-4xl font-bold">{exercise.name}</h1>
                <p className="text-muted-foreground text-lg">{exercise.sets} Series x {exercise.reps} Reps</p>
                {exerciseDetails?.videoUrl && 
                    <div className="aspect-video w-full rounded-lg overflow-hidden border mt-4">
                        <iframe
                            className="w-full h-full"
                            src={exerciseDetails.videoUrl}
                            title={`Video de ${exercise.name}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                }
            </div>

            <div className="text-center my-8">
                <p className="text-muted-foreground">SERIE</p>
                <p className="text-8xl font-bold">{currentSet} <span className="text-4xl text-muted-foreground">/ {exercise.sets}</span></p>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="weight" className="block text-sm font-medium text-muted-foreground mb-1">Peso (kg)</label>
                        <Input id="weight" type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="h-14 text-2xl text-center" />
                    </div>
                    <div>
                        <label htmlFor="reps" className="block text-sm font-medium text-muted-foreground mb-1">Reps</label>
                        <Input id="reps" type="number" value={reps} onChange={e => setReps(Number(e.target.value))} className="h-14 text-2xl text-center" />
                    </div>
                </div>
                <Button onClick={() => onCompleteSet({ weight, reps })} className="w-full h-16 text-xl bg-green-500 hover:bg-green-600">
                    <Check className="mr-2 h-8 w-8"/>
                    Completar Serie
                </Button>
            </div>
        </div>
    );
}

// Rest View Component
function RestView({
    restTime,
    nextExercise,
    nextSet,
    onTimerEnd,
    onSkip
}: {
    restTime: number,
    nextExercise: string,
    nextSet: number,
    onTimerEnd: () => void,
    onSkip: () => void
}) {
    const [countdown, setCountdown] = useState(restTime);

    useEffect(() => {
        if (countdown <= 0) {
            onTimerEnd();
            return;
        }
        const timer = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [countdown, onTimerEnd]);

    const progress = (restTime - countdown) / restTime * 100;

    return (
        <div className="flex flex-col h-full text-white p-6 justify-between items-center bg-blue-900/50">
            <div className="w-full text-center">
                <p className="text-lg text-blue-200">Próxima Serie: {nextSet}</p>
                <p className="text-2xl font-bold">{nextExercise}</p>
            </div>

            <div className="flex flex-col items-center">
                 <p className="text-lg text-blue-200">DESCANSO</p>
                <p className="text-9xl font-bold">{countdown}</p>
                <p className="text-2xl text-blue-200">segundos</p>
            </div>
            
            <div className="w-full space-y-4">
                 <Progress value={progress} className="h-2 bg-white/20 [&>*]:bg-accent" />
                 <Button onClick={onSkip} className="w-full h-14 text-lg" variant="secondary">Saltar Descanso</Button>
            </div>
        </div>
    );
}


export default function WorkoutPage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const [routine, setRoutine] = useState<Routine | null>(null);

    const [status, setStatus] = useState<'exercising' | 'resting' | 'finished'>('exercising');
    const [exerciseIndex, setExerciseIndex] = useState(0);
    const [setIndex, setSetIndex] = useState(1); // 1-based index for display
    const [workoutLog, setWorkoutLog] = useState<any[]>([]);

    useEffect(() => {
        const foundRoutine = findRoutine(params.id);
        if (foundRoutine) {
            setRoutine(foundRoutine);
        } else {
            router.push('/routine'); // Redirect if routine not found
        }
    }, [params.id, router]);

    const handleCompleteSet = (log: { weight: number, reps: number }) => {
        setWorkoutLog(prev => [...prev, { ...log, exercise: currentExercise.name, set: setIndex }]);
        
        if (setIndex >= currentExercise.sets) { // Last set of this exercise
            if (exerciseIndex >= routine!.exercises.length - 1) { // Last exercise of routine
                setStatus('finished');
                 router.push('/workout/summary');
            } else { // Move to next exercise
                setExerciseIndex(prev => prev + 1);
                setSetIndex(1);
                setStatus('resting'); // Rest before next exercise
            }
        } else { // Move to next set
            setSetIndex(prev => prev + 1);
            setStatus('resting');
        }
    };
    
    const handleTimerEnd = () => {
        setStatus('exercising');
    };

    if (!routine) {
        return <div className="flex h-full items-center justify-center bg-black text-white">Cargando rutina...</div>;
    }
    
    const currentExercise = routine.exercises[exerciseIndex];
    const nextExercise = routine.exercises[setIndex >= currentExercise.sets ? exerciseIndex + 1 : exerciseIndex];

    if (status === 'exercising') {
        return (
             <div className="w-full h-full bg-black relative">
                 <Button onClick={() => router.push('/routine')} variant="ghost" size="icon" className="absolute top-6 left-4 z-10 text-white"><X/></Button>
                 <ActiveExerciseView 
                    exercise={currentExercise}
                    currentSet={setIndex}
                    onCompleteSet={handleCompleteSet}
                />
             </div>
        )
    }

    if (status === 'resting') {
        return (
            <RestView
                restTime={currentExercise.rest}
                nextExercise={nextExercise?.name || "Último ejercicio"}
                nextSet={setIndex}
                onTimerEnd={handleTimerEnd}
                onSkip={handleTimerEnd}
            />
        )
    }

    return null; // Should be redirected by the 'finished' status
}

