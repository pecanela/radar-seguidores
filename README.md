<p align="center">
  <img src="docs/images/banner.png" alt="Radar Seguidores: extensão gratuita para analisar seguidores do Instagram" width="100%">
</p>

<p align="center">
  <a href="#português">🇧🇷 Português</a> · <a href="README.en.md">🇺🇸 English</a> ·
  <a href="https://github.com/pecanela/radar-seguidores/actions">Builds</a> ·
  <a href="LICENSE">Licença MIT</a>
</p>

<p align="center">
  <strong>Gratuito · Código aberto · Sem anúncios · Histórico local · Firefox + Chromium</strong>
</p>

> **Versão:** `v1.1.0-rc` (candidata a lançamento). Uma versão anterior foi validada no Firefox para desktop. Esta atualização ainda precisa ser validada em contas reais e nos demais navegadores. **Não há extensão assinada, publicação nas lojas ou APK oficial validado.**

<a id="português"></a>

## O que é?

**Radar Seguidores** é uma extensão de navegador, não afiliada ao Instagram ou à Meta, que compara as contas que você segue com as contas que seguem você. Usa sua sessão já aberta em `instagram.com`, sem pedir senha em um site externo. A interface está em **português**; a documentação também está disponível em [English](README.en.md).

### Funcionalidades

| Recurso | Como funciona |
|---|---|
| **Não me seguem** | Quem você segue, mas não segue você de volta. |
| **Pararam de seguir** | Quem seguia você em uma análise anterior, não segue mais e você ainda segue. |
| **Me seguem, não sigo** | Quem segue você e você não segue. |
| **Deixar de seguir** | Ação individual após confirmação; nunca em massa. |
| **Histórico local** | Compara análises por ID e permite excluir os dados guardados no navegador. |
| **Busca** | Encontre contas por nome ou @usuário. |

> **Importante:** a primeira análise **não revela unfollows anteriores**. A aba “Pararam de seguir” precisa de pelo menos duas análises completas feitas em momentos diferentes.

## Screenshots / Capturas de tela

<p align="center">
  <img src="docs/images/nao-me-seguem.png" alt="Tela do Radar Seguidores: não me seguem de volta" width="86%">
  <br><sub>Não me seguem — pessoas que você segue sem reciprocidade.</sub>
</p>

<p align="center">
  <img src="docs/images/pararam-de-seguir.png" alt="Tela do Radar Seguidores: quem deixou de seguir" width="48%">
  <img src="docs/images/me-seguem-nao-sigo.png" alt="Tela do Radar Seguidores: me seguem, mas não sigo" width="48%">
  <br><sub>Pararam de seguir · Me seguem, não sigo</sub>
</p>

*Capturas feitas com a **interface real da versão 1.1** em ambiente de teste e **contas fictícias**. Nenhum dado de usuário real foi incluído nas imagens. O banner é uma peça gráfica ilustrativa.*

## Instalação para teste

Atualmente, os pacotes são gerados pelo [GitHub Actions](https://github.com/pecanela/radar-seguidores/actions), e não estão publicados nas lojas. Para baixar, abra uma execução concluída com sucesso e, em **Artifacts**, baixe o ZIP correspondente; pode ser necessário entrar na sua conta GitHub. Extraia o ZIP antes da instalação.

### 🦊 Firefox no computador

1. Baixe `radar-seguidores-firefox-unsigned` em [Actions](https://github.com/pecanela/radar-seguidores/actions), na execução mais recente aprovada, e extraia o ZIP.
2. No Firefox, digite `about:debugging#/runtime/this-firefox` na barra de endereços.
3. Clique em **Carregar extensão temporária** e selecione o arquivo **`manifest.json`** da pasta extraída.
4. Acesse [instagram.com](https://www.instagram.com/), faça login e recarregue a página.
5. Clique em **◎ Radar Seguidores** no canto inferior direito → **Analisar agora**.

⚠️ Essa instalação é **temporária**: você precisa carregá-la novamente ao reiniciar o Firefox. A instalação permanente exige extensão assinada pela Mozilla.

### 🌐 Chrome, Edge e Brave no computador

1. Baixe `radar-seguidores-chromium` em [Actions](https://github.com/pecanela/radar-seguidores/actions), na execução mais recente aprovada, e extraia o ZIP.
2. Abra `chrome://extensions`, `edge://extensions` ou `brave://extensions` conforme seu navegador.
3. Ative **Modo do desenvolvedor** → **Carregar sem compactação** e selecione a pasta extraída que contém **`manifest.json`**.
4. Abra [instagram.com](https://www.instagram.com/), recarregue e clique em **◎ Radar Seguidores**.

### 📱 E no Android?

A extensão para Firefox Android **ainda não foi validada**. Não há APK pronto e testado para baixar. O Chrome Android não instala extensões Chromium comuns. Verifique a [compatibilidade](#compatibilidade) antes de tentar instalar no celular.

## Compatibilidade

| Navegador | Desktop | Android |
|---|---|---|
| Firefox | Versão anterior validada; v1.1 requer novos testes | Não testado; requer assinatura/compatibilidade |
| Chrome | Pacote gerado; teste real pendente | Sem suporte a extensões comuns |
| Edge | Pacote gerado; teste real pendente | Não testado |
| Brave | Pacote gerado; teste real pendente | Sem instalação convencional da extensão |

## Segurança e privacidade

- As análises e o histórico ficam no **armazenamento local da extensão**; o projeto não tem servidor de coleta de dados nem anúncios.
- O código usa a **sessão autenticada já aberta** no Instagram. Não informe sua senha, cookies ou tokens em issues.
- As requisições são feitas diretamente a **interfaces internas não oficiais do Instagram**. Elas podem mudar, falhar, impor limites ou resultar em restrições na conta.
- Não há unfollow em massa; toda ação individual requer confirmação. Verifique os perfis antes de modificar sua conta.
- Uma leitura interrompida não deve ser tratada como análise completa; são aplicadas verificações para reduzir falsos positivos.
- O código está aberto para auditoria, mas isso **não equivale a certificação de segurança** nem a aprovação pela Meta.

Documentos: [Privacidade](docs/PRIVACIDADE.md) · [Segurança](docs/SEGURANCA.md) · [Publicação](docs/PUBLICACAO.md).

## Desenvolvimento

Requer **Node.js 18+**. Não há dependências npm de runtime:

```bash
npm test
npm run build
```

O build gera `dist/firefox/` e `dist/chromium/` (ignorados no Git); o GitHub Actions executa ambos e disponibiliza artefatos não assinados. Consulte a aba [Actions](https://github.com/pecanela/radar-seguidores/actions).

## Contribuindo

Sugestões, correções de bugs, traduções da interface e testes em outros navegadores são bem-vindos. Abra uma [issue](https://github.com/pecanela/radar-seguidores/issues) sem dados de contas reais e leia [CONTRIBUTING.md](CONTRIBUTING.md).

## Licença

Distribuído sob a [licença MIT](LICENSE).

**Aviso:** este projeto é independente e não é afiliado, patrocinado ou aprovado pela Meta ou Instagram. Use por sua conta e risco, respeitando as políticas aplicáveis à sua conta.
