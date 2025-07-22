"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { FileText, Users, Archive, AlertTriangle, TrendingUp, Calendar, Clock, Search } from "lucide-react"
import { Header } from "@/components/header"

const barData = [
  { name: "Jan", documentos: 120, consultas: 80 },
  { name: "Fev", documentos: 150, consultas: 95 },
  { name: "Mar", documentos: 180, consultas: 110 },
  { name: "Abr", documentos: 200, consultas: 130 },
  { name: "Mai", documentos: 170, consultas: 120 },
  { name: "Jun", documentos: 220, consultas: 140 },
]

const pieData = [
  { name: "Contratos", value: 35, color: "#3b82f6" },
  { name: "Relatórios", value: 25, color: "#10b981" },
  { name: "Correspondências", value: 20, color: "#f59e0b" },
  { name: "Outros", value: 20, color: "#ef4444" },
]

const lineData = [
  { name: "Seg", acessos: 45 },
  { name: "Ter", acessos: 52 },
  { name: "Qua", acessos: 38 },
  { name: "Qui", acessos: 61 },
  { name: "Sex", acessos: 55 },
  { name: "Sáb", acessos: 28 },
  { name: "Dom", acessos: 22 },
]

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-700 ease-in-out">
      <Header />

      <div className="p-6 space-y-6">
        {/* Header com título e filtros */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-700 ease-in-out">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-slate-400 mt-1 transition-colors duration-700 ease-in-out">
              Visão geral do sistema de arquivos
            </p>
          </div>
          <div className="flex gap-2">
            {["7d", "30d", "90d"].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
                className="transition-all duration-300"
              >
                {period === "7d" ? "7 dias" : period === "30d" ? "30 dias" : "90 dias"}
              </Button>
            ))}
          </div>
        </div>

        {/* Alertas importantes */}
        <div className="grid gap-4">
          <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20 transition-colors duration-700 ease-in-out">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-amber-800 dark:text-amber-200">
              <strong>Atenção:</strong> 15 documentos precisam ser revisados até o final da semana.
            </AlertDescription>
          </Alert>
        </div>

        {/* Cards de estatísticas principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="transition-all duration-300 hover:shadow-lg dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-slate-400">
                Total de Documentos
              </CardTitle>
              <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">2,847</div>
              <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% em relação ao mês anterior
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-slate-400">Consultas Hoje</CardTitle>
              <Search className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">156</div>
              <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8% em relação a ontem
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-slate-400">Usuários Ativos</CardTitle>
              <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">24</div>
              <div className="flex items-center text-xs text-gray-500 dark:text-slate-400 mt-1">
                <Clock className="h-3 w-3 mr-1" />
                Conectados agora
              </div>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-slate-400">Espaço Utilizado</CardTitle>
              <Archive className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">68%</div>
              <Progress value={68} className="mt-2" />
              <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">3.4 GB de 5 GB utilizados</div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de barras */}
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Atividade Mensal</CardTitle>
              <CardDescription className="text-gray-600 dark:text-slate-400">
                Documentos arquivados e consultas realizadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="documentos" fill="#3b82f6" name="Documentos" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="consultas" fill="#10b981" name="Consultas" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico de pizza */}
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Tipos de Documentos</CardTitle>
              <CardDescription className="text-gray-600 dark:text-slate-400">
                Distribuição por categoria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600 dark:text-slate-400">{item.name}</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white ml-auto">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de linha e atividades recentes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico de linha */}
          <Card className="lg:col-span-2 dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Acessos da Semana</CardTitle>
              <CardDescription className="text-gray-600 dark:text-slate-400">
                Número de acessos ao sistema por dia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="acessos"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#8b5cf6", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Atividades recentes */}
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Atividades Recentes</CardTitle>
              <CardDescription className="text-gray-600 dark:text-slate-400">Últimas ações no sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { action: "Documento arquivado", user: "João Silva", time: "2 min atrás", type: "success" },
                { action: "Consulta realizada", user: "Maria Santos", time: "5 min atrás", type: "info" },
                { action: "Usuário criado", user: "Admin", time: "10 min atrás", type: "warning" },
                { action: "Backup concluído", user: "Sistema", time: "1 hora atrás", type: "success" },
                { action: "Relatório gerado", user: "Carlos Lima", time: "2 horas atrás", type: "info" },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-slate-700/50 transition-colors duration-700 ease-in-out"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === "success"
                        ? "bg-green-500"
                        : activity.type === "warning"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">por {activity.user}</p>
                    <p className="text-xs text-gray-400 dark:text-slate-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Cards de ação rápida */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="transition-all duration-300 hover:shadow-lg cursor-pointer dark:bg-slate-800 dark:border-slate-700">
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Novo Documento</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">Arquivar um novo documento no sistema</p>
              <Button className="w-full">Arquivar Documento</Button>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg cursor-pointer dark:bg-slate-800 dark:border-slate-700">
            <CardContent className="p-6 text-center">
              <Search className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Busca Avançada</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">Encontrar documentos específicos</p>
              <Button variant="outline" className="w-full bg-transparent">
                Iniciar Busca
              </Button>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg cursor-pointer dark:bg-slate-800 dark:border-slate-700">
            <CardContent className="p-6 text-center">
              <Calendar className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Relatório Mensal</h3>
              <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">Gerar relatório do período</p>
              <Button variant="outline" className="w-full bg-transparent">
                Gerar Relatório
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
