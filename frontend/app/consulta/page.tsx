"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Search, CalendarIcon, FileText, MapPin, User, Clock, Download, Eye, Bookmark } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Header } from "@/components/header"

// Dados mockados para demonstração
const documentos = [
  {
    id: 1,
    titulo: "Contrato de Prestação de Serviços - Empresa ABC",
    tipo: "Contrato",
    setor: "Jurídico",
    dataArquivamento: "2024-01-15",
    dataVencimento: "2024-12-15",
    status: "Ativo",
    localizacao: "Arquivo A - Prateleira 3 - Caixa 15",
    responsavel: "João Silva",
    observacoes: "Contrato renovado automaticamente",
    tags: ["contrato", "prestação", "serviços"],
    relevancia: 95,
  },
  {
    id: 2,
    titulo: "Relatório Financeiro Q4 2023",
    tipo: "Relatório",
    setor: "Financeiro",
    dataArquivamento: "2024-01-10",
    dataVencimento: null,
    status: "Arquivado",
    localizacao: "Arquivo B - Prateleira 1 - Caixa 8",
    responsavel: "Maria Santos",
    observacoes: "Auditoria concluída",
    tags: ["financeiro", "relatório", "q4"],
    relevancia: 88,
  },
  {
    id: 3,
    titulo: "Correspondência - Prefeitura Municipal",
    tipo: "Correspondência",
    setor: "Administrativo",
    dataArquivamento: "2024-01-08",
    dataVencimento: "2024-02-08",
    status: "Pendente",
    localizacao: "Arquivo A - Prateleira 2 - Caixa 5",
    responsavel: "Carlos Lima",
    observacoes: "Aguardando resposta",
    tags: ["correspondência", "prefeitura", "municipal"],
    relevancia: 76,
  },
  {
    id: 4,
    titulo: "Manual de Procedimentos - RH",
    tipo: "Manual",
    setor: "Recursos Humanos",
    dataArquivamento: "2024-01-05",
    dataVencimento: null,
    status: "Ativo",
    localizacao: "Arquivo C - Prateleira 4 - Caixa 12",
    responsavel: "Ana Costa",
    observacoes: "Versão atualizada",
    tags: ["manual", "procedimentos", "rh"],
    relevancia: 82,
  },
  {
    id: 5,
    titulo: "Nota Fiscal - Fornecedor XYZ",
    tipo: "Nota Fiscal",
    setor: "Financeiro",
    dataArquivamento: "2024-01-03",
    dataVencimento: "2024-07-03",
    status: "Ativo",
    localizacao: "Arquivo B - Prateleira 2 - Caixa 20",
    responsavel: "Pedro Oliveira",
    observacoes: "Pagamento em dia",
    tags: ["nota", "fiscal", "fornecedor"],
    relevancia: 70,
  },
]

