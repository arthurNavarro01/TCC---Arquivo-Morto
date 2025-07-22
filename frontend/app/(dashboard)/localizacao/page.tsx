"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MapPin, Package, Building2, Layers, Grid3X3, Eye, AlertTriangle, CheckCircle, Clock } from "lucide-react"

// Dados mockados
const mockCaixas = [
  {
    codigo: "CX-001",
    rua: "Rua Camélia",
    estante: "E1",
    andar: "2",
    posicao: "3",
    documentos: 23,
    capacidade: 50,
    status: "Ativa",
  },
  {
    codigo: "CX-002",
    rua: "Rua Angélica",
    estante: "E3",
    andar: "1",
    posicao: "5",
    documentos: 47,
    capacidade: 50,
    status: "Quase Cheia",
  },
  {
    codigo: "CX-003",
    rua: "Rua Av. Getúlio Vargas",
    estante: "E2",
    andar: "4",
    posicao: "1",
    documentos: 50,
    capacidade: 50,
    status: "Cheia",
  },
  {
    codigo: "CX-004",
    rua: "Rua Camélia",
    estante: "E1",
    andar: "3",
    posicao: "1",
    documentos: 15,
    capacidade: 50,
    status: "Ativa",
  },
  {
    codigo: "CX-005",
    rua: "Rua das Flores",
    estante: "E1",
    andar: "1",
    posicao: "2",
    documentos: 8,
    capacidade: 50,
    status: "Ativa",
  },
]

const ruas = ["Rua Camélia", "Rua Angélica", "Rua Av. Getúlio Vargas", "Rua das Flores"]

