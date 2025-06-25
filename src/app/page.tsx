"use client"

import Link from "next/link"
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

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor, introduce un email válido.",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres.",
  }),
})

export default function OnboardingPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, you'd handle authentication here.
    // For now, we'll just log the values.
    console.log(values)
    // On successful login, you would redirect. For this demo, the Link acts as navigation.
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
            <Link href="/home" passHref legacyBehavior>
                <Button type="submit" className="w-full !mt-8 h-12 rounded-full font-bold text-lg" asChild>
                    <a>Iniciar Sesión</a>
                </Button>
            </Link>
          </form>
        </Form>
        <div className="mt-6 text-center text-sm">
          <p className="text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <Link href="#" className="text-primary hover:underline">
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
