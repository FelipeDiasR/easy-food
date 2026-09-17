# ADR-002 — Adotar PostgreSQL como banco de dados

| Campo       | Valor                          |
|-------------|--------------------------------|
| **Status**  | Aceito                         |
| **Data**    | 2026-08-20                     |
| **Autores** | Equipe de Engenharia EasyFood  |

---

## Contexto

Conforme previsto na ADR-001, o armazenamento em memória foi adotado para a fase de MVP. Com a validação do fluxo de negócio concluída, o serviço EasyFood precisa agora de persistência real para suportar:

- Dados que sobrevivam a reinicializações do processo
- Múltiplas instâncias do servidor (escalabilidade horizontal)
- Consultas mais complexas conforme o domínio evolui (filtros, ordenação, relacionamentos)
- Integridade e consistência dos dados em ambiente de produção

É necessário escolher um banco de dados definitivo para substituir o array em memória.

---

## Alternativas consideradas

| # | Opção | Descrição |
|---|-------|-----------|
| 1 | PostgreSQL | Banco relacional open-source, ACID, SQL padrão, extensível |
| 2 | MySQL | Banco relacional popular, boa performance para leituras simples |
| 3 | MongoDB | Banco orientado a documentos, schema flexível |
| 4 | SQLite | Banco relacional embarcado, sem servidor separado |

---

## Decisão

Adotar **PostgreSQL** como banco de dados relacional do EasyFood.

---

## Justificativa

- **Conformidade ACID** — garante integridade transacional, essencial para operações de cadastro e atualização de restaurantes
- **SQL padrão** — linguagem de consulta madura e amplamente conhecida pelo time
- **Extensibilidade** — suporte a JSON, full-text search, tipos geográficos (PostGIS) que podem ser úteis futuramente para busca por localização
- **Ecossistema Node.js maduro** — bibliotecas como `pg`, `knex` e `prisma` oferecem integração robusta
- **Performance comprovada** — lida bem com cargas de leitura e escrita mistas, adequado para o perfil do EasyFood
- **Open-source e sem custo de licença** — reduz custo operacional
- **Ampla adoção no mercado** — facilita contratação e onboarding de novos membros do time
- **Suporte a relacionamentos** — o domínio do EasyFood tende a crescer (pedidos, avaliações, endereços), e um banco relacional modela isso de forma natural

---

## Consequências

### Positivas

- ✅ Dados persistidos de forma durável entre reinicializações e deploys
- ✅ Suporte a múltiplas instâncias do servidor acessando o mesmo banco
- ✅ Consultas complexas com JOINs, índices e agregações
- ✅ Integridade referencial via foreign keys
- ✅ Caminho natural para evoluir o schema com migrations
- ✅ Ferramentas de backup e recuperação maduras

### Negativas

- ❌ Introduz dependência de infraestrutura externa (servidor de banco)
- ❌ Necessidade de gerenciar migrations de schema
- ❌ Configuração adicional no ambiente de desenvolvimento (Docker ou instalação local)
- ❌ Pequeno aumento de complexidade no onboarding de novos devs

---

## Critérios de revisão

Esta decisão deve ser reavaliada quando:

1. O volume de dados atingir escala que demande sharding ou réplicas de leitura
2. Surgir necessidade de modelagem predominantemente não-relacional
3. Requisitos de latência exigirem cache dedicado (Redis) como camada complementar

---

## Notas

- O ambiente de desenvolvimento utilizará PostgreSQL via Docker para manter paridade com produção.
- Será adotada uma biblioteca de migrations (ex: `knex` ou `prisma migrate`) para versionamento do schema.
- A migração dos dados do array em memória para o banco será feita de forma incremental, endpoint por endpoint.
