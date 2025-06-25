
import PageHeader from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { challenges, leaderboard, friends } from '@/lib/mock-data';
import { Trophy, Flame, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ChallengesPage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Comunidad" subtitle="Compite, gana y conecta" />
      <div className="px-4 flex-1 flex flex-col min-h-0">
        <Tabs defaultValue="challenges" className="w-full flex flex-col flex-1 min-h-0">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="challenges">Desafíos</TabsTrigger>
            <TabsTrigger value="leaderboard">Clasificación</TabsTrigger>
            <TabsTrigger value="friends">Amigos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="challenges" className="flex-1 overflow-y-auto mt-4 space-y-4">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <challenge.icon className="h-6 w-6 text-primary" />
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
            ))}
            <div className="h-4" />
          </TabsContent>
          
          <TabsContent value="leaderboard" className="flex-1 overflow-y-auto mt-4 space-y-2">
            {[...leaderboard].sort((a,b) => a.rank - b.rank).map((user) => (
              <Link href={`/friends/${user.id}`} key={user.id} className="block">
                <div className="flex items-center gap-4 p-3 bg-card rounded-lg shadow-sm transition-colors hover:bg-muted/50 cursor-pointer">
                  <span className="font-bold text-xl w-8 text-center text-muted-foreground">{user.rank}.</span>
                  <Avatar className="h-12 w-12 border-2 border-primary/50">
                    <AvatarImage src={user.profilePicture} alt={user.name} data-ai-hint="profile picture" />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-bold">{user.name}</p>
                    <p className="text-sm text-primary font-semibold">{user.score.toLocaleString()} puntos</p>
                  </div>
                  {user.rank === 1 && <Trophy className="h-8 w-8 text-yellow-400" />}
                  {user.rank === 2 && <Trophy className="h-8 w-8 text-slate-400" />}
                  {user.rank === 3 && <Trophy className="h-8 w-8 text-amber-600" />}
                </div>
              </Link>
            ))}
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
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span>Racha de {friend.streak} días</span>
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
