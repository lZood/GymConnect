// src/lib/supabaseClient.ts
// Este archivo configura y exporta el cliente de Supabase para toda la aplicación.

import { createClient } from '@supabase/supabase-js';

// Tipos para las variables de entorno para mayor seguridad y autocompletado.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Verificación para asegurar que las variables de entorno estén definidas.
if (!supabaseUrl) {
  throw new Error("La URL de Supabase no está definida en las variables de entorno (NEXT_PUBLIC_SUPABASE_URL)");
}
if (!supabaseAnonKey) {
  throw new Error("La llave anónima de Supabase no está definida en las variables de entorno (NEXT_PUBLIC_SUPABASE_ANON_KEY)");
}

// Creación del cliente de Supabase.
// Este objeto 'supabase' será tu puerta de entrada para todas las interacciones
// con tu base de datos (leer, escribir, actualizar, eliminar datos).
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
