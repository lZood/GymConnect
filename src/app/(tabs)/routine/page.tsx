'use client';

import Link from 'next/link';
import PageHeader from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { user } from '@/lib/mock-data';
import { Dumbbell, PlusCircle, Calendar, Pencil, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

function WeeklyCalendar() {
  const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  const today = new Date().getDay(); // Sunday is 0, Monday is 1, etc.
  // Adjust so Monday is 0
  const todayIndex = (today === 0) ? 6 : today - 1; 
  
  // This is a placeholder. In a real app, you'd get this from user data.
  const assignedDays = [0, 2, 4]; // L, X, V

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Esta Semana</CardTitle>
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-7 w-7"><ChevronLeft/></Button>
            <Button variant="outline" size="icon" className="h-7 w-7"><ChevronRight/></Button>
        </div>
      </CardHeader>
      <CardContent className="flex justify-around">
        {weekDays.map((day, index) => (
          <div key={day} className="flex flex-col items-center gap-2">
            <span className="text-sm text-muted-foreground">{day}</span>
            <div className={cn("h-8 w-8 rounded-full flex items-center justify-center border",
               todayIndex === index ? "bg-primary text-primary-foreground border-primary" : "bg-card"
            )}>
              {assignedDays.includes(index) && <Dumbbell className={cn("h-4 w-4", todayIndex !== index && "text-primary")} />}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default function RoutinePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title="Mis Rutinas"
        subtitle="Organiza y ejecuta tus entrenamientos"
      />
      <div className="flex-1 overflow-y-auto px-4 space-y-6">
        
        <WeeklyCalendar />

        <Link href="/routine/today">
           <Card className="shadow-lg border-primary/50 cursor-pointer hover:border-primary transition-colors">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="text-primary"/>
                    Entrenamiento de Hoy
                  </CardTitle>
                  <CardDescription>{user.customRoutines[0].name}</CardDescription>
                </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Listo para empezar tu sesión de hoy. ¡Vamos a por ello!</p>
              </CardContent>
            </Card>
        </Link>
        

        {user.customRoutines.map((customRoutine) => (
          <Card key={customRoutine.id} className="shadow-lg relative">
            <Button variant="ghost" size="icon" className="absolute top-2 right-2">
                <Pencil className="h-4 w-4" />
            </Button>
            <CardHeader>
              <CardTitle>{customRoutine.name}</CardTitle>
               <div className="flex gap-2 pt-1">
                {customRoutine.days.map(day => <Badge key={day} variant="secondary">{day}</Badge>)}
               </div>
            </CardHeader>
            <CardContent>
               <p className="text-sm text-muted-foreground mb-4">{customRoutine.description}</p>
              <Button onClick={() => router.push('/routine/today')} variant="outline" className="w-full">
                Ver Ejercicios
              </Button>
            </CardContent>
          </Card>
        ))}
        
        <Button onClick={() => router.push('/routine/create')} className="w-full h-14" variant="secondary">
          <PlusCircle className="mr-2 h-5 w-5" />
          Crear Nueva Rutina
        </Button>

        <div className="h-4"></div>
      </div>
    </div>
  );
}
