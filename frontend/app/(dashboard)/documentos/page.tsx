"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
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
  Calendar,
  MapPin,
  User,
  Building2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Package,
  Upload,
  FileText,
  X,
} from "lucide-react"

// Dados mockados
const mockDocuments = [
  {
    id: 1,
    codigo: "DOC-2024-001",
    responsavel: "Maria Silva",
    setor: "Secretaria",
    ano: 2024,
    tipo: "Corrente",
    anosDescarte: 5,
    dataArquivamento: "2024-01-15",
    dataDescarte: "2029-01-15",
    status: "Válido",
    caixa: "CX-CAM-001",
    localizacao: {
      rua: "Rua Camélia",
      estante: "E1",
      andar: "2",
      posicao: "3",
    },
    descricao: "Atas de reunião pedagógica - Janeiro a Março 2024",
    dataCadastro: "2024-01-15",
    temPDF: true,
  },
  {
    id: 2,
    codigo: "DOC-2023-045",
    responsavel: "João Santos",
    setor: "Recursos Humanos",
    ano: 2023,
    tipo: "Intermediário",
    anosDescarte: 3,
    dataArquivamento: "2023-02-15",
    dataDescarte: "2026-02-15",
    status: "Vencido",
    caixa: "CX-ANG-045",
    localizacao: {
      rua: "Rua Angélica",
      estante: "E3",
      andar: "1",
      posicao: "5",
    },
    descricao: "Contratos de trabalho temporário - Período letivo 2023",
    dataCadastro: "2023-02-15",
    temPDF: false,
  },
  {
    id: 3,
    codigo: "DOC-2024-023",
    responsavel: "Ana Costa",
    setor: "Financeiro",
    ano: 2024,
    tipo: "Corrente",
    anosDescarte: 7,
    dataArquivamento: "2024-03-20",
    dataDescarte: "2031-03-20",
    status: "Válido",
    caixa: "CX-GET-023",
    localizacao: {
      rua: "Rua Av. Getúlio Vargas",
      estante: "E2",
      andar: "4",
      posicao: "1",
    },
    descricao: "Notas fiscais de serviços - Primeiro trimestre 2024",
    dataCadastro: "2024-03-20",
    temPDF: true,
  },
]

const mockCaixas = [
  {
    codigo: "CX-CAM-001",
    rua: "Rua Camélia",
    estante: "E1",
    andar: "2",
    posicao: "3",
    documentos: 23,
    capacidade: 50,
    localizacaoCompleta: "Rua Camélia - E1-2-3",
  },
  {
    codigo: "CX-ANG-045",
    rua: "Rua Angélica",
    estante: "E3",
    andar: "1",
    posicao: "5",
    documentos: 47,
    capacidade: 50,
    localizacaoCompleta: "Rua Angélica - E3-1-5",
  },
  {
    codigo: "CX-GET-023",
    rua: "Rua Av. Getúlio Vargas",
    estante: "E2",
    andar: "4",
    posicao: "1",
    documentos: 50,
    capacidade: 50,
    localizacaoCompleta: "Rua Av. Getúlio Vargas - E2-4-1",
  },
  {
    codigo: "CX-CAM-002",
    rua: "Rua Camélia",
    estante: "E1",
    andar: "3",
    posicao: "1",
    documentos: 15,
    capacidade: 50,
    localizacaoCompleta: "Rua Camélia - E1-3-1",
  },
  {
    codigo: "CX-FLO-001",
    rua: "Rua das Flores",
    estante: "E1",
    andar: "1",
    posicao: "2",
    documentos: 8,
    capacidade: 50,
    localizacaoCompleta: "Rua das Flores - E1-1-2",
  },
]

const setores = ["Secretaria", "Recursos Humanos", "Financeiro", "Coordenação"]

