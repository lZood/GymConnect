
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Award, BarChart, Trophy } from 'lucide-react';

export default function WorkoutSummaryPage() {
    const router = useRouter();
    
    return (
        <div className="flex flex-col h-full items-center justify-center text-white p-8 bg-gradient-to-b from-primary/50 to-black text-center">
            
            <Trophy className="h-24 w-24 text-yellow-400 mb-6" />

            <h1 className="text-4xl font-bold mb-2">¡Rutina Completada!</h1>
            <p className="text-xl text-muted-foreground mb-8">¡Gran trabajo! Has ganado 250 GymPoints.</p>
            
            <div className="bg-card/50 rounded-xl p-6 w-full max-w-sm space-y-4 mb-10">
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Duración Total</span>
                    <span className="font-bold">45:12 min</span>
                </div>
                 <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Volumen Total</span>
                    <span className="font-bold">4,250 kg</span>
                </div>
                 <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Nuevos Récords</span>
                    <span className="font-bold">1 PR</span>
                </div>
            </div>

            <div className="w-full max-w-sm space-y-3">
                <Button className="w-full h-12 text-lg bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Award className="mr-2" />
                    Compartir Logro
                </Button>
                <Button onClick={() => router.push('/home')} className="w-full h-12 text-lg" variant="secondary">
                     <BarChart className="mr-2" />
                    Volver al Inicio
                </Button>
            </div>

        </div>
    );
}
