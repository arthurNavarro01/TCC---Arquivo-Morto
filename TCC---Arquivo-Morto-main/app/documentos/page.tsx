"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileText, Plus, Search, Filter, Download, Edit, Trash2, Eye, MoreHorizontal } from "lucide-react"
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
  },
]

export default function Documentos() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSetor, setSelectedSetor] = useState("todos")
  const [selectedTipo, setSelectedTipo] = useState("todos")
  const [selectedStatus, setSelectedStatus] = useState("todos")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState(null)

  // Filtrar documentos
  const filteredDocuments = documentos.filter((doc) => {
    const matchesSearch =
      doc.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.responsavel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.localizacao.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSetor = selectedSetor === "todos" || doc.setor === selectedSetor
    const matchesTipo = selectedTipo === "todos" || doc.tipo === selectedTipo
    const matchesStatus = selectedStatus === "todos" || doc.status === selectedStatus

    return matchesSearch && matchesSetor && matchesTipo && matchesStatus
  })

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

  const handleEdit = (document) => {
    setSelectedDocument(document)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (id) => {
    if (confirm("Tem certeza que deseja excluir este documento?")) {
      // Aqui você implementaria a lógica de exclusão
      console.log("Excluindo documento:", id)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-700 ease-in-out">
      <Header />

      <div className="p-6 space-y-6">
        {/* Header da página */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-700 ease-in-out">
              Gestão de Documentos
            </h1>
            <p className="text-gray-600 dark:text-slate-400 mt-1 transition-colors duration-700 ease-in-out">
              Gerencie todos os documentos do arquivo físico
            </p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Novo Documento
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl dark:bg-slate-800 dark:border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-gray-900 dark:text-white">Adicionar Novo Documento</DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-slate-400">
                  Preencha as informações do documento para arquivamento
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo" className="text-gray-900 dark:text-white">
                      Título do Documento
                    </Label>
                    <Input
                      id="titulo"
                      placeholder="Digite o título..."
                      className="dark:bg-slate-700 dark:border-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipo" className="text-gray-900 dark:text-white">
                      Tipo
                    </Label>
                    <Select>
                      <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                        <SelectItem value="contrato">Contrato</SelectItem>
                        <SelectItem value="relatorio">Relatório</SelectItem>
                        <SelectItem value="correspondencia">Correspondência</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="nota-fiscal">Nota Fiscal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="setor" className="text-gray-900 dark:text-white">
                      Setor
                    </Label>
                    <Select>
                      <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600">
                        <SelectValue placeholder="Selecione o setor" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                        <SelectItem value="juridico">Jurídico</SelectItem>
                        <SelectItem value="financeiro">Financeiro</SelectItem>
                        <SelectItem value="administrativo">Administrativo</SelectItem>
                        <SelectItem value="rh">Recursos Humanos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="responsavel" className="text-gray-900 dark:text-white">
                      Responsável
                    </Label>
                    <Input
                      id="responsavel"
                      placeholder="Nome do responsável..."
                      className="dark:bg-slate-700 dark:border-slate-600"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dataVencimento" className="text-gray-900 dark:text-white">
                      Data de Vencimento
                    </Label>
                    <Input id="dataVencimento" type="date" className="dark:bg-slate-700 dark:border-slate-600" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="localizacao" className="text-gray-900 dark:text-white">
                      Localização
                    </Label>
                    <Input
                      id="localizacao"
                      placeholder="Ex: Arquivo A - Prateleira 1 - Caixa 5"
                      className="dark:bg-slate-700 dark:border-slate-600"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="observacoes" className="text-gray-900 dark:text-white">
                    Observações
                  </Label>
                  <Textarea
                    id="observacoes"
                    placeholder="Observações adicionais..."
                    className="dark:bg-slate-700 dark:border-slate-600"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Salvar Documento</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filtros e busca */}
        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
              <Filter className="h-5 w-5" />
              Filtros e Busca
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Buscar por título, responsável ou localização..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 dark:bg-slate-700 dark:border-slate-600"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={selectedSetor} onValueChange={setSelectedSetor}>
                  <SelectTrigger className="w-40 dark:bg-slate-700 dark:border-slate-600">
                    <SelectValue placeholder="Setor" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                    <SelectItem value="todos">Todos os Setores</SelectItem>
                    <SelectItem value="Jurídico">Jurídico</SelectItem>
                    <SelectItem value="Financeiro">Financeiro</SelectItem>
                    <SelectItem value="Administrativo">Administrativo</SelectItem>
                    <SelectItem value="Recursos Humanos">RH</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedTipo} onValueChange={setSelectedTipo}>
                  <SelectTrigger className="w-40 dark:bg-slate-700 dark:border-slate-600">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                    <SelectItem value="todos">Todos os Tipos</SelectItem>
                    <SelectItem value="Contrato">Contrato</SelectItem>
                    <SelectItem value="Relatório">Relatório</SelectItem>
                    <SelectItem value="Correspondência">Correspondência</SelectItem>
                    <SelectItem value="Manual">Manual</SelectItem>
                    <SelectItem value="Nota Fiscal">Nota Fiscal</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-40 dark:bg-slate-700 dark:border-slate-600">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                    <SelectItem value="todos">Todos os Status</SelectItem>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                    <SelectItem value="Arquivado">Arquivado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabela de documentos */}
        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-gray-900 dark:text-white">Documentos Arquivados</CardTitle>
                <CardDescription className="text-gray-600 dark:text-slate-400">
                  {filteredDocuments.length} documento(s) encontrado(s)
                </CardDescription>
              </div>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="dark:border-slate-700">
                    <TableHead className="text-gray-900 dark:text-white">Documento</TableHead>
                    <TableHead className="text-gray-900 dark:text-white">Tipo</TableHead>
                    <TableHead className="text-gray-900 dark:text-white">Setor</TableHead>
                    <TableHead className="text-gray-900 dark:text-white">Status</TableHead>
                    <TableHead className="text-gray-900 dark:text-white">Responsável</TableHead>
                    <TableHead className="text-gray-900 dark:text-white">Data Arquivamento</TableHead>
                    <TableHead className="text-gray-900 dark:text-white">Localização</TableHead>
                    <TableHead className="text-gray-900 dark:text-white">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id} className="dark:border-slate-700">
                      <TableCell>
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{doc.titulo}</p>
                            {doc.observacoes && (
                              <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{doc.observacoes}</p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="dark:border-slate-600 dark:text-slate-300">
                          {doc.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-slate-400">{doc.setor}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-slate-400">{doc.responsavel}</TableCell>
                      <TableCell className="text-gray-600 dark:text-slate-400">
                        {new Date(doc.dataArquivamento).toLocaleDateString("pt-BR")}
                      </TableCell>
                      <TableCell className="text-gray-600 dark:text-slate-400">{doc.localizacao}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="dark:bg-slate-700 dark:border-slate-600">
                            <DropdownMenuItem className="dark:text-slate-300 dark:hover:bg-slate-600">
                              <Eye className="h-4 w-4 mr-2" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEdit(doc)}
                              className="dark:text-slate-300 dark:hover:bg-slate-600"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(doc.id)}
                              className="text-red-600 dark:text-red-400 dark:hover:bg-slate-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Dialog de edição */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl dark:bg-slate-800 dark:border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-gray-900 dark:text-white">Editar Documento</DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-slate-400">
                Atualize as informações do documento
              </DialogDescription>
            </DialogHeader>
            {selectedDocument && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-titulo" className="text-gray-900 dark:text-white">
                      Título do Documento
                    </Label>
                    <Input
                      id="edit-titulo"
                      defaultValue={selectedDocument.titulo}
                      className="dark:bg-slate-700 dark:border-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-tipo" className="text-gray-900 dark:text-white">
                      Tipo
                    </Label>
                    <Select defaultValue={selectedDocument.tipo.toLowerCase()}>
                      <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                        <SelectItem value="contrato">Contrato</SelectItem>
                        <SelectItem value="relatorio">Relatório</SelectItem>
                        <SelectItem value="correspondencia">Correspondência</SelectItem>
                        <SelectItem value="manual">Manual</SelectItem>
                        <SelectItem value="nota-fiscal">Nota Fiscal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-setor" className="text-gray-900 dark:text-white">
                      Setor
                    </Label>
                    <Select defaultValue={selectedDocument.setor}>
                      <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                        <SelectItem value="Jurídico">Jurídico</SelectItem>
                        <SelectItem value="Financeiro">Financeiro</SelectItem>
                        <SelectItem value="Administrativo">Administrativo</SelectItem>
                        <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-responsavel" className="text-gray-900 dark:text-white">
                      Responsável
                    </Label>
                    <Input
                      id="edit-responsavel"
                      defaultValue={selectedDocument.responsavel}
                      className="dark:bg-slate-700 dark:border-slate-600"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-dataVencimento" className="text-gray-900 dark:text-white">
                      Data de Vencimento
                    </Label>
                    <Input
                      id="edit-dataVencimento"
                      type="date"
                      defaultValue={selectedDocument.dataVencimento}
                      className="dark:bg-slate-700 dark:border-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-localizacao" className="text-gray-900 dark:text-white">
                      Localização
                    </Label>
                    <Input
                      id="edit-localizacao"
                      defaultValue={selectedDocument.localizacao}
                      className="dark:bg-slate-700 dark:border-slate-600"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-observacoes" className="text-gray-900 dark:text-white">
                    Observações
                  </Label>
                  <Textarea
                    id="edit-observacoes"
                    defaultValue={selectedDocument.observacoes}
                    className="dark:bg-slate-700 dark:border-slate-600"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsEditDialogOpen(false)}>Salvar Alterações</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