export default function Documentos() {
  const [documents, setDocuments] = useState(mockDocuments)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSetor, setFilterSetor] = useState("Todos os setores")
  const [filterStatus, setFilterStatus] = useState("Todos os status")
  const [filterTipo, setFilterTipo] = useState("Todos os tipos")
  const [filterCaixa, setFilterCaixa] = useState("Todas as caixas")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null)

  // Estados do formulário
  const [formData, setFormData] = useState({
    responsavel: "",
    setor: "",
    ano: "",
    tipo: "",
    anosDescarte: "",
    caixa: "",
    dataArquivamento: "",
    descricao: "",
    pdfFile: null as File | null,
  })
  const [dataVencimento, setDataVencimento] = useState("")

  // Calcular data de vencimento
  const calculateDiscardDate = (dataArquivamento: string, anosDescarte: number) => {
    if (!dataArquivamento || !anosDescarte) return ""

    const arquivamentoDate = new Date(dataArquivamento)
    arquivamentoDate.setFullYear(arquivamentoDate.getFullYear() + anosDescarte)
    return arquivamentoDate.toISOString().split("T")[0]
  }

  // Atualizar data de vencimento quando os campos mudarem
  const handleFormChange = (field: string, value: string | File | null) => {
    const newFormData = { ...formData, [field]: value }
    setFormData(newFormData)

    if (field === "dataArquivamento" || field === "anosDescarte") {
      const vencimento = calculateDiscardDate(
        field === "dataArquivamento" ? (value as string) : newFormData.dataArquivamento,
        field === "anosDescarte" ? Number.parseInt(value as string) : Number.parseInt(newFormData.anosDescarte),
      )
      setDataVencimento(vencimento)
    }
  }

  // Filtrar documentos
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.responsavel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSetor = filterSetor === "Todos os setores" || doc.setor === filterSetor
    const matchesStatus = filterStatus === "Todos os status" || doc.status === filterStatus
    const matchesTipo = filterTipo === "Todos os tipos" || doc.tipo === filterTipo
    const matchesCaixa = filterCaixa === "Todas as caixas" || doc.caixa === filterCaixa

    return matchesSearch && matchesSetor && matchesStatus && matchesTipo && matchesCaixa
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Válido":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Válido
          </Badge>
        )
      case "Vencido":
        return (
          <Badge className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Vencido
          </Badge>
        )
      case "A Vencer":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300">
            <Clock className="h-3 w-3 mr-1" />A Vencer
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const calculateStatus = (dataDescarte: string) => {
    const today = new Date()
    const discardDate = new Date(dataDescarte)
    const diffTime = discardDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "Vencido"
    if (diffDays <= 30) return "A Vencer"
    return "Válido"
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      handleFormChange("pdfFile", file)
    } else {
      alert("Por favor, selecione apenas arquivos PDF.")
      event.target.value = ""
    }
  }

  const resetForm = () => {
    setFormData({
      responsavel: "",
      setor: "",
      ano: "",
      tipo: "",
      anosDescarte: "",
      caixa: "",
      dataArquivamento: "",
      descricao: "",
      pdfFile: null,
    })
    setDataVencimento("")
  }

  const handleSubmit = () => {
    // Validações
    if (
      !formData.responsavel ||
      !formData.setor ||
      !formData.ano ||
      !formData.tipo ||
      !formData.anosDescarte ||
      !formData.caixa ||
      !formData.dataArquivamento ||
      !formData.descricao ||
      !formData.pdfFile
    ) {
      alert("Todos os campos são obrigatórios, incluindo o upload do PDF.")
      return
    }

    // Aqui você implementaria a lógica de salvamento
    console.log("Dados do documento:", formData)
    console.log("Data de vencimento:", dataVencimento)

    resetForm()
    setIsAddDialogOpen(false)
    alert("Documento cadastrado com sucesso!")
  }

  // Filtrar caixas disponíveis (que não estão cheias)
  const caixasDisponiveis = mockCaixas.filter((caixa) => caixa.documentos < caixa.capacidade)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestão de Documentos</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Cadastro, consulta e controle de documentos físicos do arquivo
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Novo Documento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Cadastrar Novo Documento</DialogTitle>
                <DialogDescription>
                  Preencha todas as informações do documento físico. Todos os campos são obrigatórios.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="responsavel">Responsável *</Label>
                  <Input
                    id="responsavel"
                    placeholder="Nome do responsável"
                    value={formData.responsavel}
                    onChange={(e) => handleFormChange("responsavel", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="setor">Setor *</Label>
                  <Select value={formData.setor} onValueChange={(value) => handleFormChange("setor", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o setor" />
                    </SelectTrigger>
                    <SelectContent>
                      {setores.map((setor) => (
                        <SelectItem key={setor} value={setor}>
                          {setor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ano">Ano de Origem *</Label>
                  <Input
                    id="ano"
                    type="number"
                    placeholder="2024"
                    value={formData.ano}
                    onChange={(e) => handleFormChange("ano", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo *</Label>
                  <Select value={formData.tipo} onValueChange={(value) => handleFormChange("tipo", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo do documento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Corrente">Corrente</SelectItem>
                      <SelectItem value="Intermediário">Intermediário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataArquivamento">Data de Arquivamento *</Label>
                  <Input
                    id="dataArquivamento"
                    type="date"
                    value={formData.dataArquivamento}
                    onChange={(e) => handleFormChange("dataArquivamento", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="anosDescarte">Anos para Descarte *</Label>
                  <Select
                    value={formData.anosDescarte}
                    onValueChange={(value) => handleFormChange("anosDescarte", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 anos</SelectItem>
                      <SelectItem value="5">5 anos</SelectItem>
                      <SelectItem value="7">7 anos</SelectItem>
                      <SelectItem value="10">10 anos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Data de Vencimento (calculada automaticamente) */}
                {dataVencimento && (
                  <div className="col-span-2 space-y-2">
                    <Label>Data de Vencimento (Calculada Automaticamente)</Label>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800 dark:text-blue-300">
                          {new Date(dataVencimento).toLocaleDateString("pt-BR")}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="caixa">Localização (Caixa) *</Label>
                  <Select value={formData.caixa} onValueChange={(value) => handleFormChange("caixa", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a caixa de destino" />
                    </SelectTrigger>
                    <SelectContent>
                      {caixasDisponiveis.map((caixa) => (
                        <SelectItem key={caixa.codigo} value={caixa.codigo}>
                          <div className="flex items-center justify-between w-full">
                            <span>{caixa.codigo}</span>
                            <span className="text-sm text-gray-500 ml-2">
                              {caixa.localizacaoCompleta} ({caixa.documentos}/{caixa.capacidade})
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {caixasDisponiveis.length === 0 && (
                    <p className="text-sm text-red-600">Nenhuma caixa disponível. Todas estão cheias.</p>
                  )}
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="descricao">Descrição do Documento *</Label>
                  <Textarea
                    id="descricao"
                    placeholder="Descreva o conteúdo do documento (ex: Atas de reunião pedagógica - Janeiro a Março 2024)"
                    rows={3}
                    value={formData.descricao}
                    onChange={(e) => handleFormChange("descricao", e.target.value)}
                  />
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="pdf">Upload de PDF (Obrigatório) *</Label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
                    {!formData.pdfFile ? (
                      <div className="text-center">
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          Clique para fazer upload do arquivo PDF
                        </p>
                        <Input type="file" accept=".pdf" onChange={handleFileUpload} className="cursor-pointer" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800 dark:text-green-300">
                            {formData.pdfFile.name}
                          </span>
                          <span className="text-xs text-green-600 dark:text-green-400">
                            ({(formData.pdfFile.size / 1024 / 1024).toFixed(2)} MB)
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFormChange("pdfFile", null)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
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
                  Cadastrar Documento
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{documents.length}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Documentos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{documents.filter((d) => d.status === "Válido").length}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Válidos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">{documents.filter((d) => d.status === "A Vencer").length}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">A Vencer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">{documents.filter((d) => d.status === "Vencido").length}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Vencidos</p>
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
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="space-y-2">
                <Label htmlFor="search">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Código, responsável..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Setor</Label>
                <Select value={filterSetor} onValueChange={setFilterSetor}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos os setores">Todos os setores</SelectItem>
                    {setores.map((setor) => (
                      <SelectItem key={setor} value={setor}>
                        {setor}
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
                    <SelectItem value="Válido">Válido</SelectItem>
                    <SelectItem value="A Vencer">A Vencer</SelectItem>
                    <SelectItem value="Vencido">Vencido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select value={filterTipo} onValueChange={setFilterTipo}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos os tipos">Todos os tipos</SelectItem>
                    <SelectItem value="Corrente">Corrente</SelectItem>
                    <SelectItem value="Intermediário">Intermediário</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Caixa</Label>
                <Select value={filterCaixa} onValueChange={setFilterCaixa}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todas as caixas">Todas as caixas</SelectItem>
                    {mockCaixas.map((caixa) => (
                      <SelectItem key={caixa.codigo} value={caixa.codigo}>
                        {caixa.codigo}
                      </SelectItem>
                    ))}
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
                    setFilterSetor("Todos os setores")
                    setFilterStatus("Todos os status")
                    setFilterTipo("Todos os tipos")
                    setFilterCaixa("Todas as caixas")
                  }}
                >
                  Limpar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de Documentos */}
        <Card>
          <CardHeader>
            <CardTitle>Documentos Cadastrados</CardTitle>
            <CardDescription>{filteredDocuments.length} documento(s) encontrado(s)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Responsável</TableHead>
                    <TableHead>Setor</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Caixa</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Data Arquivamento</TableHead>
                    <TableHead>Data Descarte</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.codigo}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          {doc.responsavel}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          {doc.setor}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={doc.tipo === "Corrente" ? "default" : "secondary"}>{doc.tipo}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-gray-400" />
                          {doc.caixa}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <div className="text-sm">
                            <div>{doc.localizacao.rua}</div>
                            <div className="text-gray-500 dark:text-gray-400">
                              {doc.localizacao.estante}-{doc.localizacao.andar}-{doc.localizacao.posicao}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {new Date(doc.dataArquivamento).toLocaleDateString("pt-BR")}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {new Date(doc.dataDescarte).toLocaleDateString("pt-BR")}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(doc.status)}</TableCell>
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
