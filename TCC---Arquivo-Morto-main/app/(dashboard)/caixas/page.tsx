"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  Plus,
  Filter,
  Eye,
  Edit,
  Trash2,
  Package,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"

// Dados mockados
const mockCaixas = [
  {
    id: 1,
    codigo: "CX-001",
    rua: "Rua Camélia",
    estante: "E1",
    andar: "2",
    posicao: "3",
    documentos: 23,
    capacidade: 50,
    status: "Ativa",
    dataCriacao: "2024-01-15",
    localizacaoCompleta: "Rua Camélia - E1-2-3",
  },
  {
    id: 2,
    codigo: "CX-002",
    rua: "Rua Angélica",
    estante: "E3",
    andar: "1",
    posicao: "5",
    documentos: 47,
    capacidade: 50,
    status: "Quase Cheia",
    dataCriacao: "2023-11-20",
    localizacaoCompleta: "Rua Angélica - E3-1-5",
  },
  {
    id: 3,
    codigo: "CX-003",
    rua: "Rua Av. Getúlio Vargas",
    estante: "E2",
    andar: "4",
    posicao: "1",
    documentos: 50,
    capacidade: 50,
    status: "Cheia",
    dataCriacao: "2023-08-10",
    localizacaoCompleta: "Rua Av. Getúlio Vargas - E2-4-1",
  },
  {
    id: 4,
    codigo: "CX-004",
    rua: "Rua Camélia",
    estante: "E1",
    andar: "3",
    posicao: "1",
    documentos: 15,
    capacidade: 50,
    status: "Ativa",
    dataCriacao: "2024-02-05",
    localizacaoCompleta: "Rua Camélia - E1-3-1",
  },
  {
    id: 5,
    codigo: "CX-005",
    rua: "Rua das Flores",
    estante: "E1",
    andar: "1",
    posicao: "2",
    documentos: 8,
    capacidade: 50,
    status: "Ativa",
    dataCriacao: "2024-03-12",
    localizacaoCompleta: "Rua das Flores - E1-1-2",
  },
]

const ruas = ["Rua Camélia", "Rua Angélica", "Rua Av. Getúlio Vargas", "Rua das Flores"]

// Função para gerar o próximo código de caixa
const gerarProximoCodigo = (caixas) => {
  if (caixas.length === 0) return "CX-001"

  const numeros = caixas
    .map((caixa) => {
      const match = caixa.codigo.match(/CX-(\d+)/)
      return match ? Number.parseInt(match[1]) : 0
    })
    .filter((num) => num > 0)

  const maiorNumero = Math.max(...numeros)
  const proximoNumero = maiorNumero + 1

  return `CX-${proximoNumero.toString().padStart(3, "0")}`
}

