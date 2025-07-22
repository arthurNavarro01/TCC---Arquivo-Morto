"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  LineChart,
  Line,
} from "recharts"
import { Download, FileText, BarChart3, PieChartIcon, TrendingUp, Calendar, Filter, Printer, Mail } from "lucide-react"

// Dados mockados para relatórios
const reportData = {
  documentsByStatus: [
    { name: "Válidos", value: 1179, color: "#10b981" },
    { name: "A Vencer", value: 45, color: "#f59e0b" },
    { name: "Vencidos", value: 23, color: "#ef4444" },
  ],
  documentsByLocation: [
    { location: "Rua A", count: 312, percentage: 25.0 },
    { location: "Rua B", count: 298, percentage: 23.9 },
    { location: "Rua C", count: 267, percentage: 21.4 },
    { location: "Rua D", count: 234, percentage: 18.8 },
    { location: "Rua E", count: 136, percentage: 10.9 },
  ],
  documentsBySector: [
    { sector: "Secretaria", count: 423, percentage: 33.9 },
    { sector: "Recursos Humanos", count: 312, percentage: 25.0 },
    { sector: "Financeiro", count: 298, percentage: 23.9 },
    { sector: "Coordenação", count: 214, percentage: 17.2 },
  ],
  expiringDocuments: [
    {
      codigo: "DOC-2024-012",
      responsavel: "Maria Silva",
      setor: "Secretaria",
      dataDescarte: "2024-02-15",
      diasRestantes: 15,
    },
    { codigo: "DOC-2024-023", responsavel: "João Santos", setor: "RH", dataDescarte: "2024-02-20", diasRestantes: 20 },
    {
      codigo: "DOC-2024-034",
      responsavel: "Ana Costa",
      setor: "Financeiro",
      dataDescarte: "2024-02-25",
      diasRestantes: 25,
    },
  ],
  monthlyGrowth: [
    { month: "Jan", documents: 980, added: 45, removed: 12 },
    { month: "Fev", documents: 1020, added: 52, removed: 8 },
    { month: "Mar", documents: 1080, added: 68, removed: 15 },
    { month: "Abr", documents: 1150, added: 78, removed: 18 },
    { month: "Mai", documents: 1200, added: 62, removed: 22 },
    { month: "Jun", documents: 1247, added: 55, removed: 8 },
  ],
}

