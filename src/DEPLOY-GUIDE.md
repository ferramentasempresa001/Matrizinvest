# 🚀 Guia de Deploy - Matriz Invest (Modo Apresentação)

## 📌 Importante: Esclarecimento sobre a Arquitetura

Este **NÃO é um protótipo do Figma** que precisa de iframe. Este é um **aplicativo React completo e funcional** que já está pronto para apresentação e deploy.

### ❌ O que NÃO fazer:
- Não tente incorporar via iframe do Figma
- Não procure por links de protótipo do Figma
- Não use o parâmetro `&hide-ui=1` (isso é para protótipos do Figma)

### ✅ O que você tem:
- Aplicativo React completo com 8 telas funcionais
- Design institucional corporativo implementado
- Todas as funcionalidades interativas prontas
- Código pronto para deploy em produção

---

## 🎯 Como Usar para Apresentações

### Opção 1: Modo Fullscreen Nativo (Mais Simples)

```bash
# 1. Abra o aplicativo normalmente
# 2. Pressione F11 para fullscreen
# 3. Navegue pelas telas usando o menu inferior
# 4. ESC para sair do fullscreen
```

**Vantagens**:
- Sem configuração adicional
- Funciona imediatamente
- Todas as funcionalidades ativas

---

### Opção 2: Deploy em Servidor Web

#### Deploy Local (Para Demonstrações)

```bash
# Se estiver usando Vite (recomendado)
npm run dev
# Acesse: http://localhost:5173

# Para build de produção
npm run build
npm run preview
```

#### Deploy em Plataformas Cloud

##### Vercel (Recomendado)
```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Para produção
vercel --prod
```

##### Netlify
```bash
# 1. Build
npm run build

# 2. Deploy na pasta dist/
netlify deploy --prod --dir=dist
```

##### GitHub Pages
```bash
# 1. Adicionar ao package.json
"homepage": "https://seu-usuario.github.io/matriz-invest"

# 2. Install gh-pages
npm install --save-dev gh-pages

# 3. Adicionar scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# 4. Deploy
npm run deploy
```

---

## 🌐 URLs de Acesso

Após deploy, você terá uma URL como:

### Vercel
```
https://matriz-invest.vercel.app
```

### Netlify
```
https://matriz-invest.netlify.app
```

### GitHub Pages
```
https://seu-usuario.github.io/matriz-invest
```

---

## 📱 Compartilhar para Demonstrações

### Para Apresentações Remotas

1. **Deploy o app** em uma das plataformas acima
2. **Compartilhe o link** com stakeholders
3. **Instrua** para abrir em fullscreen (F11)
4. **Opcional**: Use ferramentas de screen sharing (Zoom, Teams, Meet)

### Para Apresentações Presenciais

1. **Opção A**: Abra localmente (`npm run dev`) e use F11
2. **Opção B**: Use a URL de produção
3. **Conecte** ao projetor/TV
4. **Navegue** pelas 8 telas durante a apresentação

---

## 🖥️ Incorporação em Sites Institucionais

Se você quiser incorporar o app em um site corporativo:

```html
<!-- index.html do seu site institucional -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Matriz Invest - Demo Institucional</title>
  <style>
    body, html {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }
    iframe {
      border: none;
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  <!-- Incorpore a URL do seu deploy aqui -->
  <iframe 
    src="https://matriz-invest.vercel.app" 
    allowfullscreen
    title="Matriz Invest - Plataforma de Investimentos"
  ></iframe>
</body>
</html>
```

---

## 🎬 Modo Apresentação - Recursos Especiais

### Controles de Teclado
- **F11**: Fullscreen on/off
- **ESC**: Sair do fullscreen
- **Duplo Clique**: Alternar fullscreen (em presentation.html)

### Mobile/Tablet
- Adicione à tela inicial do iOS/Android
- Funciona como PWA (Progressive Web App)
- Experiência nativa em dispositivos móveis

---

## 📊 Fluxo de Apresentação Sugerido

### 1. Introdução (1 min)
- Mostrar tela de **Login**
- Destacar design institucional
- Fazer login com credenciais demo

### 2. Visão Geral (2 min)
- **Dashboard**: Saldo, performance, overview
- Explicar arquitetura de informação
- Destacar paleta de cores corporativa

