"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Chrome } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("[v0] Email login attempt:", { email })
    setIsLoading(false)
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    // Simulate OAuth flow
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("[v0] Google login attempt")
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white text-2xl font-bold">
              DC
            </div>
          </div>
          <h1 className="text-3xl font-bold text-cyan-500 mb-2">Análisis de Churn</h1>
          <p className="text-slate-400">Ingresa a tu cuenta para continuar</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800/80 border border-cyan-500/20 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
          <form onSubmit={handleEmailLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300 font-semibold">
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="bg-slate-900/60 border-cyan-500/30 text-slate-200 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/50 h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300 font-semibold">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="bg-slate-900/60 border-cyan-500/30 text-slate-200 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500/50 h-12"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400">
                <input
                  type="checkbox"
                  className="rounded border-cyan-500/30 bg-slate-900/60 text-cyan-500 focus:ring-cyan-500/50"
                />
                <span>Recordarme</span>
              </label>
              <a href="#" className="text-cyan-500 hover:text-cyan-400 transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold uppercase tracking-wide shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:-translate-y-0.5"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Iniciando sesión...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>Iniciar Sesión</span>
                </div>
              )}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-800/80 px-2 text-slate-500">O continuar con</span>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            variant="outline"
            className="w-full h-12 bg-slate-900/60 border-cyan-500/30 text-slate-200 hover:bg-slate-900/80 hover:border-cyan-500/50 hover:text-white transition-all duration-300"
          >
            <Chrome className="w-5 h-5 mr-2" />
            Continuar con Google
          </Button>

          <div className="mt-6 text-center text-sm text-slate-400">
            ¿No tienes una cuenta?{" "}
            <a href="#" className="text-cyan-500 hover:text-cyan-400 font-semibold transition-colors">
              Regístrate aquí
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          Al continuar, aceptas nuestros{" "}
          <a href="#" className="text-cyan-500 hover:text-cyan-400">
            Términos de Servicio
          </a>{" "}
          y{" "}
          <a href="#" className="text-cyan-500 hover:text-cyan-400">
            Política de Privacidad
          </a>
        </p>
      </div>
    </div>
  )
}
