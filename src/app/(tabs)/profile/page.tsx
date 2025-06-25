import Image from 'next/image';
import { user } from '@/lib/mock-data';
import PageHeader from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Edit, Bell, LogOut, ChevronRight, Star } from 'lucide-react';
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
        </div>

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
            {menuItems.map((item, index) => (
                <Link href={item.href} key={index} className="flex items-center justify-between p-4 bg-card rounded-lg transition-colors hover:bg-muted/50 cursor-pointer">
                    <div className="flex items-center gap-4">
                        <item.icon className="h-5 w-5 text-primary" />
                        <span>{item.text}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
            ))}
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
