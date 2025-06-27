
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GymAdminPage() {
  return (
    <div className="w-full h-full bg-background flex items-center justify-center">
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">Panel de Admin de Gimnasio</h1>
            <p className="text-muted-foreground mb-8">
                Bienvenido al panel de gestión de tu gimnasio.
            </p>
            <Link href="/" passHref>
                <Button variant="secondary">Cerrar Sesión</Button>
            </Link>
        </div>
    </div>
  );
}
