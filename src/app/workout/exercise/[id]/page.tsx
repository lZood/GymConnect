'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { allExercises } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { X, Check } from 'lucide-react';
import { Card } from '@/components/ui/card';

type ExerciseDetails = typeof allExercises[0];

// Active Exercise View Component
function ActiveExerciseView({
    exercise,
    currentSet,
    onCompleteSet
}: {
    exercise: ExerciseDetails,
    currentSet: number,
    onCompleteSet: () => void
}) {
    return (
        <div className="flex flex-col h-full text-white p-6 justify-between">
            <div>
                <h1 className="text-4xl font-bold">{exercise.name}</h1>
                <p className="text-muted-foreground text-lg">Objetivo: 10 Repeticiones</p>
                
                 <Card className="text-center bg-card/50 p-2 mt-4">
                    <span className="text-sm text-muted-foreground">
                        Último peso: <span className="font-bold text-foreground">{exercise.lastWeight}kg</span> | Tu Récord: <span className="font-bold text-accent">{exercise.personalRecord}kg</span>
                    </span>
                </Card>
            </div>

            <div className="text-center my-8">
                <p className="text-muted-foreground">SERIE</p>
                <p className="text-8xl font-bold">{currentSet} <span className="text-4xl text-muted-foreground">/ 4</span></p>
            </div>

            <div className="space-y-4">
                <Button onClick={onCompleteSet} className="w-full h-24 text-2xl rounded-full bg-green-500 hover:bg-green-600">
                    <Check className="mr-2 h-10 w-10"/>
                    Serie Completada
                </Button>
            </div>
        </div>
    );
}

// Rest View Component
function RestView({
    restTime,
    nextSet,
    onTimerEnd,
    onSkip
}: {
    restTime: number,
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
                 <p className="text-2xl font-bold text-blue-200">Próxima: Serie {nextSet} de 4</p>
            </div>

            <div className="flex flex-col items-center">
                 <p className="text-lg text-blue-200">DESCANSO</p>
                <p className="text-9xl font-bold">{countdown}</p>
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
    const [exercise, setExercise] = useState<ExerciseDetails | null>(null);

    const [status, setStatus] = useState<'exercising' | 'resting'>('exercising');
    const [setIndex, setSetIndex] = useState(1); // 1-based index for display
    const totalSets = 4; // Hardcoded for prototype
    const restTime = 90; // Hardcoded for prototype

    useEffect(() => {
        const foundExercise = allExercises.find(e => e.id === params.id);
        if (foundExercise) {
            setExercise(foundExercise);
        } else {
            router.push('/routine/today'); // Redirect if exercise not found
        }
    }, [params.id, router]);

    const handleCompleteSet = () => {
      if (setIndex >= totalSets) { // Last set
        // In a real app, you'd log the completed exercise here.
        router.back(); // Go back to the checklist
      } else { // Move to rest
        setStatus('resting');
      }
    };
    
    const handleTimerEnd = () => {
        setSetIndex(prev => prev + 1);
        setStatus('exercising');
    };

    if (!exercise) {
        return <div className="flex h-full items-center justify-center bg-black text-white">Cargando ejercicio...</div>;
    }

    if (status === 'exercising') {
        return (
             <div className="w-full h-full bg-black relative">
                 <Button onClick={() => router.back()} variant="ghost" size="icon" className="absolute top-6 left-4 z-10 text-white"><X/></Button>
                 <ActiveExerciseView 
                    exercise={exercise}
                    currentSet={setIndex}
                    onCompleteSet={handleCompleteSet}
                />
             </div>
        )
    }

    if (status === 'resting') {
        return (
            <RestView
                restTime={restTime}
                nextSet={setIndex + 1}
                onTimerEnd={handleTimerEnd}
                onSkip={handleTimerEnd}
            />
        )
    }

    return null;
}
