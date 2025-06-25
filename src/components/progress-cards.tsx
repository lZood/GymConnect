'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { Lightbulb, Medal, Flame, TrendingUp, Ruler, Camera, PlusCircle } from 'lucide-react';
import type { DayPicker } from 'react-day-picker';
import { Button } from './ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from '@/hooks/use-toast';


function TakeMeasurementsSheet({
  initialMeasurements
}: {
  initialMeasurements: Record<string, number>;
}) {
  const { toast } = useToast();
  const [measurements, setMeasurements] = useState(initialMeasurements);

  const handleSave = () => {
    toast({
      title: "Medidas Guardadas",
      description: "Tu progreso ha sido actualizado con éxito.",
    });
  };

  const handleChange = (key: string, value: string) => {
    const numValue = value === '' ? 0 : parseInt(value, 10);
    if (!isNaN(numValue)) {
      setMeasurements((prev) => ({ ...prev, [key]: numValue }));
    }
  };
  
  const measurementLabels: Record<string, string> = {
    altura: 'Altura (cm)',
    pecho: 'Pecho (cm)',
    cintura: 'Cintura (cm)',
    caderas: 'Caderas (cm)',
    biceps: 'Bíceps (cm)',
    muslo: 'Muslo (cm)',
  }

  return (
    <>
      <SheetHeader className="p-4 pb-2 text-left">
        <SheetTitle>Registrar Nuevas Medidas</SheetTitle>
        <SheetDescription>
          Actualiza tus medidas corporales para un seguimiento preciso.
        </SheetDescription>
      </SheetHeader>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.keys(measurementLabels).map((key) => (
          <div key={key}>
            <Label htmlFor={`measurement-${key}`}>{measurementLabels[key]}</Label>
            <Input
              id={`measurement-${key}`}
              type="number"
              value={measurements[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              placeholder={`Tu ${key} en cm`}
            />
          </div>
        ))}
      </div>
      <SheetFooter className="p-4 border-t">
        <SheetClose asChild>
            <Button onClick={handleSave} className="w-full">Guardar</Button>
        </SheetClose>
      </SheetFooter>
    </>
  );
}


type PRCalendarCardProps = {
  records: { date: string; exercise: string; value: string }[];
};

export function PRCalendarCard({ records }: PRCalendarCardProps) {
  const prDates = records.map(r => new Date(r.date));
  const prsByDate = records.reduce((acc, record) => {
    const date = new Date(record.date).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(record);
    return acc;
  }, {} as Record<string, typeof records>);

  const prModifier = { pr: prDates };

  const PrDayTooltip: React.FC<{ displayMonth: Date, date: Date }> = ({ date }) => {
    const prs = prsByDate[date.toDateString()];
    if (!prs) return <div className="p-0"></div>;

    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative flex items-center justify-center h-full">
              {new Date().getDate() === date.getDate() ? 
                <div className="absolute h-full w-full rounded-md bg-accent text-accent-foreground flex items-center justify-center">{date.getDate()}</div> :
                 <span>{date.getDate()}</span>
              }
              <Flame className="absolute h-3 w-3 -top-0.5 -right-0.5 text-orange-500 fill-orange-400" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="font-bold mb-1">¡Nuevo(s) Récord(s)!</p>
            <ul className="list-disc pl-4">
              {prs.map((pr, i) => (
                <li key={i} className="text-xs">{pr.exercise}: {pr.value}</li>
              ))}
            </ul>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };
  
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>Calendario de Récords Personales</CardTitle>
        <CardDescription>Los días en llamas son días de PRs.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Calendar
          mode="single"
          selected={new Date()}
          modifiers={prModifier}
          modifiersClassNames={{ pr: '' }}
          components={{ Day: PrDayTooltip as React.ComponentType<React.PropsWithChildren<{ displayMonth: Date, date: Date } & Omit<React.HTMLProps<"div">, "date">>> }}
          className="p-0"
        />
      </CardContent>
    </Card>
  );
}


type ConsistencyCardProps = {
  completed: number;
  planned: number;
}
export function ConsistencyCard({ completed, planned }: ConsistencyCardProps) {
    const percentage = Math.round((completed / planned) * 100);
    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrendingUp/> Adherencia Semanal</CardTitle>
                <CardDescription>Porcentaje de entrenamientos planeados completados.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">{completed} de {planned} entrenamientos</span>
                    <span className="font-bold text-primary text-lg">{percentage}%</span>
                </div>
                 <Progress value={percentage} />
            </CardContent>
        </Card>
    )
}

type BodyMeasurementsCardProps = {
  measurements: Record<string, number>;
}
export function BodyMeasurementsCard({ measurements }: BodyMeasurementsCardProps) {
    const measurementLabels: Record<string, string> = {
      altura: 'Altura',
      pecho: 'Pecho',
      cintura: 'Cintura',
      caderas: 'Caderas',
      biceps: 'Bíceps',
      muslo: 'Muslo',
    }
    const displayOrder = ['altura', 'pecho', 'cintura', 'caderas', 'biceps', 'muslo'];
    
    return (
        <Sheet>
            <Card className="shadow-lg">
                 <CardHeader className="flex-row items-start justify-between pb-4">
                    <div>
                        <CardTitle className="flex items-center gap-2"><Ruler/> Medidas Corporales</CardTitle>
                        <CardDescription>Último registro: {new Date().toLocaleDateString('es-ES')}</CardDescription>
                    </div>
                     <SheetTrigger asChild>
                        <Button variant="secondary" size="sm">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Añadir
                        </Button>
                     </SheetTrigger>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-3 gap-x-4 gap-y-2 text-center">
                        {displayOrder.map((key) => measurements[key] !== undefined && (
                            <div key={key} className="bg-muted/50 p-2 rounded-md">
                                <p className="font-bold text-lg">{measurements[key]}<span className="text-sm text-muted-foreground">&nbsp;cm</span></p>
                                <p className="text-xs capitalize text-muted-foreground">{measurementLabels[key]}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            <SheetContent side="bottom" className="h-[85%] flex flex-col p-0">
                <TakeMeasurementsSheet initialMeasurements={measurements} />
            </SheetContent>
        </Sheet>
    )
}

export function SmartInsightCard() {
    return (
        <Card className="shadow-lg border-primary/50">
            <CardHeader className="flex-row items-center gap-4">
                <Lightbulb className="h-8 w-8 text-primary" />
                <div>
                    <CardTitle className="text-lg">Análisis Inteligente</CardTitle>
                    <CardDescription>Notamos que tu récord en Press de Banca no ha cambiado en 3 semanas. ¡Prueba una serie descendente para romper la meseta!</CardDescription>
                </div>
            </CardHeader>
        </Card>
    )
}


export function ProgressPhotosCard() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Camera/> Fotos de Progreso</CardTitle>
        <CardDescription>Compara tu evolución visual.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden border">
           <Image src="https://placehold.co/300x400" layout="fill" objectFit="cover" alt="Foto de progreso anterior" data-ai-hint="fitness progress" />
           <p className="absolute bottom-1 left-2 text-xs bg-black/50 text-white px-2 py-1 rounded">01 Ene, 2024</p>
        </div>
         <div className="relative aspect-[3/4] w-full rounded-lg overflow-hidden border">
           <Image src="https://placehold.co/300x400" layout="fill" objectFit="cover" alt="Foto de progreso actual" data-ai-hint="fitness progress" />
            <p className="absolute bottom-1 left-2 text-xs bg-black/50 text-white px-2 py-1 rounded">25 Jun, 2024</p>
        </div>
      </CardContent>
    </Card>
  )
}
