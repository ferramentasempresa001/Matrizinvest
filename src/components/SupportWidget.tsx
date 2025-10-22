import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MessageCircle, Users, Phone, Mail, FileText, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface SupportChannel {
  id: number;
  icon: any;
  title: string;
  description: string;
  availability: string;
  action: string;
}

const supportChannels: SupportChannel[] = [
  {
    id: 1,
    icon: MessageCircle,
    title: 'Chat ao Vivo',
    description: 'Suporte instantâneo com nossa equipe',
    availability: 'Online agora',
    action: 'Iniciar Chat'
  },
  {
    id: 3,
    icon: Mail,
    title: 'Email',
    description: 'suporte@prismafinance.com.br',
    availability: 'Resposta em até 24h',
    action: 'Enviar Email'
  }
];

const communityStats = {
  members: '12.5k',
  discussions: '3.2k',
  experts: '45'
};

export function SupportWidget() {
  const handleSupportAction = (channelId: number) => {
    if (channelId === 1) {
      // Chat ao Vivo
      toast.success('💬 Conectando com o suporte ao vivo...');
    } else if (channelId === 3) {
      // Email
      toast.success('📧 Abrindo cliente de e-mail...');
    }
  };

  return (
    <div className="space-y-4">
      {/* Support Channels */}
      <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-5">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-5 h-5 text-[#2D7A75]" />
          <h3 className="text-[#E8EBF0]">Central de Suporte</h3>
        </div>

        <div className="space-y-3">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;
            
            return (
              <motion.div
                key={channel.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#252B3A] rounded-lg p-4"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#1A1F2E] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#2D7A75]" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[#E8EBF0] text-sm">{channel.title}</p>
                      {channel.id === 1 && (
                        <Badge className="bg-[#2D7A75]/20 text-[#2D7A75] border-[#2D7A75]/30 text-xs">
                          {channel.availability}
                        </Badge>
                      )}
                    </div>
                    <p className="text-[#94A3B8] text-xs mb-1">{channel.description}</p>
                    {channel.id !== 1 && (
                      <p className="text-[#64748B] text-xs">{channel.availability}</p>
                    )}
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleSupportAction(channel.id)}
                  className="w-full bg-[#1A3A5C] hover:bg-[#2D7A75] text-[#E8EBF0] h-8 text-xs gap-2"
                >
                  {channel.action}
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Community */}
      <Card className="bg-[#1A1F2E] border-[#2A3F5F] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-[#2D7A75]" />
          <h3 className="text-[#E8EBF0]">Comunidade Prisma</h3>
          <Badge className="bg-[#2D7A75]/20 text-[#2D7A75] border-[#2D7A75]/30 text-xs ml-auto">
            Ativa
          </Badge>
        </div>

        <div className="bg-[#252B3A] rounded-lg p-4 mb-4">
          <p className="text-[#94A3B8] text-sm mb-3">
            Conecte-se com outros investidores, compartilhe experiências e aprenda com especialistas.
          </p>
          
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center">
              <p className="text-[#E8EBF0] text-lg">{communityStats.members}</p>
              <p className="text-[#64748B] text-xs">Membros</p>
            </div>
            <div className="text-center">
              <p className="text-[#E8EBF0] text-lg">{communityStats.discussions}</p>
              <p className="text-[#64748B] text-xs">Discussões</p>
            </div>
            <div className="text-center">
              <p className="text-[#E8EBF0] text-lg">{communityStats.experts}</p>
              <p className="text-[#64748B] text-xs">Especialistas</p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => toast.success('🌐 Carregando comunidade...')}
          className="w-full bg-[#1A3A5C] hover:bg-[#2D7A75] text-[#E8EBF0] gap-2 h-10"
        >
          <Users className="w-4 h-4" />
          Acessar Comunidade
        </Button>
      </Card>

      {/* Security Note */}
      <div className="p-4 bg-[#1A1F2E]/50 border border-[#2A3F5F] rounded-lg">
        <p className="text-[#94A3B8] text-xs leading-relaxed">
          <strong className="text-[#E8EBF0]">Dica de Segurança:</strong> Nossa equipe nunca solicitará senhas ou códigos de segurança. Em caso de dúvida, entre em contato pelos canais oficiais.
        </p>
      </div>
    </div>
  );
}