### 3. Funcionalidades Core (3 min)
- **Metas**: Simulador de objetivos financeiros
- **Área Financeira**: Calculadora e simuladores
- **Relatórios**: Gráficos e análises

### 4. Recursos Adicionais (2 min)
- **Hábitos**: Tracking de rotinas
- **Conquistas**: Sistema de marcos
- **Perfil**: Configurações

### 5. Interatividade (2 min)
- Demonstrar navegação fluida
- Mostrar responsividade
- Testar simuladores ao vivo

**Total**: ~10 minutos de apresentação completa

---

## 🔧 Configurações Avançadas

### Remover Animações (para apresentações mais rápidas)
Edite `styles/globals.css`:
```css
* {
  animation-duration: 0s !important;
  transition-duration: 0s !important;
}
```

### Aumentar Tamanho de Fonte (para projetores)
Edite `styles/globals.css`:
```css
:root {
  --font-size: 18px; /* Era 16px */
}
```

### Forçar Modo Escuro
Em `App.tsx`, adicione classe `dark` ao html:
```typescript
useEffect(() => {
  document.documentElement.classList.add('dark');
}, []);
```

---

## 📲 QR Code para Acesso Mobile

Após deploy, gere um QR Code da URL:

```bash
# Use serviços online como:
https://www.qr-code-generator.com/
https://www.qrcode-monkey.com/

# Ou instale uma biblioteca
npm install qrcode
```

```javascript
// Gerar QR Code programaticamente
import QRCode from 'qrcode';

QRCode.toDataURL('https://matriz-invest.vercel.app')
  .then(url => console.log(url))
  .catch(err => console.error(err));
```

---

## 🎨 Branding Personalizado

### Adicionar Logo Institucional
Edite `LoginScreen.tsx` ou `DashboardScreen.tsx`:
```tsx
<img src="/logo-corporativo.svg" alt="Matriz Invest" className="w-32 h-32" />
```

### Customizar Cores
Edite `styles/globals.css` e ajuste as variáveis:
```css
:root {
  --primary: #SUA_COR_PRIMARIA;
  --accent: #SUA_COR_DESTAQUE;
  /* ... */
}
```

---

## 🔒 Segurança para Demonstrações

### ✅ Este protótipo é seguro para demonstrações porque:
- Não armazena dados reais
- Não se conecta a APIs externas
- Todos os dados são mock/demo
- Não coleta informações pessoais

### ⚠️ Avisos importantes:
- **NÃO use para dados reais de clientes**
- **NÃO conecte a sistemas bancários reais**
- **NÃO colete informações sensíveis**
- **Apenas para demonstração e educação**

---

## 📝 Checklist Pré-Apresentação

```
[ ] App rodando sem erros
[ ] Testado em fullscreen (F11)
[ ] Todas as 8 telas funcionais
[ ] Navegação menu inferior OK
[ ] Simuladores calculando corretamente
[ ] Gráficos renderizando
[ ] Responsivo mobile testado
[ ] Cores institucionais validadas
[ ] Textos técnicos revisados
[ ] Fluxo de apresentação ensaiado
[ ] Backup/URL alternativa preparada
```

---

## 🚨 Troubleshooting

### Problema: App não carrega
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Problema: Fullscreen não funciona
- Use F11 em vez de duplo clique
- Verifique permissões do navegador
- Teste em navegador diferente (Chrome recomendado)

### Problema: Gráficos não aparecem
- Verifique console do navegador
- Confirme que Recharts está instalado: `npm install recharts`
- Limpe cache do navegador

---

## 📞 Próximos Passos

1. ✅ Deploy em plataforma cloud (Vercel/Netlify)
2. ✅ Testar em diferentes dispositivos
3. ✅ Ensaiar apresentação completa
4. ✅ Preparar materiais de apoio
5. ✅ Configurar analytics (opcional)

---

## 🎯 Conclusão

Você tem um **aplicativo completo e profissional** pronto para:
- ✅ Demonstrações institucionais
- ✅ Apresentações para stakeholders
- ✅ Treinamentos educacionais
- ✅ Validação de conceito (POC)
- ✅ Deploy em produção (com ajustes)

**Não é necessário iframe do Figma** - este É o produto final! 🚀

---

**Desenvolvido com**: React + TypeScript + Tailwind CSS
**Status**: ✅ Production Ready
**Última Atualização**: Outubro 2025