export default function Consulta() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSetor, setSelectedSetor] = useState("Todos os setores")
  const [selectedTipo, setSelectedTipo] = useState("Todos os tipos")
  const [selectedStatus, setSelectedStatus] = useState("Todos os status")
  const [selectedResponsavel, setSelectedResponsavel] = useState("Todos os responsáveis")
  const [dateFrom, setDateFrom] = useState(null)
  const [dateTo, setDateTo] = useState(null)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  // Simular busca
  const handleSearch = async () => {
    setIsSearching(true)
    setHasSearched(true)

    // Simular delay da busca
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Filtrar documentos baseado nos critérios
    const filtered = documentos.filter((doc) => {
      const matchesSearch =
        !searchTerm ||
        doc.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.observacoes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesSetor = !selectedSetor || doc.setor === selectedSetor
      const matchesTipo = !selectedTipo || doc.tipo === selectedTipo
      const matchesStatus = !selectedStatus || doc.status === selectedStatus
      const matchesResponsavel = !selectedResponsavel || doc.responsavel === selectedResponsavel

      const docDate = new Date(doc.dataArquivamento)
      const matchesDateFrom = !dateFrom || docDate >= dateFrom
      const matchesDateTo = !dateTo || docDate <= dateTo

      return (
        matchesSearch &&
        matchesSetor &&
        matchesTipo &&
        matchesStatus &&
        matchesResponsavel &&
        matchesDateFrom &&
        matchesDateTo
      )
    })

    // Ordenar por relevância
    filtered.sort((a, b) => b.relevancia - a.relevancia)

    setSearchResults(filtered)
    setIsSearching(false)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedSetor("Todos os setores")
    setSelectedTipo("Todos os tipos")
    setSelectedStatus("Todos os status")
    setSelectedResponsavel("Todos os responsáveis")
    setDateFrom(null)
    setDateTo(null)
    setSearchResults([])
    setHasSearched(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Ativo":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "Pendente":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "Arquivado":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const getRelevanciaColor = (relevancia) => {
    if (relevancia >= 90) return "text-green-600 dark:text-green-400"
    if (relevancia >= 80) return "text-blue-600 dark:text-blue-400"
    if (relevancia >= 70) return "text-yellow-600 dark:text-yellow-400"
    return "text-gray-600 dark:text-gray-400"
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-700 ease-in-out">
      <Header />

      <div className="p-6 space-y-6">
        {/* Header da página */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-700 ease-in-out">
            Consulta Avançada
          </h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1 transition-colors duration-700 ease-in-out">
            Encontre documentos específicos usando filtros avançados
          </p>
        </div>

        {/* Formulário de busca */}
        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <Search className="h-5 w-5" />
              Busca de Documentos
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-slate-400">
              Use os filtros abaixo para encontrar documentos específicos
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Busca principal */}
            <div className="space-y-2">
              <Label htmlFor="search" className="text-gray-900 dark:text-white">
                Termo de Busca
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="search"
                  placeholder="Digite palavras-chave, título do documento, observações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 dark:bg-slate-700 dark:border-slate-600"
                />
              </div>
            </div>

            {/* Filtros básicos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-900 dark:text-white">Setor</Label>
                <Select value={selectedSetor} onValueChange={setSelectedSetor}>
                  <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600">
                    <SelectValue placeholder="Todos os setores" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                    <SelectItem value="Todos os setores">Todos os setores</SelectItem>
                    <SelectItem value="Jurídico">Jurídico</SelectItem>
                    <SelectItem value="Financeiro">Financeiro</SelectItem>
                    <SelectItem value="Administrativo">Administrativo</SelectItem>
                    <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-900 dark:text-white">Tipo de Documento</Label>
                <Select value={selectedTipo} onValueChange={setSelectedTipo}>
                  <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600">
                    <SelectValue placeholder="Todos os tipos" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                    <SelectItem value="Todos os tipos">Todos os tipos</SelectItem>
                    <SelectItem value="Contrato">Contrato</SelectItem>
                    <SelectItem value="Relatório">Relatório</SelectItem>
                    <SelectItem value="Correspondência">Correspondência</SelectItem>
                    <SelectItem value="Manual">Manual</SelectItem>
                    <SelectItem value="Nota Fiscal">Nota Fiscal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-900 dark:text-white">Status</Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600">
                    <SelectValue placeholder="Todos os status" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                    <SelectItem value="Todos os status">Todos os status</SelectItem>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                    <SelectItem value="Arquivado">Arquivado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Toggle para filtros avançados */}
            <div className="flex items-center space-x-2">
              <Checkbox id="advanced" checked={showAdvancedFilters} onCheckedChange={setShowAdvancedFilters} />
              <Label htmlFor="advanced" className="text-gray-900 dark:text-white cursor-pointer">
                Mostrar filtros avançados
              </Label>
            </div>

            {/* Filtros avançados */}
            {showAdvancedFilters && (
              <>
                <Separator className="dark:bg-slate-700" />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filtros Avançados</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-900 dark:text-white">Responsável</Label>
                      <Select value={selectedResponsavel} onValueChange={setSelectedResponsavel}>
                        <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600">
                          <SelectValue placeholder="Todos os responsáveis" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                          <SelectItem value="Todos os responsáveis">Todos os responsáveis</SelectItem>
                          <SelectItem value="João Silva">João Silva</SelectItem>
                          <SelectItem value="Maria Santos">Maria Santos</SelectItem>
                          <SelectItem value="Carlos Lima">Carlos Lima</SelectItem>
                          <SelectItem value="Ana Costa">Ana Costa</SelectItem>
                          <SelectItem value="Pedro Oliveira">Pedro Oliveira</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-900 dark:text-white">Data de Arquivamento - De</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal dark:bg-slate-700 dark:border-slate-600",
                              !dateFrom && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateFrom ? format(dateFrom, "PPP", { locale: ptBR }) : "Selecionar data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 dark:bg-slate-700 dark:border-slate-600">
                          <Calendar
                            mode="single"
                            selected={dateFrom}
                            onSelect={setDateFrom}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-900 dark:text-white">Data de Arquivamento - Até</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal dark:bg-slate-700 dark:border-slate-600",
                              !dateTo && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateTo ? format(dateTo, "PPP", { locale: ptBR }) : "Selecionar data"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 dark:bg-slate-700 dark:border-slate-600">
                          <Calendar
                            mode="single"
                            selected={dateTo}
                            onSelect={setDateTo}
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleSearch} disabled={isSearching} className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                {isSearching ? "Buscando..." : "Buscar Documentos"}
              </Button>
              <Button variant="outline" onClick={clearFilters}>
                Limpar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resultados da busca */}
        {hasSearched && (
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-gray-900 dark:text-white">Resultados da Busca</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-slate-400">
                    {searchResults.length} documento(s) encontrado(s)
                  </CardDescription>
                </div>
                {searchResults.length > 0 && (
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Download className="h-4 w-4" />
                    Exportar Resultados
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {searchResults.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-400 dark:text-slate-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Nenhum documento encontrado
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400">
                    Tente ajustar os filtros de busca ou usar termos diferentes
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {searchResults.map((doc) => (
                    <div
                      key={doc.id}
                      className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 dark:bg-slate-800/50"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-3 mb-3">
                            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{doc.titulo}</h3>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="dark:border-slate-600 dark:text-slate-300">
                                  {doc.tipo}
                                </Badge>
                                <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                                <span className={`text-sm font-medium ${getRelevanciaColor(doc.relevancia)}`}>
                                  {doc.relevancia}% relevante
                                </span>
                              </div>
                              {doc.observacoes && (
                                <p className="text-sm text-gray-600 dark:text-slate-400 mb-3">{doc.observacoes}</p>
                              )}
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                                <div className="flex items-center gap-2 text-gray-600 dark:text-slate-400">
                                  <User className="h-4 w-4" />
                                  {doc.responsavel}
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 dark:text-slate-400">
                                  <MapPin className="h-4 w-4" />
                                  {doc.localizacao}
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 dark:text-slate-400">
                                  <Clock className="h-4 w-4" />
                                  {new Date(doc.dataArquivamento).toLocaleDateString("pt-BR")}
                                </div>
                                <div className="text-gray-600 dark:text-slate-400">Setor: {doc.setor}</div>
                              </div>
                              {doc.tags && doc.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-3">
                                  {doc.tags.map((tag, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                                    >
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="sm" variant="outline" className="flex items-center gap-2 bg-transparent">
                            <Eye className="h-4 w-4" />
                            Visualizar
                          </Button>
                          <Button size="sm" variant="ghost" className="flex items-center gap-2">
                            <Bookmark className="h-4 w-4" />
                            Salvar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Dicas de busca */}
        {!hasSearched && (
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Dicas de Busca</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Busca por Palavras-chave</h4>
                  <ul className="text-sm text-gray-600 dark:text-slate-400 space-y-1">
                    <li>• Use aspas para buscar frases exatas: "contrato de serviços"</li>
                    <li>• Combine múltiplas palavras para refinar a busca</li>
                    <li>• Busque por números de documento ou códigos</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Filtros Avançados</h4>
                  <ul className="text-sm text-gray-600 dark:text-slate-400 space-y-1">
                    <li>• Use filtros de data para encontrar documentos de períodos específicos</li>
                    <li>• Combine múltiplos filtros para busca mais precisa</li>
                    <li>• Filtre por responsável para encontrar documentos de uma pessoa</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
