
'use client'

import Link from 'next/link';
import { findUserById, challenges } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

type Challenge = (typeof challenges)[0] & { endsIn?: number };

export default function FriendProfilePage() {
  const params = useParams<{ id: string }>();
  const friend = findUserById(params.id);
  
  const [mutualChallenges, setMutualChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    setMutualChallenges(
      challenges.slice(0, 2).map(c => ({...c, endsIn: Math.floor(Math.random() * 10) + 5 }))
    );
  }, []);

  if (!friend) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-4">
        <p className="text-xl mb-4">Amigo no encontrado.</p>
        <Link href="/community">
          <Button>Volver a Comunidad</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-card/10">
      <div className="p-4 pt-8 flex items-center sticky top-0 bg-background/80 backdrop-blur-sm z-10">
        <Link href="/community" className="p-2 -ml-2">
            <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold text-center flex-1 pr-8">Perfil de Amigo</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-6">
        <div className="flex flex-col items-center text-center space-y-3 pt-6">
          <Avatar className="h-28 w-28 border-4 border-background ring-4 ring-primary">
            <AvatarImage src={friend.profilePicture} alt={friend.name} data-ai-hint="profile picture" />
            <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-3xl font-bold">{friend.name}</h2>
          <p className="text-muted-foreground">Entusiasta del Fitness</p>
          <p className="text-sm text-muted-foreground">Se unió {friend.joinedDate}</p>
          <Button className="w-full max-w-xs rounded-full mt-2">Seguir</Button>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
            <Card className="bg-background p-3 rounded-xl shadow-lg">
                <p className="text-3xl font-bold">{friend.stats.workouts}</p>
                <p className="text-xs text-muted-foreground">Entrenos</p>
            </Card>
             <Card className="bg-background p-3 rounded-xl shadow-lg">
                <p className="text-3xl font-bold">{friend.stats.friends}</p>
                <p className="text-xs text-muted-foreground">Amigos</p>
            </Card>
             <Card className="bg-background p-3 rounded-xl shadow-lg">
                <p className="text-3xl font-bold">{friend.stats.challenges}</p>
                <p className="text-xs text-muted-foreground">Retos</p>
            </Card>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-3">Logros</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 text-center">
                  {friend.achievements.map((achievement) => {
                      const Icon = achievement.icon;
                      return (
                        <div key={achievement.id} className="flex flex-col items-center gap-2 p-3 bg-background rounded-xl shadow-lg aspect-square justify-center">
                            <div className="p-2 bg-muted rounded-full">
                                <Icon className="h-8 w-8 text-accent" />
                            </div>
                            <p className="text-xs font-semibold leading-tight">{achievement.title}</p>
                        </div>
                      )
                  })}
            </div>
        </div>

        <div>
            <h3 className="text-xl font-bold mb-3">Retos Mutuos</h3>
            <div className="space-y-3">
            {mutualChallenges.map((challenge) => (
              <Card key={challenge.id} className="p-4 flex items-center gap-4 bg-background rounded-xl shadow-lg">
                  <div className="p-3 bg-muted rounded-lg">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">{challenge.title}</p>
                    <p className="text-sm text-muted-foreground">Termina en {challenge.endsIn} días</p>
                  </div>
              </Card>
            ))}
            </div>
        </div>
        <div className="h-4"></div>
      </div>
    </div>
  );
}
