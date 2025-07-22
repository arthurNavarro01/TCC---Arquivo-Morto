import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Verificar se o usuário está tentando acessar rotas protegidas
  const protectedRoutes = ["/dashboard", "/documentos", "/consulta", "/relatorios", "/configuracoes"]
  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))

  // Simular verificação de autenticação
  // Em um sistema real, você verificaria um token JWT ou sessão
  const isAuthenticated = request.cookies.get("auth-token")?.value

  if (isProtectedRoute && !isAuthenticated) {
    // Redirecionar para login se não autenticado
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Se está na página de login e já está autenticado, redirecionar para dashboard
  if (request.nextUrl.pathname === "/" && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
