# g5-request

Pequeno sistema de "requests" (notificações com opção de aceitar/recusar) para FiveM, com UI NUI e utilitários para enviar requests individuais ou em grupo.

## Recursos
- Envio de requests para jogadores (cliente/server).
- UI NUI com tempo, progresso e extras customizáveis.
- Suporte a envio para múltiplos alvos com espera por respostas (export `sendAndWait`).
- Comandos de teste para envio único e em grupo.
- Configuração via `shared/config.lua`.
- Dependência: `ox_lib`.

## Instalação
1. Coloque a pasta `g5-request` dentro da sua pasta de recursos do servidor.
2. Adicione `ensure g5-request` no `server.cfg`.
3. Certifique-se de ter `ox_lib` instalado e disponível no servidor.

## Estrutura
- client/ — scripts cliente
- server/ — scripts servidor
- shared/ — configuração compartilhada
- html/ — UI (index.html, script.js, style.css)
- fxmanifest.lua — manifesto do recurso

## Configuração
Edite `shared/config.lua` para ajustar:
- Position: `'top-right'` | `'top-left'`
- DefaultTimeout: tempo padrão em ms
- AcceptKey / DenyKey: teclas padrão

Exemplo:
```lua
Config = {
  Position = 'top-right',
  DefaultTimeout = 15000,
  AcceptKey = 'Y',
  DenyKey = 'N',
}
```

## Como enviar um request (server-side)
Evento server para envio a um jogador:
- `TriggerEvent('g5-request:server:send', targetServerId, requestData)`

requestData (exemplo mínimo):
```lua
local request = {
  title = 'Pedido',
  titleIcon = 'user',
  tag = 'INFO',
  code = '1234',
  extras = {
    { icon = 'info', name = 'Obs', value = 'Detalhes aqui' }
  },
  timeout = 15000,
  tagColor = '#FF0000',
  progressColor = '#00FF00',
  codeColor = '#FFFFFF',
}
TriggerEvent('g5-request:server:send', 2, request)
```

## Envio a múltiplos alvos e espera por respostas
Export disponível no servidor:
- `exports['g5-request']:sendAndWait(targetsTable, requestData, timeoutMs)`

Retorna tabela com resultados por player id:
- { [playerId] = { answered = boolean, accepted = boolean, timedOut = boolean } }

Exemplo:
```lua
local results = exports['g5-request']:sendAndWait({2,3}, requestData, 20000)
for pid, res in pairs(results) do
  print(pid, res.answered, res.accepted, res.timedOut)
end
```

## Comandos de teste (requer permissão `group.admin`)
- `/sendtestrequest <target>` — envia um request de teste para `target` (server id).
- `/sendgrouptest <id1,id2,...>` — envia para múltiplos alvos e aguarda respostas.

## Eventos / NUI
NUI chama estes endpoints:
- POST `g5_request_answer` — usado para enviar a resposta (id, accepted).
- POST `g5_nui_ready` — disparado quando a NUI inicializa (para ajustar teclas/posição).

Server events:
- `g5-request:server:send` — envio de request a um alvo.
- `g5-request:server:answer` — disparado pelo cliente/NUI para responder ao request.

Client events:
- `g5-request:client:add` — mostra um novo request no cliente.

## Customização da UI
Edite `html/style.css` e `html/script.js` para:
- Ajustar posicionamento (Position em config).
- Alterar cores via propriedades `tagColor`, `progressColor`, `codeColor` no `requestData`.
- Alterar ícones usando Font Awesome (`titleIcon`, `extras[].icon`).

## Observações
- Requests expiram automaticamente após `timeout` e serão considerados recusados.
- O sistema usa filas por jogador no servidor; quando um jogador desconecta, sua fila é limpa.
- As IDs das requests são geradas automaticamente se não fornecidas.

Contribuições, melhorias e correções são bem-vindas.

