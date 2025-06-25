import Link from 'next/link';
import { CheckCircle2, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/page-header';
import { WeightProgressChart } from '@/components/charts';
import { user, weightProgress } from '@/lib/mock-data';

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
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Star className="text-yellow-400" />
              Tu Racha
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-6xl font-bold">{user.streak}</p>
            <p className="text-muted-foreground">días de racha. ¡Sigue así!</p>
          </CardContent>
        </Card>

        <WeightProgressChart data={weightProgress} />
        
        <div className="h-4"></div>
      </div>
    </div>
  );
}
