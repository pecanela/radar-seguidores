# Política de privacidade — Radar Seguidores

Última atualização: 12 de outubro de 2026.

**Quem desenvolve:** projeto comunitário independente, não afiliado à Meta ou Instagram.

**Dados lidos:** durante a análise iniciada pelo usuário, a extensão consulta a lista de contas que ele segue e de seus seguidores, incluindo identificadores, usernames e nomes públicos retornados pelo Instagram. A sessão autenticada é utilizada pelo próprio navegador no domínio instagram.com. O Radar não possui tela própria de senha nem envia sua senha ao desenvolvedor.

**Armazenamento:** as listas completas e a data da última análise, além do histórico de perdas, ficam no `storage.local` da extensão, sob uma chave por conta do Instagram. Não são criptografadas por uma camada própria da extensão. Não há servidor de backend, analytics, anúncios ou envio dos dados ao desenvolvedor no código publicado. O Instagram recebe as consultas que o usuário solicita e as ações de unfollow autorizadas.

**Compartilhamento:** a extensão não envia dados dos seguidores para nenhum serviço próprio ou de terceiros, além das requisições necessárias ao Instagram. O navegador e Instagram possuem políticas independentes.

**Controle:** no painel, o botão **Apagar histórico** exclui os dados da conta atual neste navegador. Remover a extensão também pode eliminar seus dados, conforme o comportamento do navegador.

**Retenção:** o histórico permanece localmente até exclusão pelo usuário ou pelo navegador. Não existe sincronização entre dispositivos; uma reinstalação pode apagar os registros.

**Permissões:** `storage` para armazenar análises; `instagram.com` para ler a página autenticada e efetuar as consultas e unfollows solicitados. Não pedimos acesso geral a outros sites, contatos ou arquivos.

**Segurança e limitações:** o projeto usa interfaces internas não documentadas do Instagram. Sua conta pode sofrer restrições por consultas excessivas; não há garantia de disponibilidade, precisão absoluta ou conformidade com termos do Instagram. Evite dados sensíveis em issues públicas do GitHub.

**Contato:** após criar o repositório público, utilize a aba Issues para assuntos gerais. Não publique cookies, tokens de sessão, dados pessoais ou listas de seguidores.
