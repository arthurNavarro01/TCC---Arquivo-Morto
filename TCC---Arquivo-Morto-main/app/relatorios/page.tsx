"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  Line,
  Area,
  AreaChart,
} from "recharts"
import {
  Download,
  FileText,
  TrendingUp,
  Calendar,
  Users,
  Archive,
  BarChart3,
  PieChartIcon,
  Activity,
} from "lucide-react"
import { Header } from "@/components/header"

// Dados mockados para os gráficos
const documentosPorMes = [
  { mes: "Jan", arquivados: 45, consultados: 120 },
  { mes: "Fev", arquivados: 52, consultados: 135 },
  { mes: "Mar", arquivados: 48, consultados: 128 },
  { mes: "Abr", arquivados: 61, consultados: 142 },
  { mes: "Mai", arquivados: 55, consultados: 156 },
  { mes: "Jun", arquivados: 67, consultados: 168 },
]

const documentosPorTipo = [
  { name: "Contratos", value: 35, color: "#3b82f6" },
  { name: "Relatórios", value: 25, color: "#10b981" },
  { name: "Correspondências", value: 20, color: "#f59e0b" },
  { name: "Notas Fiscais", value: 12, color: "#ef4444" },
  { name: "Outros", value: 8, color: "#8b5cf6" },
]

const documentosPorSetor = [
  { setor: "Jurídico", total: 156, ativos: 89, arquivados: 67 },
  { setor: "Financeiro", total: 234, ativos: 145, arquivados: 89 },
  { setor: "Administrativo", total: 98, ativos: 67, arquivados: 31 },
  { setor: "RH", total: 76, ativos: 45, arquivados: 31 },
]

const acessosPorDia = [
  { dia: "Seg", acessos: 45, downloads: 12 },
  { dia: "Ter", acessos: 52, downloads: 18 },
  { dia: "Qua", acessos: 38, downloads: 9 },
  { dia: "Qui", acessos: 61, downloads: 22 },
  { dia: "Sex", acessos: 55, downloads: 15 },
  { dia: "Sáb", acessos: 28, downloads: 6 },
  { dia: "Dom", acessos: 22, downloads: 4 },
]

const topDocumentos = [
  { titulo: "Manual de Procedimentos - RH", acessos: 89, tipo: "Manual" },
  { titulo: "Contrato Prestação Serviços ABC", acessos: 76, tipo: "Contrato" },
  { titulo: "Relatório Financeiro Q4", acessos: 65, tipo: "Relatório" },
  { titulo: "Correspondência Prefeitura", acessos: 54, tipo: "Correspondência" },
  { titulo: "Nota Fiscal Fornecedor XYZ", acessos: 43, tipo: "Nota Fiscal" },
]

