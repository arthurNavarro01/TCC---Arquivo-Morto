"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  MapPin,
  Filter,
  Eye,
  FileText,
  Calendar,
  User,
  Building2,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  QrCode,
} from "lucide-react"

// Dados mockados para consulta
const mockSearchResults = [
  {
    id: 1,
    codigo: "DOC-2024-001",
    responsavel: "Maria Silva",
    setor: "Secretaria",
    ano: 2024,
    tipo: "Corrente",
    anosDescarte: 5,
    dataDescarte: "2029-12-31",
    status: "Válido",
    localizacao: {
      rua: "A",
      estante: "E1",
      andar: "2",
      posicao: "P3",
    },
    descricao: "Atas de reunião pedagógica",
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
    dataDescarte: "2024-02-15",
    status: "Vencido",
    localizacao: {
      rua: "B",
      estante: "E2",
      andar: "1",
      posicao: "P1",
    },
    descricao: "Contratos de trabalho temporário",
    dataCadastro: "2023-02-15",
    temPDF: false,
  },
]

export default function Consulta() {
  const [searchType, setSearchType] = useState("geral")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState({
    rua: "default",
    estante: "default",
    andar: "default",
    posicao: "default",
  })
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null)

  const handleSearch = () => {
    setIsSearching(true)
    // Simular busca
    setTimeout(() => {
      setResults(mockSearchResults)
      setIsSearching(false)
    }, 1000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Válido":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Válido
          </Badge>
        )
      case "Vencido":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Vencido
          </Badge>
        )
      case "A Vencer":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />A Vencer
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Consulta de Documentos</h1>
          <p className="text-gray-600 mt-1">Localize documentos por diferentes critérios de busca</p>
        </div>

        {/* Tipos de Busca */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            className={`cursor-pointer transition-all ${searchType === "geral" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"}`}
            onClick={() => setSearchType("geral")}
          >
            <CardHeader className="text-center">
              <Search className="h-8 w-8 mx-auto text-blue-600" />
              <CardTitle className="text-lg">Busca Geral</CardTitle>
              <CardDescription>Buscar por código, responsável ou descrição</CardDescription>
            </CardHeader>
          </Card>

          <Card
            className={`cursor-pointer transition-all ${searchType === "localizacao" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"}`}
            onClick={() => setSearchType("localizacao")}
          >
            <CardHeader className="text-center">
              <MapPin className="h-8 w-8 mx-auto text-green-600" />
              <CardTitle className="text-lg">Por Localização</CardTitle>
              <CardDescription>Buscar por rua, estante, andar e posição</CardDescription>
            </CardHeader>
          </Card>

          <Card
            className={`cursor-pointer transition-all ${searchType === "avancada" ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"}`}
            onClick={() => setSearchType("avancada")}
          >
            <CardHeader className="text-center">
              <Filter className="h-8 w-8 mx-auto text-purple-600" />
              <CardTitle className="text-lg">Busca Avançada</CardTitle>
              <CardDescription>Combinar múltiplos filtros</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Formulário de Busca */}
        <Card>
          <CardHeader>
            <CardTitle>
              {searchType === "geral" && "Busca Geral"}
              {searchType === "localizacao" && "Busca por Localização"}
              {searchType === "avancada" && "Busca Avançada"}
            </CardTitle>
            <CardDescription>
              {searchType === "geral" && "Digite o termo de busca para localizar documentos"}
              {searchType === "localizacao" && "Informe a localização específica do documento"}
              {searchType === "avancada" && "Use múltiplos critérios para refinar sua busca"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {searchType === "geral" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="searchTerm">Termo de Busca</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="searchTerm"
                      placeholder="Digite código, responsável ou descrição..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {searchType === "localizacao" && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Rua</Label>
                  <Select
                    value={selectedLocation.rua}
                    onValueChange={(value) => setSelectedLocation({ ...selectedLocation, rua: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a rua" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Todas as ruas</SelectItem>
                      <SelectItem value="A">Rua A</SelectItem>
                      <SelectItem value="B">Rua B</SelectItem>
                      <SelectItem value="C">Rua C</SelectItem>
                      <SelectItem value="D">Rua D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Estante</Label>
                  <Input
                    placeholder="Ex: E1"
                    value={selectedLocation.estante}
                    onChange={(e) => setSelectedLocation({ ...selectedLocation, estante: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Andar</Label>
                  <Input
                    placeholder="Ex: 1"
                    value={selectedLocation.andar}
                    onChange={(e) => setSelectedLocation({ ...selectedLocation, andar: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Posição</Label>
                  <Input
                    placeholder="Ex: P1"
                    value={selectedLocation.posicao}
                    onChange={(e) => setSelectedLocation({ ...selectedLocation, posicao: e.target.value })}
                  />
                </div>
              </div>
            )}

            {searchType === "avancada" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Setor</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os setores" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Todos os setores</SelectItem>
                      <SelectItem value="secretaria">Secretaria</SelectItem>
                      <SelectItem value="rh">Recursos Humanos</SelectItem>
                      <SelectItem value="financeiro">Financeiro</SelectItem>
                      <SelectItem value="coordenacao">Coordenação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os tipos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Todos os tipos</SelectItem>
                      <SelectItem value="corrente">Corrente</SelectItem>
                      <SelectItem value="intermediario">Intermediário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Todos os status</SelectItem>
                      <SelectItem value="valido">Válido</SelectItem>
                      <SelectItem value="a-vencer">A Vencer</SelectItem>
                      <SelectItem value="vencido">Vencido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Responsável</Label>
                  <Input placeholder="Nome do responsável" />
                </div>
                <div className="space-y-2">
                  <Label>Ano</Label>
                  <Input type="number" placeholder="2024" />
                </div>
                <div className="space-y-2">
                  <Label>Rua</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas as ruas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Todas as ruas</SelectItem>
                      <SelectItem value="A">Rua A</SelectItem>
                      <SelectItem value="B">Rua B</SelectItem>
                      <SelectItem value="C">Rua C</SelectItem>
                      <SelectItem value="D">Rua D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSearch} disabled={isSearching} className="bg-blue-600 hover:bg-blue-700">
                <Search className="h-4 w-4 mr-2" />
                {isSearching ? "Buscando..." : "Buscar"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedLocation({ rua: "default", estante: "default", andar: "default", posicao: "default" })
                  setResults([])
                }}
              >
                Limpar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resultados da Busca */}
        {results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Resultados da Busca</CardTitle>
              <CardDescription>{results.length} documento(s) encontrado(s)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {results.map((doc) => (
                  <Card key={doc.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-blue-600" />
                            <span className="font-semibold text-lg">{doc.codigo}</span>
                            {getStatusBadge(doc.status)}
                          </div>

                          <p className="text-gray-700 font-medium">{doc.descricao}</p>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-gray-400" />
                              <span>
                                <strong>Responsável:</strong> {doc.responsavel}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Building2 className="h-4 w-4 text-gray-400" />
                              <span>
                                <strong>Setor:</strong> {doc.setor}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              <span>
                                <strong>Ano:</strong> {doc.ano}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span>
                                <strong>Localização:</strong> {doc.localizacao.rua}-{doc.localizacao.estante}-
                                {doc.localizacao.andar}-{doc.localizacao.posicao}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>
                              <strong>Tipo:</strong> {doc.tipo}
                            </span>
                            <span>
                              <strong>Descarte em:</strong> {new Date(doc.dataDescarte).toLocaleDateString("pt-BR")}
                            </span>
                            <span>
                              <strong>Cadastrado em:</strong> {new Date(doc.dataCadastro).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 ml-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 mr-2" />
                                Detalhes
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Detalhes do Documento</DialogTitle>
                                <DialogDescription>Informações completas do documento {doc.codigo}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium text-gray-500">Código</Label>
                                    <p className="text-lg font-semibold">{doc.codigo}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-gray-500">Status</Label>
                                    <div className="mt-1">{getStatusBadge(doc.status)}</div>
                                  </div>
                                </div>

                                <div>
                                  <Label className="text-sm font-medium text-gray-500">Descrição</Label>
                                  <p className="mt-1">{doc.descricao}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium text-gray-500">Responsável</Label>
                                    <p className="mt-1">{doc.responsavel}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-gray-500">Setor</Label>
                                    <p className="mt-1">{doc.setor}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium text-gray-500">Ano</Label>
                                    <p className="mt-1">{doc.ano}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-gray-500">Tipo</Label>
                                    <p className="mt-1">{doc.tipo}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-gray-500">Anos para Descarte</Label>
                                    <p className="mt-1">{doc.anosDescarte} anos</p>
                                  </div>
                                </div>

                                <div>
                                  <Label className="text-sm font-medium text-gray-500">Localização Completa</Label>
                                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                                    <div className="grid grid-cols-4 gap-4 text-sm">
                                      <div>
                                        <strong>Rua:</strong> {doc.localizacao.rua}
                                      </div>
                                      <div>
                                        <strong>Estante:</strong> {doc.localizacao.estante}
                                      </div>
                                      <div>
                                        <strong>Andar:</strong> {doc.localizacao.andar}
                                      </div>
                                      <div>
                                        <strong>Posição:</strong> {doc.localizacao.posicao}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium text-gray-500">Data de Cadastro</Label>
                                    <p className="mt-1">{new Date(doc.dataCadastro).toLocaleDateString("pt-BR")}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-gray-500">Data de Descarte</Label>
                                    <p className="mt-1">{new Date(doc.dataDescarte).toLocaleDateString("pt-BR")}</p>
                                  </div>
                                </div>

                                {doc.temPDF && (
                                  <div className="flex gap-2">
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                      <Download className="h-4 w-4 mr-2" />
                                      Baixar PDF
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <QrCode className="h-4 w-4 mr-2" />
                                      QR Code
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>

                          {doc.temPDF && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 hover:text-green-700 bg-transparent"
                            >
                              <Download className="h-4 w-4 mr-2" />
                              PDF
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
