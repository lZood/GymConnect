'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { challenges, leaderboard, friends, user } from '@/lib/mock-data';
import { Trophy, Flame, ChevronRight, Clock, ArrowUpCircle, ArrowDownCircle, MinusCircle } from 'lucide-react';
import PageHeader from '@/components/page-header';
import { cn } from '@/lib/utils';

export default function CommunityPage() {
  const currentUser = user;
  
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Comunidad" subtitle="Compite, gana y conecta" />
      <div className="px-4 flex-1 flex flex-col min-h-0">
        <Tabs defaultValue="leaderboard" className="w-full flex flex-col flex-1 min-h-0">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="challenges">Desafíos</TabsTrigger>
            <TabsTrigger value="leaderboard">Clasificación</TabsTrigger>
            <TabsTrigger value="friends">Amigos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="challenges" className="flex-1 overflow-y-auto mt-4 space-y-4">
            {challenges.map((challenge) => {
              const Icon = challenge.icon;
              return (
                <Card key={challenge.id} className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <Icon className="h-6 w-6 text-primary" />
                      {challenge.title}
                    </CardTitle>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-2 text-sm">
                      <span className="font-medium">{challenge.userProgress.toLocaleString()} / {challenge.goal.toLocaleString()} {challenge.metric}</span>
                      <span className="font-bold text-primary">{Math.round((challenge.userProgress / challenge.goal) * 100)}%</span>
                    </div>
                    <Progress value={(challenge.userProgress / challenge.goal) * 100} className="h-3" />
                    <Button className="w-full mt-4 rounded-full">Unirse al desafío</Button>
                  </CardContent>
                </Card>
              );
            })}
            <div className="h-4" />
          </TabsContent>
          
          <TabsContent value="leaderboard" className="flex-1 overflow-y-auto mt-4 space-y-2">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="text-yellow-400" />
                  {currentUser.league}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 text-sm pt-1">
                  <Clock className="h-4 w-4" />
                  La liga termina en: 3d 12h 5m
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="pt-2 space-y-2">
              {[...leaderboard].sort((a,b) => a.rank - b.rank).map((user, index) => {
                const totalUsers = leaderboard.length;
                const isPromotion = user.rank === 1; // Top 1 promotes
                const isRelegation = user.rank === totalUsers; // Last one relegates
                const isMaintenance = !isPromotion && !isRelegation;
                const isCurrentUser = user.id === currentUser.id;

                return (
                  <Link href={`/friends/${user.id}`} key={user.id} className="block">
                    <div className={cn(
                      "flex items-center gap-4 p-3 bg-card rounded-lg shadow-sm transition-colors hover:bg-muted/50 cursor-pointer border-l-4",
                      isPromotion && "border-green-500",
                      isMaintenance && "border-transparent",
                      isRelegation && "border-red-500",
                      isCurrentUser && "bg-primary/10 ring-1 ring-primary"
                    )}>
                      <span className="font-bold text-lg w-8 text-center text-muted-foreground">{user.rank}.</span>
                      <Avatar className="h-12 w-12 border-2 border-background">
                        <AvatarImage src={user.profilePicture} alt={user.name} data-ai-hint="profile picture" />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-bold">{user.name}</p>
                        <p className="text-sm text-primary font-semibold">{user.score.toLocaleString()} XP</p>
                      </div>
                      {isPromotion && <ArrowUpCircle className="h-6 w-6 text-green-500" />}
                      {isRelegation && <ArrowDownCircle className="h-6 w-6 text-red-500" />}
                    </div>
                  </Link>
                )
              })}
            </div>
            <div className="h-4" />
          </TabsContent>

          <TabsContent value="friends" className="flex-1 overflow-y-auto mt-4 space-y-2">
            {friends.map((friend) => (
              <Link href={`/friends/${friend.id}`} key={friend.id} className="block">
                <div className="flex items-center gap-4 p-3 bg-card rounded-lg shadow-sm transition-colors hover:bg-muted/50 cursor-pointer">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={friend.profilePicture} alt={friend.name} data-ai-hint="profile picture" />
                    <AvatarFallback>{friend.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-bold">{friend.name}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <div className="flex items-center gap-1.5">
                          <Trophy className="h-4 w-4 text-yellow-500" />
                          <span>{friend.league}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <span>Racha de {friend.streak} días</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-6 w-6 text-muted-foreground" />
                </div>
              </Link>
            ))}
             <div className="h-4" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
