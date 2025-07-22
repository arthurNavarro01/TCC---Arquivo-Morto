"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Archive } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular autenticação
    setTimeout(() => {
      console.log("Login attempt:", { email, password })
      // Definir cookie de autenticação
      document.cookie = "auth-token=fake-jwt-token; path=/; max-age=86400"
      // Redirecionar para o dashboard após login bem-sucedido
      router.push("/dashboard")
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen relative transition-all duration-500 bg-gradient-to-br from-gray-100/80 via-white/60 to-gray-200/80 dark:from-slate-900/80 dark:via-blue-900/60 dark:to-slate-800/80">
      {/* Efeito de vidro/espelho de fundo */}
      <div className="absolute inset-0 backdrop-blur-3xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-gray-300/10 dark:from-blue-500/10 dark:via-transparent dark:to-slate-600/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="relative w-full max-w-md transition-all duration-500 backdrop-blur-2xl border-0 bg-white/30 shadow-2xl shadow-gray-900/20 ring-1 ring-white/40 dark:bg-slate-800/20 dark:shadow-blue-900/30 dark:ring-blue-400/20">
          {/* Reflexo interno do card */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/40 via-transparent to-gray-200/20 dark:from-blue-400/10 dark:via-transparent dark:to-slate-600/5" />
          <div className="relative z-10">
            <CardHeader className="space-y-1 text-center">
              <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-gradient-to-r from-gray-600 to-gray-700 dark:from-blue-600 dark:to-blue-700">
                <Archive className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 dark:text-blue-100">
                Sistema de Arquivo Morto
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-blue-200/70">
                Escola FITO - Faça login para acessar o sistema
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-blue-200">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@fito.edu.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="transition-all duration-300 backdrop-blur-sm bg-white/40 border-gray-300/40 text-gray-900 placeholder:text-gray-500/70 focus:border-gray-400/60 focus:ring-gray-400/20 focus:bg-white/60 dark:bg-slate-700/30 dark:border-blue-400/30 dark:text-blue-100 dark:placeholder:text-blue-300/60 dark:focus:border-blue-400/60 dark:focus:ring-blue-400/20 dark:focus:bg-slate-600/40"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-blue-200">
                    Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10 transition-all duration-300 backdrop-blur-sm bg-white/40 border-gray-300/40 text-gray-900 placeholder:text-gray-500/70 focus:border-gray-400/60 focus:ring-gray-400/20 focus:bg-white/60 dark:bg-slate-700/30 dark:border-blue-400/30 dark:text-blue-100 dark:placeholder:text-blue-300/60 dark:focus:border-blue-400/60 dark:focus:ring-blue-400/20 dark:focus:bg-slate-600/40"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-400 hover:text-gray-600 dark:text-blue-300 dark:hover:text-blue-200"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-2 border-gray-300 text-gray-600 focus:ring-gray-400/20 dark:border-blue-600 dark:text-blue-600 dark:focus:ring-blue-500/20"
                    />
                    <span className="text-sm text-gray-600 dark:text-blue-200">Lembrar de mim</span>
                  </label>
                  <Button
                    variant="link"
                    type="button"
                    className="p-0 h-auto text-sm text-gray-600 hover:text-gray-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Esqueceu a senha?
                  </Button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full transition-all duration-300 backdrop-blur-sm bg-gray-800/80 hover:bg-gray-900/90 text-white shadow-lg shadow-gray-900/40 ring-1 ring-gray-600/30 dark:bg-blue-600/80 dark:hover:bg-blue-700/90 dark:shadow-blue-900/40 dark:ring-blue-400/30"
                >
                  {isLoading ? "Entrando..." : "Entrar no Sistema"}
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-200 dark:border-blue-700/50" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 bg-white text-gray-500 dark:bg-slate-800 dark:text-blue-300">
                      Sistema FITO
                    </span>
                  </div>
                </div>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-600 dark:text-blue-200/70">
                  © 2024 Escola FITO - Sistema de Gestão de Arquivo Morto
                  <br />
                  Desenvolvido para TCC Técnico em Informática
                </p>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  )
}
