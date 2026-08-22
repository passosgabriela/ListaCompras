# Lista de Compras Web - IHC & Boas Práticas

Aplicação Web desenvolvida para a atividade prática da disciplina de **Desenvolvimento Web 2**.

## Tecnologias Utilizadas
- **HTML5**: Estruturação semântica do documento.
- **JavaScript (ES6+)**: Lógica da aplicação, manipulação do DOM e persistência.
- **Tailwind CSS (via CDN)**: Framework CSS escolhido para estilização rápida e responsiva[cite: 1].

---

## Justificativa do Framework (Tailwind CSS)

A escolha do **Tailwind CSS** como framework para o projeto baseia-se na entrega direta de valor para a experiência do usuário (IHC) e na facilidade de manutenção de código[cite: 1]:

1. **Previsibilidade e Consistência Visual**: A utilização do sistema de design por utilitários do Tailwind garante espaçamentos, tipografia e paleta de cores padronizados em toda a aplicação sem a necessidade de sobrescritas complexas em folhas CSS manuais[cite: 1].
2. **Affordance e Significantes**: Permite aplicar facilmente efeitos de hover (`hover:bg-blue-700`), foco (`focus:ring-2`) e estados ativos, indicando claramente ao usuário quais elementos são interativos[cite: 1].
3. **Redução da Carga Cognitiva e Responsividade**: Fornece classes utilitárias para layout responsivo (`flex-col sm:flex-row`), garantindo que a aplicação seja funcional tanto em dispositivos móveis quanto em desktops com layout limpo[cite: 1].

---

## Aplicação dos Conceitos de IHC

- **Affordance & Significantes**: Botões com destaque visual (`+ Adicionar`), campos com foco visível e ícones claros (lixeira para remoção)[cite: 1].
- **Feedback Visual**: Exibição de alertas temporários ao adicionar/remover itens e risco sobre o texto ao marcar itens comprados[cite: 1].
- **Prevenção de Erros**:
  - Impedimento de adição de textos em branco via *Guard Clause* e validação[cite: 1].
  - Confirmação via diálogo ao tentar excluir um item (`confirm`)[cite: 1].
- **Visibilidade de Estado**: O contador de itens exibe quantos itens totais e comprados existem em tempo real[cite: 1].

---

## Boas Práticas de Código Aplicadas

- **Nomenclatura**: Funções no padrão `camelCase` (`toggleItemStatus`, `saveItemsToStorage`), booleanos com prefixos `is/has` (`isPurchased`, `hasConfirmed`) e constantes globais em `UPPER_SNAKE_CASE`[cite: 1].
- **Responsabilidade Única**: Funções separadas estritamente para manipulação de localStorage, renderização de tela e filtragem[cite: 1].
- **Guard Clauses**: Uso de retornos antecipados para tratamento de erros antes da execução da lógica principal[cite: 1].
- **Imutabilidade**: Uso de `Object.freeze` e operadores *spread* (`...`) ao manipular o estado[cite: 1].

---

