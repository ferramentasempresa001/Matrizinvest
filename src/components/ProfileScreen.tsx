import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { User, Settings, Bell, Shield, CreditCard, FileText, LogOut, ChevronRight, TrendingUp, Star, Award, Save, X, Check, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { SupportWidget } from './SupportWidget';

const menuItems = [
  { id: 1, icon: Settings, label: 'Configurações da Conta', description: 'Dados pessoais e preferências' },
  { id: 2, icon: Bell, label: 'Notificações', description: 'Alertas e comunicações' },
  { id: 3, icon: Shield, label: 'Segurança e Privacidade', description: 'Autenticação e proteção' },
  { id: 4, icon: CreditCard, label: 'Métodos de Pagamento', description: 'Cartões e contas bancárias' },
  { id: 5, icon: FileText, label: 'Documentos e Comprovantes', description: 'Histórico e extratos' },
];

const plans = [
  {
    id: 1,
    name: 'PRISMA PRÓ',
    price: 547.00,
    installments: '12x de R$47,41',
    description: 'O Essencial para o Despertar.',
    subtitle: 'Perfeito para quem quer começar a jornada com autonomia e aplicar o método no seu próprio ritmo.',
    link: 'https://pay.kirvano.com/4279d2e6-05e9-45d7-94a0-9a900b9d975f?src=automatico',
    highlighted: false,
    features: [
      'Acesso vitalício',
      'Materiais exclusivos',
      'Acesso ao conteúdo que vai destravar sua mente',
      'Nosso Aplicativo',
    ],
  },
  {
    id: 2,
    name: 'PRISMA PREMIUM',
    price: 1647.00,
    installments: '12x de R$137,25',
    description: 'Transformação Completa e Imersiva.',
    subtitle: 'Para quem quer ir além do equilíbrio, e construir uma nova identidade financeira e emocional.',
    link: 'https://pay.kirvano.com/dd64d8f6-c78e-46d1-9415-6618ff7b6e2c?src=automatico',
    highlighted: true,
    features: [
      'Acesso vitalício',
      'Materiais exclusivos',
      'Acesso ao conteúdo que vai destravar sua mente',
      'Nosso Aplicativo',
      'Suporte VIP e prioridade no atendimento',
      'Acesso antecipado a novas funcionalidades',
      'Mentorias em grupo com especialistas',
    ],
  },
  {
    id: 3,
    name: 'PRISMA MASTER',
    price: 1097.00,
    installments: '12x de R$91,41',
    description: 'Aceleração Guiada e Suporte Prioritário.',
    subtitle: 'Indicado para quem quer avançar mais rápido, com acompanhamento e orientação direta.',
    link: 'https://pay.kirvano.com/c928e2de-4e76-47be-9ca1-939668b1eafd?src=automatico',
    highlighted: false,
    features: [
      'Acesso vitalício',
      'Materiais exclusivos',
      'Acesso ao conteúdo que vai destravar sua mente',
      'Nosso Aplicativo',
      'Suporte VIP e prioridade no atendimento',
    ],
  },
];

interface ProfileScreenProps {
  userName: string;
  setUserName: (name: string) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
}

export function ProfileScreen({ 
  userName, 
  setUserName, 
  userEmail, 
  setUserEmail
}: ProfileScreenProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPlansModalOpen, setIsPlansModalOpen] = useState(false);
  
  // Temporary edit values
  const [editName, setEditName] = useState(userName);
  const [editEmail, setEditEmail] = useState(userEmail);

  const handleEdit = () => {
    setEditName(userName);
    setEditEmail(userEmail);
    setIsEditMode(true);
  };

  const handleSave = () => {
    setUserName(editName);
    setUserEmail(editEmail);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setEditName(userName);
    setEditEmail(userEmail);
    setIsEditMode(false);
  };
  
  return (
    <div className="min-h-screen pb-24 overflow-auto bg-[#0F1419]">
      {/* Header */}
      <div className="bg-[#1A1F2E] p-6 border-b border-[#2A3F5F]">
        <div>
          <h2 className="text-[#E8EBF0] mb-1">Perfil do Usuário</h2>
          <p className="text-[#94A3B8] text-sm">Gerencie sua conta e preferências</p>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Edit Mode Controls */}
        {isEditMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#2D7A75]/10 border border-[#2D7A75]/30 rounded-lg p-4"
          >
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-[#E8EBF0]">Modo de Edição Ativo</p>
                <p className="text-[#94A3B8] text-xs mt-1">Edite suas informações pessoais abaixo</p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="bg-[#1A1F2E] hover:bg-[#252B3A] text-[#E8EBF0] border-[#2A3F5F] gap-2 h-9 sm:h-10"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </Button>
                <Button
                  onClick={handleSave}
                  className="bg-[#2D7A75] hover:bg-[#2D7A75]/80 text-[#E8EBF0] gap-2 h-9 sm:h-10"
                >
                  <Save className="w-4 h-4" />
                  Salvar
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Informações do Usuário */}
        <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-4 sm:p-6">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#2D7A75]/20 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-7 h-7 sm:w-8 sm:h-8 text-[#2D7A75]" />
            </div>
            <div className="flex-1 min-w-0">
              {isEditMode ? (
                <div className="space-y-2">
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Nome completo"
                    className="bg-[#252B3A] border-[#2A3F5F] text-[#E8EBF0] h-9"
                  />
                </div>
              ) : (
                <>
                  <h3 className="text-[#E8EBF0] mb-1 truncate">{userName}</h3>
                  <p className="text-[#64748B] text-sm truncate">{userEmail}</p>
                </>
              )}
            </div>
            {!isEditMode && (
              <Button 
                onClick={handleEdit}
                size="sm" 
                variant="outline" 
                className="bg-[#252B3A] hover:bg-[#2A3F5F] text-[#E8EBF0] border-[#2A3F5F] h-8 sm:h-9 md:h-10 px-2.5 sm:px-3 md:px-4 text-xs sm:text-sm flex-shrink-0"
              >
                Editar
              </Button>
            )}
          </div>

          {/* Campos de edição adicionais */}
          {isEditMode && (
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-[#94A3B8] text-xs mb-1.5 block">Email</label>
                <Input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder="email@exemplo.com"
                  className="bg-[#252B3A] border-[#2A3F5F] text-[#E8EBF0]"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="text-center p-2 sm:p-3 bg-[#252B3A] rounded-lg">
              <TrendingUp className="w-4 h-4 text-[#2D7A75] mx-auto mb-1" />
              <div className="text-base sm:text-lg text-[#E8EBF0]">156</div>
              <div className="text-xs text-[#64748B]">Dias Ativos</div>
            </div>
            <div className="text-center p-2 sm:p-3 bg-[#252B3A] rounded-lg">
              <Star className="w-4 h-4 text-[#D4AF37] mx-auto mb-1" />
              <div className="text-base sm:text-lg text-[#E8EBF0]">24</div>
              <div className="text-xs text-[#64748B]">Metas</div>
            </div>
            <div className="text-center p-2 sm:p-3 bg-[#252B3A] rounded-lg">
              <Award className="w-4 h-4 text-[#2D7A75] mx-auto mb-1" />
              <div className="text-base sm:text-lg text-[#2D7A75]">92%</div>
              <div className="text-xs text-[#64748B]">Sucesso</div>
            </div>
          </div>
        </Card>

        {/* Status do Plano */}
        <Card className="bg-[#1A1F2E] border-[#D4AF37]/30 p-4 sm:p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30 text-xs">
                  PREMIUM
                </Badge>
              </div>
              <h3 className="text-[#E8EBF0] mb-1">Plano Premium Ativo</h3>
              <p className="text-[#64748B] text-sm mb-3">
                Acesso completo a todas as funcionalidades avançadas
              </p>
              <Button 
                onClick={() => setIsPlansModalOpen(true)}
                size="sm" 
                className="bg-[#2D7A75] hover:bg-[#45A598] text-[#E8EBF0] h-9 sm:h-10 md:h-11 px-3 sm:px-4 md:px-5 text-xs sm:text-sm w-full sm:w-auto"
              >
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
                <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-3 sm:p-4 cursor-pointer hover:bg-[#252B3A] transition-colors active:scale-[0.98]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#2A3F5F] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#2D7A75]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[#E8EBF0] text-sm mb-0.5">{item.label}</h4>
                      <p className="text-[#64748B] text-xs truncate">{item.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#64748B] flex-shrink-0" />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Central de Suporte e Comunidade */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SupportWidget />
        </motion.div>

        {/* Botão de Sair */}
        <Button
          variant="outline"
          className="w-full bg-[#252B3A] hover:bg-[#2A3F5F] text-[#EF4444] border-[#2A3F5F] h-11 sm:h-12 md:h-13 px-4 sm:px-5 active:scale-[0.98] transition-transform"
        >
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          <span className="text-sm sm:text-base">Sair da Conta</span>
        </Button>

        {/* Informações Legais */}
        <div className="text-center space-y-2 text-xs text-[#64748B] pb-2">
          <p>Prisma Finance © 2025. Todos os direitos reservados.</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <span className="hover:text-[#2D7A75] cursor-pointer transition-colors">Termos de Uso</span>
            <span className="hover:text-[#2D7A75] cursor-pointer transition-colors">Privacidade</span>
            <span className="hover:text-[#2D7A75] cursor-pointer transition-colors">Suporte</span>
          </div>
        </div>
      </div>

      {/* Modal de Planos */}
      <Dialog open={isPlansModalOpen} onOpenChange={setIsPlansModalOpen}>
        <DialogContent className="bg-[#1A1F2E] border-[#2A3F5F] text-[#E8EBF0] max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#E8EBF0]">Planos e Assinaturas</DialogTitle>
            <DialogDescription className="text-[#94A3B8]">
              Escolha o melhor plano para você
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-4 mt-4 max-w-2xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`relative overflow-hidden ${
                    plan.highlighted 
                      ? 'bg-gradient-to-br from-[#2D7A75]/20 to-[#1A1F2E] border-[#2D7A75]' 
                      : 'bg-[#1A1F2E] border-[#2A3F5F]'
                  } p-5 sm:p-6 h-full flex flex-col`}
                >
                  {plan.highlighted && (
                    <div className="absolute top-0 right-0 bg-[#2D7A75] text-[#E8EBF0] text-xs px-3 py-1 rounded-bl-lg">
                      Popular
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h4 className="text-[#E8EBF0] mb-4 mt-2">{plan.name}</h4>
                    
                    <div className="mb-4">
                      <p className="text-[#94A3B8] text-sm mb-3">Por apenas</p>
                      <div className="mb-3">
                        <span className="text-3xl sm:text-4xl text-[#E8EBF0]">
                          R$ {plan.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#94A3B8]">
                          <Check className="w-3.5 h-3.5 text-[#2D7A75] mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={() => window.open(plan.link, '_blank')}
                      className={`w-full gap-2 ${
                        plan.highlighted
                          ? 'bg-[#2D7A75] hover:bg-[#45A598] text-[#E8EBF0]'
                          : 'bg-[#252B3A] hover:bg-[#2A3F5F] text-[#E8EBF0]'
                      }`}
                    >
                      QUERO FAZER PARTE
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    
                    <div className="text-center">
                      <p className="text-xs text-[#94A3B8] mb-2">
                        O valor acima pode ser dividido em até {plan.installments}
                      </p>
                      <p className="text-[#E8EBF0] text-xs mb-1">{plan.description}</p>
                      <p className="text-[#64748B] text-xs">{plan.subtitle}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
