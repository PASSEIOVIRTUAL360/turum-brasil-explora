
import React, { useState } from 'react';
import { Plus, Mail, Trash2, Search, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dados fictícios de administradores
  const admins = [
    { 
      id: '1', 
      name: 'Administrador Principal', 
      email: 'admin@turum.com.br',
      role: 'super_admin',
      lastLogin: '2023-11-12 14:30',
      createdAt: '2023-01-15'
    },
    { 
      id: '2', 
      name: 'João Silva', 
      email: 'joao@turum.com.br',
      role: 'admin',
      lastLogin: '2023-11-10 09:15',
      createdAt: '2023-05-22'
    },
    { 
      id: '3', 
      name: 'Maria Souza', 
      email: 'maria@turum.com.br',
      role: 'editor',
      lastLogin: '2023-11-09 16:45',
      createdAt: '2023-08-10'
    },
  ];
  
  const filteredAdmins = admins.filter(admin => 
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'super_admin':
        return <Badge className="bg-purple-100 text-purple-800">Super Admin</Badge>;
      case 'admin':
        return <Badge className="bg-blue-100 text-blue-800">Administrador</Badge>;
      case 'editor':
        return <Badge className="bg-green-100 text-green-800">Editor</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{role}</Badge>;
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <h2 className="text-xl font-semibold mb-4 md:mb-0">Gerenciar Administradores</h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar administradores..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="bg-[#00B4D8] hover:bg-[#0095b3]">
            <UserPlus size={16} className="mr-1" /> Adicionar Admin
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Função</TableHead>
              <TableHead>Último Login</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAdmins.length > 0 ? (
              filteredAdmins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{getRoleBadge(admin.role)}</TableCell>
                  <TableCell>{admin.lastLogin}</TableCell>
                  <TableCell>{admin.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                      <Mail size={16} />
                    </Button>
                    {admin.role !== 'super_admin' && (
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-gray-500">
                  Nenhum administrador encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminUsers;
