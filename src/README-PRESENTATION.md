# 🎯 Matriz Invest - Modo Apresentação Institucional

## 📋 Visão Geral

Este documento descreve como utilizar o **Matriz Invest** em modo de apresentação fullscreen para demonstrações institucionais, reuniões com stakeholders e fins educacionais.

---

## 🚀 Como Usar o Modo Apresentação

### Opção 1: Acesso Direto (Recomendado para este ambiente)
O aplicativo já está otimizado para apresentação profissional:
- **Acesse**: Simplesmente abra o aplicativo normalmente
- **Fullscreen**: Pressione `F11` ou clique duas vezes na tela para entrar em modo fullscreen
- **Navegação**: Use o menu inferior para alternar entre as 8 telas principais

### Opção 2: Página HTML Standalone
Foi criado o arquivo `presentation.html` que oferece:
- ✅ Tela de carregamento profissional
- ✅ Modo fullscreen automático (duplo clique)
- ✅ Otimização para dispositivos móveis
- ✅ Sem barras de navegação ou interfaces extras
- ✅ Badge de "Modo Apresentação" (removível)

---

## 🎨 Características do Design Institucional

### Paleta de Cores Corporativa
- **Azul Marinho**: `#0A1E3D` (Primary)
- **Verde Petróleo**: `#1E5F5B` / `#2D7A75` (Accent/Success)
- **Cinza Elegante**: `#64748B` / `#94A3B8` (Muted)
- **Dourado Sutil**: `#B8936E` / `#D4AF37` (Gold)
- **Background Dark**: `#0F1419`

### Tipografia Profissional
- Linguagem técnica e institucional em todas as telas
- Terminologia financeira padronizada
- Hierarquia visual clara e objetiva

---

## 📱 Estrutura das 8 Telas Principais

### 1. **Login**
- Interface corporativa com autenticação institucional
- Campos: Email/CPF e Senha
- Acesso rápido com credenciais demo

### 2. **Dashboard**
- Visão geral da carteira de investimentos
- Saldo total e performance
- Acesso rápido a funcionalidades principais
- Gráficos de alocação de ativos

### 3. **Metas Financeiras**
- Gestão de objetivos de investimento
- Monitoramento de progresso
- Simulador de metas com prazos

### 4. **Hábitos de Investimento**
- Acompanhamento de rotinas financeiras
- Check-ins diários/semanais
- Métricas de consistência

### 5. **Conquistas**
- Marcos e certificações alcançadas
- Progressão profissional
- Badges corporativas

### 6. **Área Financeira**
- Simulador de investimentos por categoria
- Análise de rentabilidade
- Calculadora de aportes
- Projeções financeiras

### 7. **Relatórios**
- Performance detalhada da carteira
- Gráficos de evolução temporal
- Análise comparativa de ativos
- Exportação de dados

### 8. **Perfil**
- Configurações da conta
- Dados pessoais
- Preferências de investimento
- Logout seguro

---

## ⚙️ Recursos Interativos

### Navegação
- **Menu fixo inferior**: Acesso direto às 8 telas
- **Transições suaves**: Entre telas e componentes
- **Responsivo**: Otimizado para mobile e desktop

### Funcionalidades Ativas
- ✅ Formulários funcionais em todas as telas
- ✅ Simuladores de investimento com cálculos reais
- ✅ Gráficos interativos (Recharts)
- ✅ Modais e diálogos funcionais
- ✅ Switches e toggles operacionais
- ✅ Filtros e ordenação de dados
- ✅ Notificações toast (Sonner)

---

## 🎯 Atalhos de Teclado (Modo Apresentação)

- **F11**: Ativar/Desativar fullscreen
- **ESC**: Sair do modo fullscreen
- **Duplo Clique**: Alternar fullscreen
- **Ctrl+P**: Imprimir (desabilitado em fullscreen)

---

## 📊 Dados Demo Pré-configurados

### Credenciais de Acesso
- **Email/CPF**: Qualquer valor válido
- **Senha**: Qualquer senha

### Saldo Inicial
- **R$ 125.847,32** (valor demonstrativo)

### Categorias de Investimento
1. Renda Fixa
2. Ações
3. Fundos Imobiliários
4. Criptomoedas
5. Tesouro Direto
6. Previdência Privada

### Metas Pré-configuradas
- Reserva de Emergência
- Aposentadoria
- Imóvel Próprio
- Educação Continuada

---

## 🔒 Segurança e Privacidade

⚠️ **IMPORTANTE**: Este é um **protótipo educacional e demonstrativo**
- Não coleta dados reais
- Não armazena informações sensíveis
- Não está conectado a instituições financeiras
- Apenas para fins de demonstração interna

---

## 📱 Otimização Mobile

### Progressive Web App (PWA)
O aplicativo está otimizado para:
- ✅ Instalação em dispositivos móveis
- ✅ Modo offline (com service worker)
- ✅ Notificações push (preparado)
- ✅ Gestos touch nativos

### Compatibilidade
- ✅ iOS Safari
- ✅ Chrome Android
- ✅ Navegadores desktop modernos
- ✅ Tablets e iPads

---

## 🎬 Dicas para Apresentações

### Antes de Começar
1. Teste o modo fullscreen antes da apresentação
2. Verifique a conexão (se necessário)
3. Prepare o fluxo de navegação entre telas
4. Destaque os principais recursos de cada tela

### Durante a Apresentação
- Inicie pelo **Login** para mostrar a experiência completa
- Navegue pelo **Dashboard** para visão geral
- Demonstre o **Simulador** na Área Financeira
- Mostre os **Relatórios** com gráficos interativos
- Finalize com o **Perfil** e configurações

### Pontos de Destaque
- Design institucional e profissional
- Paleta de cores corporativa sóbria
- Linguagem técnica financeira
- Interatividade completa em todas as telas
- Responsividade mobile/desktop
- Navegação intuitiva

---

## 🛠️ Customização Adicional

### Remover Badge de Apresentação
No arquivo `presentation.html`, remova ou comente:
```html
<!-- <div class="presentation-badge" id="presentation-badge">...</div> -->
```

### Ajustar Cores de Loading
Edite as variáveis CSS em `presentation.html`:
```css
.loading-logo {
  border: 3px solid #1A3A5C; /* Cor principal */
  border-top-color: #2D7A75; /* Cor de destaque */
}
```

### Desabilitar Duplo Clique para Fullscreen
Comente o event listener em `presentation.html`:
```javascript
// document.addEventListener('dblclick', () => { ... });
```

---

## 📞 Suporte

Este protótipo foi desenvolvido para demonstrações internas e fins educacionais da **Matriz Invest**.

**Tecnologias Utilizadas**:
- React 18
- TypeScript
- Tailwind CSS v4
- Shadcn/ui Components
- Recharts
- Lucide Icons
- Sonner (Toasts)

---

## ✅ Checklist de Deploy para Apresentação

- [ ] Testar todas as 8 telas
- [ ] Verificar modo fullscreen
- [ ] Confirmar responsividade mobile
- [ ] Validar todos os simuladores
- [ ] Testar gráficos e relatórios
- [ ] Verificar transições entre telas
- [ ] Confirmar paleta de cores institucional
- [ ] Revisar todos os textos (linguagem técnica)
- [ ] Preparar fluxo de demonstração
- [ ] Fazer backup dos dados demo

---

**Status**: ✅ Pronto para Deploy e Demonstrações Institucionais

**Última Atualização**: Outubro 2025