export default function Relatorios() {
  const [selectedReport, setSelectedReport] = useState("geral")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [selectedSector, setSelectedSector] = useState("all")

  const generateReport = () => {
    console.log("Gerando relatório:", selectedReport)
  }

  const exportReport = (format: string) => {
    console.log("Exportando relatório em:", format)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Relatórios e Estatísticas</h1>
            <p className="text-gray-600 mt-1">Análises detalhadas do arquivo morto</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => exportReport("pdf")}>
              <Download className="h-4 w-4 mr-2" />
              Exportar PDF
            </Button>
            <Button variant="outline" onClick={() => exportReport("excel")}>
              <Download className="h-4 w-4 mr-2" />
              Exportar Excel
            </Button>
          </div>
        </div>

        {/* Tipos de Relatório */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card
            className={`cursor-pointer transition-all ${selectedReport === "geral" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"}`}
            onClick={() => setSelectedReport("geral")}
          >
            <CardHeader className="text-center pb-2">
              <BarChart3 className="h-8 w-8 mx-auto text-blue-600" />
              <CardTitle className="text-sm">Relatório Geral</CardTitle>
            </CardHeader>
          </Card>

          <Card
            className={`cursor-pointer transition-all ${selectedReport === "vencimentos" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"}`}
            onClick={() => setSelectedReport("vencimentos")}
          >
            <CardHeader className="text-center pb-2">
              <Calendar className="h-8 w-8 mx-auto text-red-600" />
              <CardTitle className="text-sm">Vencimentos</CardTitle>
            </CardHeader>
          </Card>

          <Card
            className={`cursor-pointer transition-all ${selectedReport === "localizacao" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"}`}
            onClick={() => setSelectedReport("localizacao")}
          >
            <CardHeader className="text-center pb-2">
              <PieChartIcon className="h-8 w-8 mx-auto text-green-600" />
              <CardTitle className="text-sm">Por Localização</CardTitle>
            </CardHeader>
          </Card>

          <Card
            className={`cursor-pointer transition-all ${selectedReport === "setores" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"}`}
            onClick={() => setSelectedReport("setores")}
          >
            <CardHeader className="text-center pb-2">
              <TrendingUp className="h-8 w-8 mx-auto text-purple-600" />
              <CardTitle className="text-sm">Por Setores</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros do Relatório
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Data Inicial</Label>
                <Input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Data Final</Label>
                <Input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Setor</Label>
                <Select value={selectedSector} onValueChange={setSelectedSector}>
                  <SelectTrigger>
                    <SelectValue placeholder="Todos os setores" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os setores</SelectItem>
                    <SelectItem value="secretaria">Secretaria</SelectItem>
                    <SelectItem value="rh">Recursos Humanos</SelectItem>
                    <SelectItem value="financeiro">Financeiro</SelectItem>
                    <SelectItem value="coordenacao">Coordenação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Button onClick={generateReport} className="w-full">
                  Gerar Relatório
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conteúdo do Relatório */}
        {selectedReport === "geral" && (
          <div className="space-y-6">
            {/* Resumo Executivo */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo Executivo</CardTitle>
                <CardDescription>Visão geral dos documentos no arquivo morto</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">1.247</div>
                    <div className="text-sm text-gray-600">Total de Documentos</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">1.179</div>
                    <div className="text-sm text-gray-600">Documentos Válidos</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">45</div>
                    <div className="text-sm text-gray-600">A Vencer (30 dias)</div>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">23</div>
                    <div className="text-sm text-gray-600">Vencidos</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={reportData.documentsByStatus}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {reportData.documentsByStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Evolução Mensal</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={reportData.monthlyGrowth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="documents" stroke="#3b82f6" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {selectedReport === "vencimentos" && (
          <Card>
            <CardHeader>
              <CardTitle>Documentos com Vencimento Próximo</CardTitle>
              <CardDescription>Documentos que vencem nos próximos 30 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Setor</TableHead>
                    <TableHead>Data de Descarte</TableHead>
                    <TableHead>Dias Restantes</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.expiringDocuments.map((doc, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{doc.codigo}</TableCell>
                      <TableCell>{doc.responsavel}</TableCell>
                      <TableCell>{doc.setor}</TableCell>
                      <TableCell>{new Date(doc.dataDescarte).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell>{doc.diasRestantes} dias</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            doc.diasRestantes <= 15 ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {doc.diasRestantes <= 15 ? "Urgente" : "Atenção"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {selectedReport === "localizacao" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Localização</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={reportData.documentsByLocation}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="location" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detalhamento por Localização</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Localização</TableHead>
                      <TableHead>Quantidade</TableHead>
                      <TableHead>Percentual</TableHead>
                      <TableHead>Capacidade</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.documentsByLocation.map((location, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{location.location}</TableCell>
                        <TableCell>{location.count}</TableCell>
                        <TableCell>{location.percentage}%</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${Math.min(location.percentage * 4, 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">
                              {Math.min(location.percentage * 4, 100).toFixed(0)}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedReport === "setores" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Documentos por Setor</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={reportData.documentsBySector} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="sector" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análise por Setor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reportData.documentsBySector.map((sector, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{sector.sector}</h3>
                        <Badge variant="secondary">{sector.count} docs</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Percentual do total</span>
                          <span>{sector.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${sector.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Ações do Relatório */}
        <Card>
          <CardHeader>
            <CardTitle>Ações do Relatório</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button onClick={() => exportReport("pdf")} className="bg-red-600 hover:bg-red-700">
                <FileText className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
              <Button onClick={() => exportReport("excel")} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar Excel
              </Button>
              <Button variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </Button>
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Enviar por Email
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
