
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, Calendar as CalendarIcon } from 'lucide-react';
import { format } from "date-fns"

import MobileLayout from '@/components/mobile-layout';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const goals = [
    { id: 'lose_weight', title: 'Perder Peso / Grasa Corporal' },
    { id: 'gain_muscle', title: 'Ganar Masa Muscular' },
    { id: 'improve_fitness', title: 'Mejorar Condición Física' },
    { id: 'increase_strength', title: 'Aumentar Fuerza' },
    { id: 'prepare_event', title: 'Prepararme para un evento' },
];

const experienceLevels = [
    { id: 'beginner', title: 'Principiante', description: "Soy nuevo/a en el gimnasio o vuelvo después de mucho tiempo." },
    { id: 'intermediate', title: 'Intermedio', description: "Llevo un tiempo entrenando y conozco los ejercicios básicos." },
    { id: 'advanced', title: 'Avanzado', description: "Tengo mucha experiencia y sigo una estructura de entrenamiento definida." },
];


export default function OnboardingFlowPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
        dob: undefined as Date | undefined,
        gender: '',
        height: '',
        weight: '',
        goals: new Set<string>(),
        experience: '',
        frequency: 3,
        notifications: true,
    });

    const totalSteps = 6;
    const progress = (step / totalSteps) * 100;

    const nextStep = () => setStep(prev => (prev < totalSteps ? prev + 1 : prev));
    const prevStep = () => setStep(prev => (prev > 1 ? prev - 1 : prev));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGoalSelect = (goalId: string) => {
        setFormData(prev => {
            const newGoals = new Set(prev.goals);
            if (newGoals.has(goalId)) {
                newGoals.delete(goalId);
            } else {
                newGoals.add(goalId);
            }
            return { ...prev, goals: newGoals };
        });
    }
    
    const handleExperienceSelect = (levelId: string) => {
        setFormData(prev => ({ ...prev, experience: levelId }));
    }
    
    const handleFinish = () => {
      console.log('Onboarding data:', formData);
      toast({
          title: '¡Cuenta Creada!',
          description: 'Tu perfil ha sido configurado con éxito.',
      });
      router.push('/home');
    }

    return (
        <MobileLayout className="p-0">
            <div className="flex flex-col h-full">
                <div className="p-4 pt-8 sticky top-0 bg-background z-10 border-b">
                    <div className="flex items-center justify-between">
                         {step > 1 && (
                            <Button onClick={prevStep} variant="ghost" size="sm" className="-ml-2">
                                <ArrowLeft className="h-4 w-4"/>
                            </Button>
                        )}
                        <span className="text-sm text-muted-foreground font-semibold ml-auto">PASO {step} DE {totalSteps}</span>
                    </div>
                    <Progress value={progress} className="w-full h-1 mt-2" />
                </div>

                <div className="flex-1 overflow-y-auto px-6 pb-6 pt-6 space-y-6">
                    {step === 1 && (
                        <div>
                            <h1 className="text-2xl font-bold">Crea tu Cuenta</h1>
                            <p className="text-muted-foreground mb-6">Comencemos con lo básico para configurar tu perfil.</p>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="fullName">Nombre Completo</Label>
                                    <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Ej: Alex Smith"/>
                                </div>
                                 <div>
                                    <Label htmlFor="username">Nombre de Usuario</Label>
                                    <Input id="username" name="username" value={formData.username} onChange={handleInputChange} placeholder="Ej: alexsmith"/>
                                </div>
                                 <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="tu@email.com"/>
                                </div>
                                 <div>
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Input id="password" name="password" type="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••"/>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {step === 2 && (
                         <div>
                            <h1 className="text-2xl font-bold">Tu Punto de Partida</h1>
                            <p className="text-muted-foreground mb-6">Esta información nos ayuda a calcular tus métricas.</p>
                             <div className="space-y-4">
                                <div>
                                    <Label>Fecha de Nacimiento</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !formData.dob && "text-muted-foreground"
                                            )}
                                            >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {formData.dob ? format(formData.dob, "PPP", { weekStartsOn: 1 }) : <span>Elige una fecha</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                            mode="single"
                                            selected={formData.dob}
                                            onSelect={(date) => setFormData(prev => ({ ...prev, dob: date }))}
                                            initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div>
                                    <Label className="mb-2 block">Género</Label>
                                     <RadioGroup
                                        value={formData.gender}
                                        onValueChange={(value) => setFormData(prev => ({...prev, gender: value}))}
                                        className="grid grid-cols-3 gap-2"
                                    >
                                        <Button asChild variant={formData.gender === 'male' ? 'default' : 'outline'} className="cursor-pointer h-12"><Label htmlFor="male" className="w-full h-full flex items-center justify-center cursor-pointer">Masculino</Label></Button>
                                        <RadioGroupItem value="male" id="male" className="sr-only"/>
                                        <Button asChild variant={formData.gender === 'female' ? 'default' : 'outline'} className="cursor-pointer h-12"><Label htmlFor="female" className="w-full h-full flex items-center justify-center cursor-pointer">Femenino</Label></Button>
                                        <RadioGroupItem value="female" id="female" className="sr-only" />
                                        <Button asChild variant={formData.gender === 'other' ? 'default' : 'outline'} className="cursor-pointer h-12"><Label htmlFor="other" className="w-full h-full flex items-center justify-center cursor-pointer">No decir</Label></Button>
                                        <RadioGroupItem value="other" id="other" className="sr-only" />
                                    </RadioGroup>
                                </div>
                                 <div>
                                    <Label htmlFor="height">Altura (cm)</Label>
                                    <Input id="height" name="height" type="number" value={formData.height} onChange={handleInputChange} placeholder="Ej: 175"/>
                                </div>
                                 <div>
                                    <Label htmlFor="weight">Peso Inicial (kg)</Label>
                                    <Input id="weight" name="weight" type="number" value={formData.weight} onChange={handleInputChange} placeholder="Ej: 70" />
                                </div>
                             </div>
                         </div>
                    )}
                    
                    {step === 3 && (
                        <div>
                            <h1 className="text-2xl font-bold">¿Qué te Mueve?</h1>
                            <p className="text-muted-foreground mb-6">Selecciona tus objetivos principales. Puedes elegir varios.</p>
                            <div className="space-y-3">
                                {goals.map(goal => (
                                    <Card 
                                        key={goal.id} 
                                        onClick={() => handleGoalSelect(goal.id)}
                                        className={cn("p-4 flex items-center gap-4 cursor-pointer transition-all border-2",
                                            formData.goals.has(goal.id) ? "border-primary" : "border-card"
                                        )}
                                    >
                                        <div className={cn("h-6 w-6 rounded-md border flex items-center justify-center transition-colors",
                                            formData.goals.has(goal.id) ? "bg-primary text-primary-foreground border-primary" : "bg-muted"
                                        )}>
                                           {formData.goals.has(goal.id) && <Check className="h-4 w-4"/>}
                                        </div>
                                        <span className="font-semibold">{goal.title}</span>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div>
                            <h1 className="text-2xl font-bold">¿Cómo te Defines?</h1>
                            <p className="text-muted-foreground mb-6">Esto nos ayuda a adaptar las rutinas sugeridas.</p>
                            <div className="space-y-3">
                                {experienceLevels.map(level => (
                                    <Card
                                        key={level.id}
                                        onClick={() => handleExperienceSelect(level.id)}
                                        className={cn("p-4 cursor-pointer transition-all border-2",
                                            formData.experience === level.id ? "border-primary" : "border-card"
                                        )}
                                    >
                                        <p className="font-bold">{level.title}</p>
                                        <p className="text-sm text-muted-foreground">{level.description}</p>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div>
                            <h1 className="text-2xl font-bold">Define tu Compromiso</h1>
                            <p className="text-muted-foreground mb-6">Establece tus hábitos y te ayudaremos.</p>
                            <div className="space-y-6">
                                <Card className="p-4">
                                    <Label>¿Cuántos días a la semana planeas entrenar?</Label>
                                    <div className="flex justify-between mt-2">
                                        {[1, 2, 3, 4, 5, 6, 7].map(day => (
                                            <Button 
                                                key={day}
                                                variant={formData.frequency === day ? 'default' : 'outline'}
                                                size="icon"
                                                onClick={() => setFormData(prev => ({ ...prev, frequency: day }))}
                                                className="rounded-full"
                                            >
                                                {day}
                                            </Button>
                                        ))}
                                    </div>
                                </Card>
                                <Card className="flex items-center justify-between p-4">
                                    <div>
                                        <Label>Activar Notificaciones</Label>
                                        <p className="text-xs text-muted-foreground">Recibe recordatorios para mantenerte motivado/a.</p>
                                    </div>
                                    <Switch 
                                        checked={formData.notifications}
                                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, notifications: checked }))}
                                    />
                                </Card>
                            </div>
                        </div>
                    )}

                    {step === 6 && (
                        <div className="text-center flex flex-col items-center justify-center pt-10">
                            <div className="bg-primary rounded-full p-4 mb-4 animate-bounce">
                                <Check className="h-12 w-12 text-primary-foreground" />
                            </div>
                            <h1 className="text-3xl font-bold">¡Perfil Completo, {formData.username || 'Crack'}! 🔥</h1>
                            <p className="text-muted-foreground mt-2 max-w-sm">Hemos personalizado la app para ti. Estás listo/a para empezar a romper tus límites.</p>
                        </div>
                    )}

                </div>
                
                <div className="p-4 border-t sticky bottom-0 bg-background z-10">
                    {step < totalSteps && (
                        <Button onClick={nextStep} className="w-full h-12 rounded-full font-bold">Siguiente</Button>
                    )}
                     {step === totalSteps && (
                        <Button onClick={handleFinish} className="w-full h-12 rounded-full font-bold">Ir a mi Dashboard</Button>
                    )}
                </div>
            </div>
        </MobileLayout>
    )
}

    