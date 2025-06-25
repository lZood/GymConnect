'use client';

import { user } from '@/lib/mock-data';
import PageHeader from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit, Bell, LogOut, ChevronRight, Star, Trophy } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
    { icon: Edit, text: "Editar Perfil", href:"#" },
    { icon: Bell, text: "Notificaciones", href:"#" },
]

export default function ProfilePage() {
  return (
    <div className="flex flex-col h-full">
      <PageHeader title="Perfil" />
      <div className="flex-1 overflow-y-auto px-4 space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <Avatar className="h-24 w-24 border-2 border-primary">
            <AvatarImage src={user.profilePicture} alt={user.name} data-ai-hint="profile picture" />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-muted-foreground">{user.email}</p>
          <div className="flex items-center gap-2 mt-2 rounded-full bg-card px-4 py-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            <span className="font-bold text-lg">{user.gymPoints.toLocaleString()}</span>
            <span className="text-muted-foreground">GymPoints</span>
        </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
              <CardTitle className="text-lg">Muro de la Fama</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 text-center">
                  {user.achievements.map((achievement) => {
                      const Icon = achievement.icon;
                      return (
                        <div key={achievement.id} className="flex flex-col items-center gap-1.5">
                            <div className="p-3 bg-muted rounded-full border-2 border-accent/50">
                                <Icon className="h-8 w-8 text-accent" />
                            </div>
                            <p className="text-xs font-semibold leading-tight">{achievement.title}</p>
                            <p className="text-xs text-muted-foreground">{new Date(achievement.date).toLocaleDateString('es-ES', { year: '2-digit', month: 'short', day: 'numeric' })}</p>
                        </div>
                      )
                  })}
              </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-primary/80 to-accent/80 text-primary-foreground shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Star />
                Suscripción
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-lg">{user.subscription.plan}</p>
            <p>Vence el: {new Date(user.subscription.endDate).toLocaleDateString()}</p>
          </CardContent>
        </Card>
        
        <div className="space-y-2">
            {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                    <Link href={item.href} key={index} className="flex items-center justify-between p-4 bg-card rounded-lg transition-colors hover:bg-muted/50 cursor-pointer">
                        <div className="flex items-center gap-4">
                            <Icon className="h-5 w-5 text-primary" />
                            <span>{item.text}</span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    </Link>
                )
            })}
        </div>

        <Link href="/" passHref>
             <Button variant="destructive" className="w-full rounded-full">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
            </Button>
        </Link>
        <div className="h-4"></div>
      </div>
    </div>
  );
}
