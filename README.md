# Radar Seguidores 🔎

**Extensão gratuita e sem anúncios para comparar seguidores e seguidos no Instagram.** Projeto comunitário não afiliado à Meta ou Instagram.

> **Estado:** versão `1.1.0-rc` preparada para comunidade. A versão anterior funcionou no Firefox desktop do primeiro usuário, mas o pacote atualizado e os demais navegadores ainda precisam de testes com contas reais. Não há versão nas lojas publicada e não há APK oficial validado.

## Recursos

- **Não me seguem:** você segue, mas eles não seguem você.
- **Pararam de seguir:** pessoas que constavam na sua lista antiga de seguidores e não constam na atual **e que você ainda segue**. Exige pelo menos duas análises; não recupera o passado anterior à primeira análise.
- **Me seguem, não sigo:** pessoas que seguem você sem reciprocidade.
- Busca por nome/username, botão de abrir perfil, **unfollow individual após confirmação** e exclusão do histórico local.
- Comparações por ID de conta (não por username), isolamento das análises por usuário do Instagram, limite de 30 min entre análises.

## Compatibilidade

| Navegador | Desktop | Android |
|---|---|---|
| Firefox | Protótipo 1.0.1 testado por usuário; **1.1.0-rc requer reteste** | Possível via extensão **assinada** pela Mozilla; **não testado** |
| Chrome | Suporte planejado/empacotado; ainda sem teste real | Chrome Android não instala extensões Chrome comuns |
| Edge | Suporte planejado/empacotado; ainda sem teste real | Não testado |
| Brave | Suporte planejado/empacotado; ainda sem teste real | Brave Android não oferece instalação normal de extensões Chrome |

## Instalar para teste (Firefox desktop)

1. Baixe o pacote de teste Firefox deste projeto (GitHub Release ou GitHub Actions) ou execute `npm run build` no código-fonte.
2. Extraia o pacote se necessário.
3. Firefox → `about:debugging#/runtime/this-firefox` → **Carregar extensão temporária** → escolha `manifest.json` dentro de `dist/firefox`.
4. Entre em `https://www.instagram.com/`, recarregue a página e clique em **◎ Radar Seguidores** no canto inferior direito.
5. Clique em **Analisar agora** e espere concluir as **duas** listas. Não feche o navegador nem atualize a página enquanto analisa.

> Instalações temporárias desaparecem quando o Firefox é reiniciado. Para instalação permanente é necessária assinatura Mozilla. [Instruções oficiais](https://support.mozilla.org/en-US/kb/add-on-signing-in-firefox).

## Instalar para teste (Chrome / Edge / Brave desktop)

1. Baixe e extraia o pacote `chromium.zip` ou execute `npm run build` neste repositório.
2. Abra `chrome://extensions`, `edge://extensions` ou `brave://extensions`.
3. Habilite **Modo do desenvolvedor** → **Carregar sem compactação** → selecione a pasta `dist/chromium`.
4. Entre em `https://www.instagram.com/` e atualize a página. Abra **◎ Radar Seguidores**.

## Desenvolvimento

Requer Node.js >=18 apenas para testes e build. Nenhuma dependência npm de runtime.

```bash
npm test
npm run build
```

Os comandos geram `dist/firefox` e `dist/chromium` com seus respectivos `manifest.json`, mesmo código JS e ícones. A workflow no GitHub publica ambos como artefatos a cada push, **não os instala e não assina pela Mozilla**.

## Privacidade e segurança

- Processa dados da sua conta logada em Instagram usando a sessão já aberta no navegador; não solicita senha separadamente.
- Salva listas e histórico somente no armazenamento local da extensão; não há envio a servidor do projeto ou anúncios.
- Usa endpoints internos **não oficiais** do Instagram, que podem mudar, limitar requisições ou resultar em restrições de conta. Não garantimos operação contínua nem compatibilidade com termos da plataforma.
- Uma análise incompleta **não é salva** como completa. O aplicativo também rejeita quedas anormais (>25%) na contagem de seguidores para evitar falsos positivos. Confirme a lista antes de deixar de seguir alguém.
- Não executa unfollow em massa e sempre pede confirmação para cada conta.
- Consulte [Política de privacidade](docs/PRIVACIDADE.md), [Segurança](docs/SEGURANCA.md) e [Checklist de publicação](docs/PUBLICACAO.md).

## Questões de licença e originalidade

A implementação neste repositório foi escrita de forma independente. O projeto [Unfollowers for Instagram (adrigo)](https://github.com/adrigo/unfollowers-for-instagram) serviu como referência técnica de formatos e endpoints, mas seu código não foi incluído neste pacote. A ausência de uma licença explícita no repositório de terceiros **não autoriza copiar ou relicenciar seu código**. O código original deste projeto é disponibilizado sob MIT.

## Contribua

Abra issue sem informar username real, cookies ou dados pessoais. Veja [CONTRIBUTING.md](CONTRIBUTING.md).

## Publicar no seu GitHub

Crie um repositório vazio em <https://github.com/new> e adicione **o conteúdo deste diretório**, não apenas um único ZIP. No PC, o procedimento mais confiável é:

```bash
git init
git add .
git commit -m "Primeira versão pública Radar Seguidores"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/radar-seguidores.git
git push -u origin main
```

Os arquivos gerados na pasta `dist/` são ignorados pelo Git: a CI gera os pacotes de cada navegador. Antes de publicar, confira se não há dados pessoais, chaves, cookies ou credenciais. Consulte o checklist em `docs/PUBLICACAO.md`.
