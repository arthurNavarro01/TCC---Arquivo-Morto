"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
import { FileText, AlertTriangle, Clock, Archive, TrendingUp, Package, MapPin, Building2, Users } from "lucide-react"

// Dados mockados para demonstração
const mockData = {
  totalDocuments: 2847,
  expiredDocuments: 43,
  expiringDocuments: 78,
  validDocuments: 2726,
  totalBoxes: 127,
  occupiedPositions: 89,
  totalPositions: 240,
  documentsByType: [
    { name: "Corrente", value: 1687, color: "#3b82f6" },
    { name: "Intermediário", value: 1160, color: "#10b981" },
  ],
  documentsByStatus: [
    { name: "Válidos", value: 2726, color: "#10b981" },
    { name: "A Vencer", value: 78, color: "#f59e0b" },
    { name: "Vencidos", value: 43, color: "#ef4444" },
  ],
  documentsByLocation: [
    { location: "Rua Camélia", count: 892, boxes: 42 },
    { location: "Rua Angélica", count: 756, boxes: 38 },
    { location: "Rua Av. Getúlio Vargas", count: 634, boxes: 31 },
    { location: "Rua das Flores", count: 565, boxes: 16 },
  ],
  monthlyGrowth: [
    { month: "Jan", documents: 2340, boxes: 98 },
    { month: "Fev", documents: 2456, boxes: 103 },
    { month: "Mar", documents: 2578, boxes: 108 },
    { month: "Abr", documents: 2689, boxes: 115 },
    { month: "Mai", documents: 2756, boxes: 122 },
    { month: "Jun", documents: 2847, boxes: 127 },
  ],
  documentsBySector: [
    { sector: "Secretaria", count: 823, percentage: 28.9 },
    { sector: "Recursos Humanos", count: 712, percentage: 25.0 },
    { sector: "Financeiro", count: 634, percentage: 22.3 },
    { sector: "Coordenação", count: 456, percentage: 16.0 },
    { sector: "Outros", count: 222, percentage: 7.8 },
  ],
}

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("30")

  const occupancyRate = (mockData.occupiedPositions / mockData.totalPositions) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard - Arquivo Morto FITO</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Visão geral do sistema de gestão documental física</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedPeriod === "7" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod("7")}
            >
              7 dias
            </Button>
            <Button
              variant={selectedPeriod === "30" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod("30")}
            >
              30 dias
            </Button>
            <Button
              variant={selectedPeriod === "90" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPeriod("90")}
            >
              90 dias
            </Button>
          </div>
        </div>

        {/* Cards de Estatísticas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Documentos</CardTitle>
              <FileText className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.totalDocuments.toLocaleString()}</div>
              <p className="text-xs text-blue-100">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +8.2% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Caixas</CardTitle>
              <Package className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.totalBoxes}</div>
              <p className="text-xs text-green-100">
                Média de {Math.round(mockData.totalDocuments / mockData.totalBoxes)} docs/caixa
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documentos Vencidos</CardTitle>
              <AlertTriangle className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.expiredDocuments}</div>
              <p className="text-xs text-red-100">Requer descarte imediato</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">A Vencer (30 dias)</CardTitle>
              <Clock className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.expiringDocuments}</div>
              <p className="text-xs text-yellow-100">Programar descarte</p>
            </CardContent>
          </Card>
        </div>

        {/* Alertas e Ocupação */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alertas Importantes */}
          <Card className="border-l-4 border-l-red-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertTriangle className="h-5 w-5" />
                Alertas Importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div>
                  <p className="font-medium text-red-800 dark:text-red-300">
                    {mockData.expiredDocuments} documentos vencidos para descarte
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400">Distribuídos em 12 caixas diferentes</p>
                </div>
                <Button size="sm" variant="destructive">
                  Ver Detalhes
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div>
                  <p className="font-medium text-yellow-800 dark:text-yellow-300">
                    {mockData.expiringDocuments} documentos vencem em 30 dias
                  </p>
                  <p className="text-sm text-yellow-600 dark:text-yellow-400">Programar processo de descarte</p>
                </div>
                <Button size="sm" variant="outline">
                  Programar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Ocupação do Arquivo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Ocupação do Arquivo
              </CardTitle>
              <CardDescription>Status de ocupação das posições físicas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Posições Ocupadas</span>
                  <span>
                    {mockData.occupiedPositions}/{mockData.totalPositions}
                  </span>
                </div>
                <Progress value={occupancyRate} className="h-3" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {occupancyRate.toFixed(1)}% de ocupação total
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-gray-500 dark:text-gray-400">Posições Livres</p>
                  <p className="text-2xl font-bold text-green-600">
                    {mockData.totalPositions - mockData.occupiedPositions}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-gray-500 dark:text-gray-400">Capacidade Máxima</p>
                  <p className="text-2xl font-bold text-blue-600">{mockData.totalPositions * 50}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Barras - Documentos por Localização */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Rua</CardTitle>
              <CardDescription>Documentos e caixas por localização física</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockData.documentsByLocation}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="location" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Documentos" />
                  <Bar dataKey="boxes" fill="#10b981" radius={[4, 4, 0, 0]} name="Caixas" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico de Pizza - Status dos Documentos */}
          <Card>
            <CardHeader>
              <CardTitle>Status dos Documentos</CardTitle>
              <CardDescription>Distribuição por situação de descarte</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mockData.documentsByStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mockData.documentsByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {mockData.documentsByStatus.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">
                      {item.name}: {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Linha - Evolução */}
        <Card>
          <CardHeader>
            <CardTitle>Evolução do Arquivo</CardTitle>
            <CardDescription>Crescimento de documentos e caixas ao longo do tempo</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData.monthlyGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="documents"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                  name="Documentos"
                />
                <Line
                  type="monotone"
                  dataKey="boxes"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                  name="Caixas"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Resumo por Setor e Ações Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Documentos por Setor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockData.documentsBySector.map((sector, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm">{sector.sector}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{sector.count}</Badge>
                    <span className="text-xs text-gray-500">{sector.percentage}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Capacidade por Rua
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockData.documentsByLocation.map((location, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span>{location.location}</span>
                    <span>{Math.round((location.boxes / 60) * 100)}%</span>
                  </div>
                  <Progress value={(location.boxes / 60) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5" />
                Ações Rápidas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-transparent" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Cadastrar Documento
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                <Package className="h-4 w-4 mr-2" />
                Nova Caixa
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Ver Vencimentos
              </Button>
              <Button className="w-full bg-transparent" variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                Localizar Posição
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
