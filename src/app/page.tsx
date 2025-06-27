
"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Dumbbell } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import MobileLayout from "@/components/mobile-layout"
import { supabase } from "@/lib/supabaseClient"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor, introduce un email válido.",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres.",
  }),
})

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Paso 1: Autenticación del Usuario
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (authError || !authData.user) {
      toast({
        variant: "destructive",
        title: "Error de autenticación",
        description: authError?.message || "Credenciales incorrectas.",
      });
      console.error("Login Error:", authError?.message);
      return;
    }
    
    const user = authData.user;
    console.log("Login exitoso. Usuario autenticado:", user);


    // Paso 2: Verificación de Rol (La Cascada de Permisos)

    // A. ¿Es un Super Administrador?
    console.log("Verificando si es Super Admin...");
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('platform_role')
      .eq('id', user.id)
      .single();

    if (profileError && profileError.code !== 'PGRST116') { // PGRST116: No rows found
        console.error("Error al consultar la tabla 'profiles':", profileError);
        toast({ variant: "destructive", title: "Error de Perfil", description: "No se pudo verificar el rol del usuario. Revisa los permisos (RLS) de la tabla 'profiles'." });
        return;
    }
    console.log("Respuesta de la tabla 'profiles':", profile);

    if (profile?.platform_role === 'superadmin') {
      console.log(`Rol verificado: Super Administrador (platform_role: ${profile.platform_role}). Redirigiendo a /platform-admin.`);
      toast({ title: "Bienvenido, Super Admin" });
      router.push('/platform-admin');
      return;
    }
    console.log("El usuario no es Super Admin. Verificando si es Admin de Gimnasio...");

    // B. ¿Es un Administrador de Gimnasio?
    const { data: memberships, error: membershipError } = await supabase
      .from('gym_memberships')
      .select('role')
      .eq('user_id', user.id)
      .in('role', ['owner', 'admin']);

    if (membershipError) {
      console.error("Error al consultar la tabla 'gym_memberships':", membershipError);
      toast({ variant: "destructive", title: "Error de Permisos", description: "No se pudieron verificar los permisos de gimnasio. Revisa los permisos (RLS) de la tabla 'gym_memberships'." });
      return;
    }
    console.log("Respuesta de la tabla 'gym_memberships':", memberships);

    if (memberships && memberships.length > 0) {
      const adminRole = memberships[0].role;
      console.log(`Rol verificado: Administrador de Gimnasio (gym_memberships.role: ${adminRole}). Redirigiendo a /gym-admin.`);
      toast({ title: "Bienvenido, Administrador" });
      router.push('/gym-admin');
      return;
    }
    console.log("El usuario no es Admin de Gimnasio.");

    // C. Es un Miembro Regular
    console.log("Rol verificado: Usuario Regular. Redirigiendo a /home.");
    toast({
        title: "¡Inicio de Sesión Exitoso!",
        description: "Bienvenido de nuevo.",
        className: 'bg-green-500 border-green-500 text-white',
    });
    router.push('/home');
  }

  return (
    <MobileLayout>
      <div className="flex h-full flex-col items-center justify-center p-8">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="bg-primary rounded-full p-4 mb-4">
            <Dumbbell className="h-12 w-12 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold font-headline">GymConnect</h1>
          <p className="text-muted-foreground">Inicia sesión para continuar</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="tu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full !mt-8 h-12 rounded-full font-bold text-lg">
                Iniciar Sesión
            </Button>
          </form>
        </Form>
        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <Link href="/onboarding" className="text-primary hover:underline font-bold">
              Crear cuenta
            </Link>
          </p>
          <Link href="#" className="text-muted-foreground hover:underline mt-2 inline-block">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
      </div>
    </MobileLayout>
  )
}