export default function Caixas() {
  const [caixas, setCaixas] = useState(mockCaixas)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRua, setFilterRua] = useState("Todas as ruas")
  const [filterStatus, setFilterStatus] = useState("Todos os status")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedCaixa, setSelectedCaixa] = useState(null)

  // Estados do formulário
  const [formData, setFormData] = useState({
    rua: "",
    estante: "",
    andar: "",
    posicao: "",
  })

  // Filtrar caixas
  const filteredCaixas = caixas.filter((caixa) => {
    const matchesSearch =
      caixa.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caixa.localizacaoCompleta.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRua = filterRua === "Todas as ruas" || caixa.rua === filterRua
    const matchesStatus = filterStatus === "Todos os status" || caixa.status === filterStatus

    return matchesSearch && matchesRua && matchesStatus
  })

  const getStatusBadge = (status: string, documentos: number, capacidade: number) => {
    const percentual = (documentos / capacidade) * 100

    switch (status) {
      case "Ativa":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Ativa
          </Badge>
        )
      case "Quase Cheia":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
            <Clock className="h-3 w-3 mr-1" />
            Quase Cheia
          </Badge>
        )
      case "Cheia":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Cheia
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const calculateStatus = (documentos: number, capacidade: number) => {
    const percentual = (documentos / capacidade) * 100
    if (percentual >= 100) return "Cheia"
    if (percentual >= 90) return "Quase Cheia"
    return "Ativa"
  }

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const resetForm = () => {
    setFormData({
      rua: "",
      estante: "",
      andar: "",
      posicao: "",
    })
  }

  const handleSubmit = () => {
    // Validações
    if (!formData.rua || !formData.estante || !formData.andar || !formData.posicao) {
      alert("Todos os campos são obrigatórios.")
      return
    }

    // Verificar se já existe uma caixa na mesma posição
    const posicaoExistente = caixas.find(
      (c) =>
        c.rua === formData.rua &&
        c.estante === formData.estante &&
        c.andar === formData.andar &&
        c.posicao === formData.posicao,
    )

    if (posicaoExistente) {
      alert("Já existe uma caixa nesta localização.")
      return
    }

    // Gerar código automático
    const codigoAutomatico = gerarProximoCodigo(caixas)

    // Criar nova caixa
    const novaCaixa = {
      id: caixas.length + 1,
      codigo: codigoAutomatico,
      rua: formData.rua,
      estante: formData.estante,
      andar: formData.andar,
      posicao: formData.posicao,
      documentos: 0,
      capacidade: 50,
      status: "Ativa",
      dataCriacao: new Date().toISOString().split("T")[0],
      localizacaoCompleta: `${formData.rua} - ${formData.estante}-${formData.andar}-${formData.posicao}`,
    }

    setCaixas((prev) => [...prev, novaCaixa])
    resetForm()
    setIsAddDialogOpen(false)
    alert(`Caixa ${codigoAutomatico} cadastrada com sucesso!`)
  }

  // Estatísticas
  const totalCaixas = caixas.length
  const caixasAtivas = caixas.filter((c) => c.status === "Ativa").length
  const caixasQuaseCheias = caixas.filter((c) => c.status === "Quase Cheia").length
  const caixasCheias = caixas.filter((c) => c.status === "Cheia").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestão de Caixas</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Controle de caixas físicas e suas localizações no arquivo
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Nova Caixa
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Cadastrar Nova Caixa</DialogTitle>
                <DialogDescription>Defina a localização física da nova caixa no arquivo morto</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                {/* Preview do código automático */}
                <div className="col-span-2 space-y-2">
                  <Label>Código da Caixa (Automático)</Label>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800 dark:text-blue-300">{gerarProximoCodigo(caixas)}</span>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="rua">Rua *</Label>
                  <Select value={formData.rua} onValueChange={(value) => handleFormChange("rua", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a rua" />
                    </SelectTrigger>
                    <SelectContent>
                      {ruas.map((rua) => (
                        <SelectItem key={rua} value={rua}>
                          {rua}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estante">Estante *</Label>
                  <Select value={formData.estante} onValueChange={(value) => handleFormChange("estante", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ex: E1" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => (
                        <SelectItem key={`E${i + 1}`} value={`E${i + 1}`}>
                          E{i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="andar">Andar *</Label>
                  <Select value={formData.andar} onValueChange={(value) => handleFormChange("andar", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="1-10" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="posicao">Posição *</Label>
                  <Select value={formData.posicao} onValueChange={(value) => handleFormChange("posicao", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="1-6" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 6 }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Capacidade</Label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <span className="text-sm font-medium">50 documentos (padrão)</span>
                  </div>
                </div>

                {/* Preview da localização */}
                {formData.rua && formData.estante && formData.andar && formData.posicao && (
                  <div className="col-span-2 space-y-2">
                    <Label>Localização Completa</Label>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800 dark:text-blue-300">
                          {formData.rua} - {formData.estante}-{formData.andar}-{formData.posicao}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    resetForm()
                    setIsAddDialogOpen(false)
                  }}
                >
                  Cancelar
                </Button>
                <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                  Cadastrar Caixa
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Package className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{totalCaixas}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Caixas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{caixasAtivas}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Ativas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">{caixasQuaseCheias}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Quase Cheias</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">{caixasCheias}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Cheias</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros e Busca
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Código ou localização..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Rua</Label>
                <Select value={filterRua} onValueChange={setFilterRua}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todas as ruas">Todas as ruas</SelectItem>
                    {ruas.map((rua) => (
                      <SelectItem key={rua} value={rua}>
                        {rua}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos os status">Todos os status</SelectItem>
                    <SelectItem value="Ativa">Ativa</SelectItem>
                    <SelectItem value="Quase Cheia">Quase Cheia</SelectItem>
                    <SelectItem value="Cheia">Cheia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>&nbsp;</Label>
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setSearchTerm("")
                    setFilterRua("Todas as ruas")
                    setFilterStatus("Todos os status")
                  }}
                >
                  Limpar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Caixas */}
        <Card>
          <CardHeader>
            <CardTitle>Caixas Cadastradas</CardTitle>
            <CardDescription>{filteredCaixas.length} caixa(s) encontrada(s)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Ocupação</TableHead>
                    <TableHead>Capacidade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data Criação</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCaixas.map((caixa) => (
                    <TableRow key={caixa.id}>
                      <TableCell className="font-medium">{caixa.codigo}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <div className="text-sm">
                            <div>{caixa.rua}</div>
                            <div className="text-gray-500 dark:text-gray-400">
                              {caixa.estante}-{caixa.andar}-{caixa.posicao}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>
                              {caixa.documentos}/{caixa.capacidade}
                            </span>
                            <span>{Math.round((caixa.documentos / caixa.capacidade) * 100)}%</span>
                          </div>
                          <Progress value={(caixa.documentos / caixa.capacidade) * 100} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-center">
                          <div className="text-lg font-bold">{caixa.capacidade}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">documentos</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(caixa.status, caixa.documentos, caixa.capacidade)}</TableCell>
                      <TableCell>
                        <div className="text-sm">{new Date(caixa.dataCriacao).toLocaleDateString("pt-BR")}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