export default function LocalizacaoFisica() {
  const [selectedRua, setSelectedRua] = useState("Rua Camélia")
  const [selectedEstante, setSelectedEstante] = useState("E1")
  const [selectedCaixa, setSelectedCaixa] = useState(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  // Filtrar caixas por rua e estante
  const caixasFiltradas = mockCaixas.filter((caixa) => caixa.rua === selectedRua && caixa.estante === selectedEstante)

  // Obter estantes disponíveis para a rua selecionada
  const estantesDisponiveis = [
    ...new Set(mockCaixas.filter((caixa) => caixa.rua === selectedRua).map((caixa) => caixa.estante)),
  ].sort()

  // Criar grid de posições (10 andares x 6 posições)
  const createGrid = () => {
    const grid = []
    for (let andar = 10; andar >= 1; andar--) {
      const linha = []
      for (let posicao = 1; posicao <= 6; posicao++) {
        const caixa = caixasFiltradas.find((c) => c.andar === andar.toString() && c.posicao === posicao.toString())
        linha.push({
          andar: andar.toString(),
          posicao: posicao.toString(),
          caixa: caixa || null,
        })
      }
      grid.push(linha)
    }
    return grid
  }

  const grid = createGrid()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativa":
        return "bg-green-500 hover:bg-green-600"
      case "Quase Cheia":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "Cheia":
        return "bg-red-500 hover:bg-red-600"
      default:
        return "bg-gray-300 hover:bg-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Ativa":
        return <CheckCircle className="h-3 w-3" />
      case "Quase Cheia":
        return <Clock className="h-3 w-3" />
      case "Cheia":
        return <AlertTriangle className="h-3 w-3" />
      default:
        return null
    }
  }

  const handleCaixaClick = (caixa: any) => {
    setSelectedCaixa(caixa)
    setIsDetailDialogOpen(true)
  }

  // Estatísticas da localização atual
  const totalPosicoes = 60 // 10 andares x 6 posições
  const posicoesOcupadas = caixasFiltradas.length
  const posicoesLivres = totalPosicoes - posicoesOcupadas
  const percentualOcupacao = Math.round((posicoesOcupadas / totalPosicoes) * 100)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Localização Física</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">Visualização da estrutura física do arquivo morto</p>
          </div>
        </div>

        {/* Seletores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Selecionar Localização
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Rua</label>
                <Select value={selectedRua} onValueChange={setSelectedRua}>
                  <SelectTrigger>
                    <SelectValue />
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
                <label className="text-sm font-medium">Estante</label>
                <Select value={selectedEstante} onValueChange={setSelectedEstante}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {estantesDisponiveis.map((estante) => (
                      <SelectItem key={estante} value={estante}>
                        {estante}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Grid3X3 className="h-5 w-5" />
                Estatísticas da Localização
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{posicoesOcupadas}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Ocupadas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">{posicoesLivres}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Livres</div>
                </div>
                <div className="col-span-2 text-center">
                  <div className="text-lg font-bold text-green-600">{percentualOcupacao}%</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Taxa de Ocupação</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Legenda */}
        <Card>
          <CardHeader>
            <CardTitle>Legenda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 border-2 border-dashed border-gray-400 rounded"></div>
                <span className="text-sm">Posição Vazia</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
                  <CheckCircle className="h-2 w-2 text-white" />
                </div>
                <span className="text-sm">Caixa Ativa</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded flex items-center justify-center">
                  <Clock className="h-2 w-2 text-white" />
                </div>
                <span className="text-sm">Caixa Quase Cheia</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded flex items-center justify-center">
                  <AlertTriangle className="h-2 w-2 text-white" />
                </div>
                <span className="text-sm">Caixa Cheia</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grid de Visualização */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5" />
              {selectedRua} - {selectedEstante}
            </CardTitle>
            <CardDescription>Clique em uma caixa para ver detalhes. Grade: 10 andares × 6 posições</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {/* Cabeçalho das posições */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                <div className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">Andar</div>
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                    Pos {i + 1}
                  </div>
                ))}
              </div>

              {/* Grid principal */}
              {grid.map((linha, andarIndex) => (
                <div key={andarIndex} className="grid grid-cols-7 gap-2">
                  {/* Número do andar */}
                  <div className="flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded p-2">
                    {linha[0].andar}
                  </div>

                  {/* Posições */}
                  {linha.map((posicao, posicaoIndex) => (
                    <div key={posicaoIndex} className="aspect-square">
                      {posicao.caixa ? (
                        <Button
                          variant="outline"
                          className={`w-full h-full p-1 ${getStatusColor(posicao.caixa.status)} text-white border-0 flex flex-col items-center justify-center gap-1`}
                          onClick={() => handleCaixaClick(posicao.caixa)}
                        >
                          <Package className="h-3 w-3" />
                          <span className="text-xs font-medium truncate">{posicao.caixa.codigo.split("-").pop()}</span>
                          {getStatusIcon(posicao.caixa.status)}
                        </Button>
                      ) : (
                        <div className="w-full h-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                          <span className="text-xs text-gray-400">Vazio</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Dialog de Detalhes da Caixa */}
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Detalhes da Caixa
              </DialogTitle>
              <DialogDescription>Informações completas da caixa selecionada</DialogDescription>
            </DialogHeader>
            {selectedCaixa && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Código</label>
                    <p className="font-medium">{selectedCaixa.codigo}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                    <div className="mt-1">
                      <Badge
                        className={
                          selectedCaixa.status === "Ativa"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                            : selectedCaixa.status === "Quase Cheia"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                        }
                      >
                        {selectedCaixa.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Localização Completa</label>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>
                      {selectedCaixa.rua} - {selectedCaixa.estante}-{selectedCaixa.andar}-{selectedCaixa.posicao}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Ocupação</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{selectedCaixa.documentos} documentos</span>
                      <span>{Math.round((selectedCaixa.documentos / selectedCaixa.capacidade) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          selectedCaixa.status === "Ativa"
                            ? "bg-green-500"
                            : selectedCaixa.status === "Quase Cheia"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }`}
                        style={{ width: `${(selectedCaixa.documentos / selectedCaixa.capacidade) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button className="w-full bg-transparent" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Documentos da Caixa
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
