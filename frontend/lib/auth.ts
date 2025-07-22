"use client"

// Simulação de funções de autenticação
export const login = async (email: string, password: string) => {
  // Simular chamada de API
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "admin@fito.edu.br" && password === "123456") {
        // Simular token de autenticação
        document.cookie = "auth-token=fake-jwt-token; path=/; max-age=86400"
        resolve({ success: true, user: { name: "Admin FITO", email } })
      } else {
        reject(new Error("Credenciais inválidas"))
      }
    }, 1000)
  })
}

export const logout = () => {
  // Remover token de autenticação
  document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
}

export const isAuthenticated = () => {
  if (typeof document !== "undefined") {
    return document.cookie.includes("auth-token=")
  }
  return false
}
