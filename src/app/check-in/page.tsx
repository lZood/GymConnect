
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import MobileLayout from '@/components/mobile-layout';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function CheckInPage() {
  const router = useRouter();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Acceso a la cámara denegado',
          description: 'Por favor, activa los permisos de la cámara en tu navegador.',
        });
      }
    };

    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    }
  }, [toast]);

  // Simulate scanning a QR code
  useEffect(() => {
    if (hasCameraPermission) {
      const timer = setTimeout(() => {
        setScanComplete(true);
        toast({
          title: '¡Check-in Exitoso!',
          description: 'Has ganado +15 GymPoints.',
          className: 'bg-green-500 border-green-500 text-white',
        });
        setTimeout(() => router.push('/home'), 2000);
      }, 3000); 

      return () => clearTimeout(timer);
    }
  }, [hasCameraPermission, router, toast]);

  return (
    <MobileLayout>
      <div className="relative flex flex-col h-full bg-black text-white">
        <div className="absolute top-4 left-4 z-20">
          <Button onClick={() => router.back()} variant="ghost" size="icon" className="rounded-full bg-black/50 hover:bg-black/70">
            <ArrowLeft />
          </Button>
        </div>

        <div className="relative flex-1 flex items-center justify-center overflow-hidden">
          <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />

          {!scanComplete && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
              <div className="w-64 h-64 border-4 border-dashed border-white/80 rounded-2xl animate-pulse" />
              <p className="mt-6 text-lg font-semibold">Apunta al código QR</p>
            </div>
          )}
          
          {scanComplete && (
             <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-primary/80 to-black/80 backdrop-blur-sm z-10 transition-opacity duration-500">
                <CheckCircle className="h-24 w-24 text-green-400 animate-bounce" />
                <h1 className="text-3xl font-bold mt-4">¡Check-in Confirmado!</h1>
             </div>
          )}
        </div>

        {hasCameraPermission === false && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
             <Alert variant="destructive" className="max-w-sm">
              <AlertTitle>Acceso a la Cámara Requerido</AlertTitle>
              <AlertDescription>
                Por favor, permite el acceso a la cámara para poder hacer check-in.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </MobileLayout>
  );
}
