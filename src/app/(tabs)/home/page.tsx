
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Flame, Users, Trophy, Award, Target, History, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import PageHeader from '@/components/page-header';
import { WeightProgressChart } from '@/components/charts';
import { user, weightProgress, friends } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

export default function HomePage() {
  const router = useRouter();
  const nextRoutine = user.customRoutines[0];

  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title={`¡Hola, ${user.name}!`}
        subtitle="Listo para romperla hoy?"
        action={
          <Button variant="outline" size="sm" className="rounded-full" onClick={() => router.push('/check-in')}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Check-in
          </Button>
        }
      />
      <div className="flex-1 overflow-y-auto px-4 space-y-4">
        
        {user.newPr && (
          <Card className="shadow-lg bg-gradient-to-r from-yellow-400/20 via-amber-500/20 to-orange-500/20 border-amber-500">
            <CardHeader className="flex-row items-center gap-4 space-y-0 p-4">
               <Award className="h-10 w-10 text-amber-500 shrink-0" />
               <div>
                  <CardTitle className="text-lg">¡Nuevo Récord!</CardTitle>
                  <p className="font-semibold text-card-foreground">{user.newPr.exercise}: {user.newPr.value}</p>
               </div>
            </CardHeader>
          </Card>
        )}

        {nextRoutine && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Próximo Entrenamiento</CardTitle>
              <CardDescription>{nextRoutine.name}</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-1 text-sm text-muted-foreground mb-4">
                  {nextRoutine.exercises.slice(0, 2).map((ex, i) => (
                    <li key={i} className="flex items-center gap-2">
                       <Dumbbell className="h-4 w-4" />
                       <span>{ex.name}</span>
                    </li>
                  ))}
                  {nextRoutine.exercises.length > 2 && <li className="pl-6">y más...</li>}
                </ul>
               <Button onClick={() => router.push('/routine/today')} className="w-full">
                  ¡Empezar Entrenamiento!
              </Button>
            </CardContent>
          </Card>
        )}
        
        <div className="grid grid-cols-2 gap-4">
            <Card className="shadow-lg">
                <CardHeader className="p-4">
                    <CardTitle className="flex items-center gap-2 text-base">
                        <Target className="text-primary"/>
                        Meta Semanal
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <p className="text-center text-3xl font-bold mb-2">{user.weeklyProgress.completed} <span className="text-xl text-muted-foreground">/ {user.weeklyProgress.goal}</span></p>
                    <Progress value={(user.weeklyProgress.completed / user.weeklyProgress.goal) * 100} />
                    <p className="text-xs text-center text-muted-foreground mt-1">entrenamientos</p>
                </CardContent>
            </Card>
             <Card className="shadow-lg">
                <CardHeader className="p-4">
                    <CardTitle className="flex items-center gap-2 text-base">
                        <History className="text-accent"/>
                        Última Sesión
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-center">
                    <p className="font-bold">{user.lastWorkoutSummary.duration}</p>
                    <p className="text-sm">{(user.lastWorkoutSummary.volume / 1000).toFixed(1)}k kg</p>
                </CardContent>
            </Card>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-lg">
            <CardHeader className="p-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <Flame className="text-orange-500" />
                Tu Racha
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-center">
              <p className="text-5xl font-bold">{user.streak}</p>
              <p className="text-muted-foreground text-sm">días</p>
            </CardContent>
          </Card>
           <Card className="shadow-lg">
            <CardHeader className="p-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <Trophy className="text-yellow-400" />
                GymPoints
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-center">
              <p className="text-4xl font-bold">{user.gymPoints.toLocaleString()}</p>
               <p className="text-muted-foreground text-sm">puntos</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="text-primary" />
              Rachas de Amigos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {friends.map(friend => (
              <Link href={`/friends/${friend.id}`} key={friend.id} className="block -m-2 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={friend.profilePicture} alt={friend.name} data-ai-hint="profile picture" />
                      <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="font-semibold">{friend.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-500" />
                    <span className="font-bold text-lg">{friend.streak}</span>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Button variant="secondary" onClick={() => router.push('/routine')}>
            <Dumbbell className="mr-2"/>
            Ver Todas Mis Rutinas
        </Button>

        <WeightProgressChart data={weightProgress} />
        
        <div className="h-4"></div>
      </div>
    </div>
  );
}