export default function Relatorios() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [selectedReport, setSelectedReport] = useState("geral")

  const exportReport = (format) => {
    // Aqui você implementaria a lógica de exportação
    console.log(`Exportando relatório em formato ${format}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-700 ease-in-out">
      <Header />

      <div className="p-6 space-y-6">
        {/* Header da página */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-700 ease-in-out">
              Relatórios e Estatísticas
            </h1>
            <p className="text-gray-600 dark:text-slate-400 mt-1 transition-colors duration-700 ease-in-out">
              Análise detalhada do sistema de arquivos
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40 dark:bg-slate-700 dark:border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                <SelectItem value="90d">Últimos 90 dias</SelectItem>
                <SelectItem value="1y">Último ano</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedReport} onValueChange={setSelectedReport}>
              <SelectTrigger className="w-48 dark:bg-slate-700 dark:border-slate-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                <SelectItem value="geral">Relatório Geral</SelectItem>
                <SelectItem value="documentos">Documentos</SelectItem>
                <SelectItem value="acessos">Acessos</SelectItem>
                <SelectItem value="setores">Por Setores</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Cards de estatísticas principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="dark:bg-slate-800 dark:border-slate-700">
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
                +12% em relação ao período anterior
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-slate-400">
                Consultas Realizadas
              </CardTitle>
              <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">1,249</div>
              <div className="flex items-center text-xs text-green-600 dark:text-green-400 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8% em relação ao período anterior
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-slate-400">Usuários Ativos</CardTitle>
              <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">47</div>
              <div className="flex items-center text-xs text-gray-500 dark:text-slate-400 mt-1">
                <Calendar className="h-3 w-3 mr-1" />
                No período selecionado
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-slate-400">
                Taxa de Utilização
              </CardTitle>
              <Archive className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">73%</div>
              <Progress value={73} className="mt-2" />
              <div className="text-xs text-gray-500 dark:text-slate-400 mt-1">Capacidade do arquivo físico</div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos principais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de documentos por mês */}
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <BarChart3 className="h-5 w-5" />
                    Documentos por Mês
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-slate-400">
                    Arquivamento e consultas mensais
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => exportReport("documentos-mes")}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={documentosPorMes}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="mes" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="arquivados" fill="#3b82f6" name="Arquivados" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="consultados" fill="#10b981" name="Consultados" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Gráfico de documentos por tipo */}
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <PieChartIcon className="h-5 w-5" />
                    Documentos por Tipo
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-slate-400">
                    Distribuição por categoria
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => exportReport("documentos-tipo")}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={documentosPorTipo}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {documentosPorTipo.map((entry, index) => (
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
                {documentosPorTipo.map((item, index) => (
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

        {/* Gráfico de acessos e tabela de setores */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico de acessos por dia */}
          <Card className="lg:col-span-2 dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-gray-900 dark:text-white">Acessos da Semana</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-slate-400">
                    Acessos e downloads por dia
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => exportReport("acessos-semana")}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={acessosPorDia}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="dia" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="acessos"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                    name="Acessos"
                  />
                  <Line type="monotone" dataKey="downloads" stroke="#f59e0b" strokeWidth={2} name="Downloads" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Documentos por setor */}
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-gray-900 dark:text-white">Por Setor</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-slate-400">
                    Distribuição por departamento
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => exportReport("documentos-setor")}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {documentosPorSetor.map((setor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{setor.setor}</span>
                    <span className="text-sm text-gray-600 dark:text-slate-400">{setor.total}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-slate-400">
                      <span>Ativos: {setor.ativos}</span>
                      <span>Arquivados: {setor.arquivados}</span>
                    </div>
                    <Progress value={(setor.ativos / setor.total) * 100} className="h-2" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Tabela de documentos mais acessados */}
        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-gray-900 dark:text-white">Documentos Mais Acessados</CardTitle>
                <CardDescription className="text-gray-600 dark:text-slate-400">
                  Top 5 documentos com mais consultas no período
                </CardDescription>
              </div>
              <Button variant="outline" onClick={() => exportReport("top-documentos")}>
                <Download className="h-4 w-4 mr-2" />
                Exportar Relatório
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="dark:border-slate-700">
                  <TableHead className="text-gray-900 dark:text-white">Posição</TableHead>
                  <TableHead className="text-gray-900 dark:text-white">Documento</TableHead>
                  <TableHead className="text-gray-900 dark:text-white">Tipo</TableHead>
                  <TableHead className="text-gray-900 dark:text-white">Acessos</TableHead>
                  <TableHead className="text-gray-900 dark:text-white">Tendência</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topDocumentos.map((doc, index) => (
                  <TableRow key={index} className="dark:border-slate-700">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                            index === 0
                              ? "bg-yellow-500"
                              : index === 1
                                ? "bg-gray-400"
                                : index === 2
                                  ? "bg-orange-600"
                                  : "bg-gray-300"
                          }`}
                        >
                          {index + 1}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-gray-900 dark:text-white">{doc.titulo}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="dark:border-slate-600 dark:text-slate-300">
                        {doc.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-slate-400">{doc.acessos}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm">+{Math.floor(Math.random() * 20 + 5)}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Botões de exportação */}
        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Exportar Relatórios</CardTitle>
            <CardDescription className="text-gray-600 dark:text-slate-400">
              Baixe relatórios completos em diferentes formatos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => exportReport("pdf")} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Relatório PDF
              </Button>
              <Button variant="outline" onClick={() => exportReport("excel")} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Planilha Excel
              </Button>
              <Button variant="outline" onClick={() => exportReport("csv")} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Arquivo CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
