# Checklist de publicação e distribuição

1. Fazer os testes de conta real em **Firefox desktop** e, separadamente, **Chrome, Edge e Brave**; nunca extrapolar testes entre navegadores.
2. Confirmar que a extensão não envia dados a servidores desconhecidos; conferir `permissions`, `host_permissions` e fontes de scripts.
3. Verificar usuários com muitos seguidores, ciclos de cursor, HTTP 429 e 401/403, troca de conta e exclusão de histórico.
4. Aprovar em revisão jurídica/comunidade os riscos dos endpoints privados do Instagram, os termos da plataforma e as regras das lojas.
5. Preservar o ID `radar-seguidores-firefox@local.invalid`, já utilizado pelo protótipo, se quiser tentar manter a identidade da extensão e preservar o histórico local. Confirmar a aceitação deste ID na submissão AMO; não o trocar depois de publicado.
6. Rodar `npm test` e `npm run build`; usar `dist/firefox` para Firefox e `dist/chromium` para Chromium.
7. Enviar o pacote do Firefox à [Mozilla Add-ons](https://addons.mozilla.org/developers/) para assinatura/distribuição. Para Firefox Android, marcar compatibilidade e testar a interface no aparelho; **não afirmar compatibilidade validada sem teste real**.
8. Para Chrome Web Store, criar conta de desenvolvedor, completar declaração de privacidade/permissões, enviar pacote Chromium. Edge Add-ons requer envio específico quando desejado; Brave geralmente aceita extensões Chrome no desktop.
9. Publicar a política de privacidade como página acessível e usar URL no cadastro da loja.
10. Gerar GitHub Release somente após passar testes e revisão. Releases GitHub não substituem a assinatura obrigatória do Firefox estável.
11. A versão Android APK é **outro projeto**, não derivada automaticamente desta extensão. Preferir primeiro Firefox Android; APK requer manutenção, assinatura consistente, testes reais e distribuição responsável.
