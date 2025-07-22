"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Settings,
  Users,
  Building2,
  Bell,
  Shield,
  Save,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Key,
  Database,
} from "lucide-react"
import { Header } from "@/components/header"

// Dados mockados
const usuarios = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@empresa.com",
    perfil: "Administrador",
    status: "Ativo",
    ultimoAcesso: "2024-01-20",
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@empresa.com",
    perfil: "Editor",
    status: "Ativo",
    ultimoAcesso: "2024-01-19",
  },
  {
    id: 3,
    nome: "Carlos Lima",
    email: "carlos@empresa.com",
    perfil: "Visualizador",
    status: "Inativo",
    ultimoAcesso: "2024-01-15",
  },
]

const setores = [
  { id: 1, nome: "Jurídico", responsavel: "João Silva", documentos: 156, cor: "#3b82f6" },
  { id: 2, nome: "Financeiro", responsavel: "Maria Santos", documentos: 234, cor: "#10b981" },
  { id: 3, nome: "Administrativo", responsavel: "Carlos Lima", documentos: 98, cor: "#f59e0b" },
  { id: 4, nome: "Recursos Humanos", responsavel: "Ana Costa", documentos: 76, cor: "#ef4444" },
]

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState("geral")
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)
  const [isSetorDialogOpen, setIsSetorDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [selectedSetor, setSelectedSetor] = useState(null)

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setIsUserDialogOpen(true)
  }

  const handleEditSetor = (setor) => {
    setSelectedSetor(setor)
    setIsSetorDialogOpen(true)
  }

  const handleDeleteUser = (id) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      console.log("Excluindo usuário:", id)
    }
  }

  const handleDeleteSetor = (id) => {
    if (confirm("Tem certeza que deseja excluir este setor?")) {
      console.log("Excluindo setor:", id)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-700 ease-in-out">
      <Header />

      <div className="p-6 space-y-6">
        {/* Header da página */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-700 ease-in-out">
            Configurações
          </h1>
          <p className="text-gray-600 dark:text-slate-400 mt-1 transition-colors duration-700 ease-in-out">
            Gerencie as configurações do sistema de arquivos
          </p>
        </div>

        {/* Tabs de configuração */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 dark:bg-slate-800">
            <TabsTrigger value="geral" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Geral
            </TabsTrigger>
            <TabsTrigger value="usuarios" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="setores" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Setores
            </TabsTrigger>
            <TabsTrigger value="notificacoes" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="seguranca" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Segurança
            </TabsTrigger>
          </TabsList>

          {/* Tab Geral */}
          <TabsContent value="geral" className="space-y-6">
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Configurações Gerais</CardTitle>
                <CardDescription className="text-gray-600 dark:text-slate-400">
                  Configurações básicas do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sistema-nome" className="text-gray-900 dark:text-white">
                      Nome do Sistema
                    </Label>
                    <Input
                      id="sistema-nome"
                      defaultValue="Sistema de Gestão de Arquivos"
                      className="dark:bg-slate-700 dark:border-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="empresa" className="text-gray-900 dark:text-white">
                      Nome da Empresa
                    </Label>
                    <Input
                      id="empresa"
                      defaultValue="Empresa ABC Ltda"
                      className="dark:bg-slate-700 dark:border-slate-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao" className="text-gray-900 dark:text-white">
                    Descrição
                  </Label>
                  <Textarea
                    id="descricao"
                    defaultValue="Sistema para gestão e controle de documentos físicos"
                    className="dark:bg-slate-700 dark:border-slate-600"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="timezone" className="text-gray-900 dark:text-white">
                      Fuso Horário
                    </Label>
                    <Select defaultValue="america-sao_paulo">
                      <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                        <SelectItem value="america-sao_paulo">América/São Paulo</SelectItem>
                        <SelectItem value="america-new_york">América/Nova York</SelectItem>
                        <SelectItem value="europe-london">Europa/Londres</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idioma" className="text-gray-900 dark:text-white">
                      Idioma
                    </Label>
                    <Select defaultValue="pt-br">
                      <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                        <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                        <SelectItem value="en-us">English (US)</SelectItem>
                        <SelectItem value="es-es">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-gray-900 dark:text-white">Modo de Manutenção</Label>
                    <p className="text-sm text-gray-600 dark:text-slate-400">Ativar para bloquear acesso ao sistema</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Salvar Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Usuários */}
          <TabsContent value="usuarios" className="space-y-6">
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">Gerenciamento de Usuários</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-slate-400">
                      Gerencie usuários e suas permissões
                    </CardDescription>
                  </div>
                  <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Novo Usuário
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="dark:bg-slate-800 dark:border-slate-700">
                      <DialogHeader>
                        <DialogTitle className="text-gray-900 dark:text-white">
                          {selectedUser ? "Editar Usuário" : "Novo Usuário"}
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 dark:text-slate-400">
                          {selectedUser ? "Atualize as informações do usuário" : "Adicione um novo usuário ao sistema"}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="user-nome" className="text-gray-900 dark:text-white">
                              Nome
                            </Label>
                            <Input
                              id="user-nome"
                              defaultValue={selectedUser?.nome || ""}
                              className="dark:bg-slate-700 dark:border-slate-600"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="user-email" className="text-gray-900 dark:text-white">
                              Email
                            </Label>
                            <Input
                              id="user-email"
                              type="email"
                              defaultValue={selectedUser?.email || ""}
                              className="dark:bg-slate-700 dark:border-slate-600"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="user-perfil" className="text-gray-900 dark:text-white">
                              Perfil
                            </Label>
                            <Select defaultValue={selectedUser?.perfil?.toLowerCase() || ""}>
                              <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600">
                                <SelectValue placeholder="Selecione o perfil" />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                                <SelectItem value="administrador">Administrador</SelectItem>
                                <SelectItem value="editor">Editor</SelectItem>
                                <SelectItem value="visualizador">Visualizador</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="user-status" className="text-gray-900 dark:text-white">
                              Status
                            </Label>
                            <Select defaultValue={selectedUser?.status?.toLowerCase() || "ativo"}>
                              <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                                <SelectItem value="ativo">Ativo</SelectItem>
                                <SelectItem value="inativo">Inativo</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        {!selectedUser && (
                          <div className="space-y-2">
                            <Label htmlFor="user-senha" className="text-gray-900 dark:text-white">
                              Senha
                            </Label>
                            <Input
                              id="user-senha"
                              type="password"
                              className="dark:bg-slate-700 dark:border-slate-600"
                            />
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsUserDialogOpen(false)
                            setSelectedUser(null)
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button
                          onClick={() => {
                            setIsUserDialogOpen(false)
                            setSelectedUser(null)
                          }}
                        >
                          {selectedUser ? "Salvar Alterações" : "Criar Usuário"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="dark:border-slate-700">
                      <TableHead className="text-gray-900 dark:text-white">Nome</TableHead>
                      <TableHead className="text-gray-900 dark:text-white">Email</TableHead>
                      <TableHead className="text-gray-900 dark:text-white">Perfil</TableHead>
                      <TableHead className="text-gray-900 dark:text-white">Status</TableHead>
                      <TableHead className="text-gray-900 dark:text-white">Último Acesso</TableHead>
                      <TableHead className="text-gray-900 dark:text-white">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usuarios.map((user) => (
                      <TableRow key={user.id} className="dark:border-slate-700">
                        <TableCell className="font-medium text-gray-900 dark:text-white">{user.nome}</TableCell>
                        <TableCell className="text-gray-600 dark:text-slate-400">{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="dark:border-slate-600 dark:text-slate-300">
                            {user.perfil}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              user.status === "Ativo"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-slate-400">
                          {new Date(user.ultimoAcesso).toLocaleDateString("pt-BR")}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="dark:bg-slate-700 dark:border-slate-600">
                              <DropdownMenuItem
                                onClick={() => handleEditUser(user)}
                                className="dark:text-slate-300 dark:hover:bg-slate-600"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteUser(user.id)}
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Setores */}
          <TabsContent value="setores" className="space-y-6">
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-gray-900 dark:text-white">Gerenciamento de Setores</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-slate-400">
                      Organize documentos por departamentos
                    </CardDescription>
                  </div>
                  <Dialog open={isSetorDialogOpen} onOpenChange={setIsSetorDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Novo Setor
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="dark:bg-slate-800 dark:border-slate-700">
                      <DialogHeader>
                        <DialogTitle className="text-gray-900 dark:text-white">
                          {selectedSetor ? "Editar Setor" : "Novo Setor"}
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 dark:text-slate-400">
                          {selectedSetor ? "Atualize as informações do setor" : "Adicione um novo setor ao sistema"}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="setor-nome" className="text-gray-900 dark:text-white">
                            Nome do Setor
                          </Label>
                          <Input
                            id="setor-nome"
                            defaultValue={selectedSetor?.nome || ""}
                            className="dark:bg-slate-700 dark:border-slate-600"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="setor-responsavel" className="text-gray-900 dark:text-white">
                            Responsável
                          </Label>
                          <Select defaultValue={selectedSetor?.responsavel || ""}>
                            <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600">
                              <SelectValue placeholder="Selecione o responsável" />
                            </SelectTrigger>
                            <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                              <SelectItem value="João Silva">João Silva</SelectItem>
                              <SelectItem value="Maria Santos">Maria Santos</SelectItem>
                              <SelectItem value="Carlos Lima">Carlos Lima</SelectItem>
                              <SelectItem value="Ana Costa">Ana Costa</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="setor-cor" className="text-gray-900 dark:text-white">
                            Cor do Setor
                          </Label>
                          <Input
                            id="setor-cor"
                            type="color"
                            defaultValue={selectedSetor?.cor || "#3b82f6"}
                            className="dark:bg-slate-700 dark:border-slate-600 h-10"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsSetorDialogOpen(false)
                            setSelectedSetor(null)
                          }}
                        >
                          Cancelar
                        </Button>
                        <Button
                          onClick={() => {
                            setIsSetorDialogOpen(false)
                            setSelectedSetor(null)
                          }}
                        >
                          {selectedSetor ? "Salvar Alterações" : "Criar Setor"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {setores.map((setor) => (
                    <Card key={setor.id} className="dark:bg-slate-700 dark:border-slate-600">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: setor.cor }} />
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="dark:bg-slate-700 dark:border-slate-600">
                              <DropdownMenuItem
                                onClick={() => handleEditSetor(setor)}
                                className="dark:text-slate-300 dark:hover:bg-slate-600"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteSetor(setor.id)}
                                className="text-red-600 dark:text-red-400 dark:hover:bg-slate-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{setor.nome}</h3>
                        <p className="text-sm text-gray-600 dark:text-slate-400 mb-2">{setor.responsavel}</p>
                        <p className="text-xs text-gray-500 dark:text-slate-500">{setor.documentos} documentos</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Notificações */}
          <TabsContent value="notificacoes" className="space-y-6">
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Configurações de Notificações</CardTitle>
                <CardDescription className="text-gray-600 dark:text-slate-400">
                  Configure quando e como receber notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-gray-900 dark:text-white">Notificações por Email</Label>
                      <p className="text-sm text-gray-600 dark:text-slate-400">
                        Receber notificações importantes por email
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-gray-900 dark:text-white">Documentos Vencendo</Label>
                      <p className="text-sm text-gray-600 dark:text-slate-400">
                        Alertas sobre documentos próximos ao vencimento
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-gray-900 dark:text-white">Novos Documentos</Label>
                      <p className="text-sm text-gray-600 dark:text-slate-400">
                        Notificar quando novos documentos forem arquivados
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-gray-900 dark:text-white">Relatórios Semanais</Label>
                      <p className="text-sm text-gray-600 dark:text-slate-400">Receber resumo semanal das atividades</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Configurações de Email</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtp-server" className="text-gray-900 dark:text-white">
                        Servidor SMTP
                      </Label>
                      <Input
                        id="smtp-server"
                        defaultValue="smtp.gmail.com"
                        className="dark:bg-slate-700 dark:border-slate-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-port" className="text-gray-900 dark:text-white">
                        Porta
                      </Label>
                      <Input id="smtp-port" defaultValue="587" className="dark:bg-slate-700 dark:border-slate-600" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtp-user" className="text-gray-900 dark:text-white">
                        Usuário
                      </Label>
                      <Input
                        id="smtp-user"
                        defaultValue="sistema@empresa.com"
                        className="dark:bg-slate-700 dark:border-slate-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtp-password" className="text-gray-900 dark:text-white">
                        Senha
                      </Label>
                      <Input
                        id="smtp-password"
                        type="password"
                        defaultValue="••••••••"
                        className="dark:bg-slate-700 dark:border-slate-600"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Salvar Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Segurança */}
          <TabsContent value="seguranca" className="space-y-6">
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Configurações de Segurança</CardTitle>
                <CardDescription className="text-gray-600 dark:text-slate-400">
                  Gerencie a segurança e privacidade do sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-gray-900 dark:text-white">Autenticação de Dois Fatores</Label>
                      <p className="text-sm text-gray-600 dark:text-slate-400">
                        Adicionar camada extra de segurança no login
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-gray-900 dark:text-white">Log de Auditoria</Label>
                      <p className="text-sm text-gray-600 dark:text-slate-400">Registrar todas as ações dos usuários</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-gray-900 dark:text-white">Sessão Automática</Label>
                      <p className="text-sm text-gray-600 dark:text-slate-400">
                        Encerrar sessão após período de inatividade
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Políticas de Senha</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="min-length" className="text-gray-900 dark:text-white">
                        Comprimento Mínimo
                      </Label>
                      <Select defaultValue="8">
                        <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                          <SelectItem value="6">6 caracteres</SelectItem>
                          <SelectItem value="8">8 caracteres</SelectItem>
                          <SelectItem value="10">10 caracteres</SelectItem>
                          <SelectItem value="12">12 caracteres</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout" className="text-gray-900 dark:text-white">
                        Timeout da Sessão
                      </Label>
                      <Select defaultValue="30">
                        <SelectTrigger className="dark:bg-slate-700 dark:border-slate-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
                          <SelectItem value="15">15 minutos</SelectItem>
                          <SelectItem value="30">30 minutos</SelectItem>
                          <SelectItem value="60">1 hora</SelectItem>
                          <SelectItem value="120">2 horas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-gray-900 dark:text-white">Exigir Caracteres Especiais</Label>
                        <p className="text-sm text-gray-600 dark:text-slate-400">
                          Senhas devem conter símbolos especiais
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-gray-900 dark:text-white">Exigir Números</Label>
                        <p className="text-sm text-gray-600 dark:text-slate-400">
                          Senhas devem conter pelo menos um número
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-gray-900 dark:text-white">Exigir Maiúsculas e Minúsculas</Label>
                        <p className="text-sm text-gray-600 dark:text-slate-400">
                          Senhas devem ter letras maiúsculas e minúsculas
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Backup e Recuperação</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="dark:bg-slate-700 dark:border-slate-600">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          <h4 className="font-medium text-gray-900 dark:text-white">Backup Automático</h4>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-slate-400 mb-3">Último backup: Hoje às 03:00</p>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          Fazer Backup Agora
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="dark:bg-slate-700 dark:border-slate-600">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Key className="h-5 w-5 text-green-600 dark:text-green-400" />
                          <h4 className="font-medium text-gray-900 dark:text-white">Chaves de API</h4>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-slate-400 mb-3">
                          Gerencie chaves de acesso à API
                        </p>
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          Gerenciar Chaves
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Salvar Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
