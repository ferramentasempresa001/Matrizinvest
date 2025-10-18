import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { User, Settings, Bell, Shield, CreditCard, FileText, LogOut, ChevronRight, TrendingUp, Star, Award } from 'lucide-react';
import { motion } from 'motion/react';

const menuItems = [
  { id: 1, icon: Settings, label: 'Configurações da Conta', description: 'Dados pessoais e preferências' },
  { id: 2, icon: Bell, label: 'Notificações', description: 'Alertas e comunicações' },
  { id: 3, icon: Shield, label: 'Segurança e Privacidade', description: 'Autenticação e proteção' },
  { id: 4, icon: CreditCard, label: 'Métodos de Pagamento', description: 'Cartões e contas bancárias' },
  { id: 5, icon: FileText, label: 'Documentos e Comprovantes', description: 'Histórico e extratos' },
];

export function ProfileScreen() {
  return (
    <div className="min-h-screen pb-24 overflow-auto bg-[#0F1419]">
      {/* Header */}
      <div className="bg-[#1A1F2E] p-6 border-b border-[#2A3F5F]">
        <div>
          <h2 className="text-[#E8EBF0] mb-1">Perfil do Usuário</h2>
          <p className="text-[#94A3B8] text-sm">Gerencie sua conta e preferências</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Informações do Usuário */}
        <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 bg-[#2D7A75]/20 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-[#2D7A75]" />
            </div>
            <div className="flex-1">
              <h3 className="text-[#E8EBF0] mb-1">Carlos Silva</h3>
              <p className="text-[#64748B] text-sm">carlos.silva@prismafinance.com</p>
            </div>
            <Button size="sm" variant="outline" className="bg-[#252B3A] hover:bg-[#2A3F5F] text-[#E8EBF0] border-[#2A3F5F]">
              Editar
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-[#252B3A] rounded-lg">
              <TrendingUp className="w-4 h-4 text-[#2D7A75] mx-auto mb-1" />
              <div className="text-lg text-[#E8EBF0]">156</div>
              <div className="text-xs text-[#64748B]">Dias Ativos</div>
            </div>
            <div className="text-center p-3 bg-[#252B3A] rounded-lg">
              <Star className="w-4 h-4 text-[#D4AF37] mx-auto mb-1" />
              <div className="text-lg text-[#E8EBF0]">24</div>
              <div className="text-xs text-[#64748B]">Metas</div>
            </div>
            <div className="text-center p-3 bg-[#252B3A] rounded-lg">
              <Award className="w-4 h-4 text-[#2D7A75] mx-auto mb-1" />
              <div className="text-lg text-[#2D7A75]">92%</div>
              <div className="text-xs text-[#64748B]">Sucesso</div>
            </div>
          </div>
        </Card>

        {/* Status do Plano */}
        <Card className="bg-[#1A1F2E] border-[#D4AF37]/30 p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30">
                  PREMIUM
                </Badge>
              </div>
              <h3 className="text-[#E8EBF0] mb-1">Plano Premium Ativo</h3>
              <p className="text-[#64748B] text-sm mb-3">
                Acesso completo a todas as funcionalidades avançadas
              </p>
              <Button size="sm" className="bg-[#2D7A75] hover:bg-[#45A598] text-[#E8EBF0]">
                Gerenciar Assinatura
              </Button>
            </div>
          </div>
        </Card>

        {/* Menu de Configurações */}
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-4 cursor-pointer hover:bg-[#252B3A] transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#2A3F5F] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#2D7A75]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[#E8EBF0] text-sm mb-0.5">{item.label}</h4>
                      <p className="text-[#64748B] text-xs">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#64748B] flex-shrink-0" />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Informações do Sistema */}
        <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-4">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Versão do Aplicativo</span>
              <span className="text-[#E8EBF0]">2.5.1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Ambiente</span>
              <span className="text-[#E8EBF0]">Produção</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Última Sincronização</span>
              <span className="text-[#E8EBF0]">Agora</span>
            </div>
          </div>
        </Card>

        {/* Botão de Sair */}
        <Button
          variant="outline"
          className="w-full bg-[#252B3A] hover:bg-[#2A3F5F] text-[#EF4444] border-[#2A3F5F] h-12"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair da Conta
        </Button>

        {/* Informações Legais */}
        <div className="text-center space-y-2 text-xs text-[#64748B]">
          <p>Prisma Finance © 2025. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-4">
            <span className="hover:text-[#2D7A75] cursor-pointer">Termos de Uso</span>
            <span className="hover:text-[#2D7A75] cursor-pointer">Privacidade</span>
            <span className="hover:text-[#2D7A75] cursor-pointer">Suporte</span>
          </div>
        </div>
      </div>
    </div>
  );
}
