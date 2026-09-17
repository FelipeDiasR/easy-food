ADR-001 - ARMANAZENAR RESTAURANTES EM MEMÓRIA 

STATUS: ACEITA
DATA: 20-08-2026
RESPONSÁVEL: FELIPE PADRINHO ARQUITETO DE SOFTW. FECAF

##CONTEXTO

PRIMEIRAVERSÃO DA API DO EASYFOOD, PRECISA DEVOLVER UMA LIOSTA DE RESTAURANTES, PARA CONSULTA E PEMITIR CADASTRO. 

O PRODUTO ESTÁ EM FASE DE PROTOTIPAÇÃO, TESTE E VALIDAÇÃO, E A PRIORIDADE É VALIDAR O FLUXO E FAZER APRESENTAÇÃO PARA INVESTIDORES, DE FORMA RÁPIDA E SIMPLES. 

----

## Alternativas consideradas

1 - ARRAY EM MEMÓRIA 

2 - PostgresSQL

3 - Mongo DB

4 - SQLITE

5 - Firebase

6 - Json

## Decisão 

Adotar array em memória como mecanismo de armazenamento na versão incial do serviço


## Justificatica

- Permite praticidade, velocidade em desenvolvimento e teste nas apis
- Menor complecidade
- Zero custo no desenvolvimento

## Cosnequ. 

##Posi. 

Desenvolveu e testou rápido
Conseguimos comprovar conceito de negócio

#negativo

Não conseguimos salvar dados 
Não suporta Comparttilhamento / análise de dados 
Fluxo de respostqa não faz sentido 
Sem integridade de dados



## Critérios de revisão

Esta decisão deve ser reavaliada quando:

1. O MVP for validado e houver decisão de ir para produção
2. Houver necessidade de persistência entre deploys
3. O volume de dados ultrapassar o que é razoável manter em memória
4. For necessário suporte a consultas complexas ou relacionamentos entre entidades

---

## Notas

- A interface de acesso aos dados (`push`, `filter`, `find`) será abstraída de forma que a migração futura para banco de dados exija alterações mínimas na camada de roteamento.
- Recomenda-se que o ADR de escolha do banco definitivo (ADR-002) seja criado antes da entrada em produção.
