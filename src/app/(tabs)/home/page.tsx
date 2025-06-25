import Link from 'next/link';
import { CheckCircle2, Flame, TrendingUp, Users, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/page-header';
import { WeightProgressChart } from '@/components/charts';
import { user, weightProgress, friends } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function HomePage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader
        title={`¡Hola, ${user.name}!`}
        subtitle="Listo para romperla hoy?"
        action={
          <Button variant="outline" size="sm" className="rounded-full">
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Check-in
          </Button>
        }
      />
      <div className="flex-1 overflow-y-auto px-4 space-y-4">
        <Link href="/routine" passHref>
          <Card className="bg-primary/90 text-primary-foreground shadow-lg transition-transform active:scale-95 cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp />
                Rutina de Hoy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-2xl">Día de Pecho y Tríceps</p>
              <p>4 Ejercicios restantes</p>
            </CardContent>
          </Card>
        </Link>
        
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Flame className="text-orange-500" />
                Tu Racha
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-6xl font-bold">{user.streak}</p>
              <p className="text-muted-foreground text-sm">días</p>
            </CardContent>
          </Card>
           <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Trophy className="text-yellow-400" />
                GymPoints
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
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
          <CardContent className="space-y-4">
            {friends.map(friend => (
              <div key={friend.id} className="flex items-center justify-between">
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
            ))}
          </CardContent>
        </Card>

        <WeightProgressChart data={weightProgress} />
        
        <div className="h-4"></div>
      </div>
    </div>
  );
}
