// CONSTANTES E ESTADO
const STORAGE_KEY = 'LISTA_COMPRAS_IHC_DATA';

let shoppingItems = loadItemsFromStorage();
let currentFilter = 'ALL'; // 'ALL' | 'PENDING' | 'COMPLETED'

// ELEMENTOS DO DOM
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const categorySelect = document.getElementById('category-select');
const itemList = document.getElementById('item-list');
const emptyState = document.getElementById('empty-state');
const feedbackMessage = document.getElementById('feedback-message');
const itemCounter = document.getElementById('item-counter');

// --- PREVENÇÃO DE ERROS E FEEDBACK ---

/**
 * Exibe mensagem de feedback visual para ações do usuário (IHC: Visibilidade de Estado).
 */
function showFeedback(message, type = 'success') {
  feedbackMessage.textContent = message;
  
  if (type === 'error') {
    feedbackMessage.className = 'p-3 rounded-lg text-sm font-medium bg-red-100 text-red-700 border border-red-200';
  } else {
    feedbackMessage.className = 'p-3 rounded-lg text-sm font-medium bg-green-100 text-green-700 border border-green-200';
  }

  feedbackMessage.classList.remove('hidden');

  setTimeout(() => {
    feedbackMessage.classList.add('hidden');
  }, 3000);
}

// --- LÓGICA DA APLICAÇÃO ---

/**
 * Adiciona um novo item à lista.
 */
function handleAddItem(event) {
  event.preventDefault();

  const name = itemInput.value.trim();
  const category = categorySelect.value;

  // Guard Clause: Validação de entrada vazia (IHC: Prevenção de Erros)
  if (!name) {
    showFeedback('Por favor, digite o nome do item antes de adicionar.', 'error');
    itemInput.focus();
    return;
  }

  const newItem = Object.freeze({
    id: Date.now().toString(),
    name: name,
    category: category,
    isPurchased: false
  });

  shoppingItems = [newItem, ...shoppingItems];
  saveItemsToStorage();
  render();

  itemInput.value = '';
  itemInput.focus();
  showFeedback(`Item "${name}" adicionado com sucesso!`);
}

/**
 * Alterna o estado de comprado de um item.
 */
function toggleItemStatus(itemId) {
  shoppingItems = shoppingItems.map(item => {
    if (item.id === itemId) {
      return { ...item, isPurchased: !item.isPurchased };
    }
    return item;
  });

  saveItemsToStorage();
  render();
}

/**
 * Remove um item com confirmação explícita.
 */
function removeItem(itemId) {
  const itemToDelete = shoppingItems.find(item => item.id === itemId);
  
  // Guard Clause: Prevenção de erros ao tentar remover inexistente
  if (!itemToDelete) return;

  const hasConfirmed = confirm(`Deseja realmente remover "${itemToDelete.name}" da lista?`);
  if (!hasConfirmed) return;

  shoppingItems = shoppingItems.filter(item => item.id !== itemId);
  saveItemsToStorage();
  render();
  showFeedback(`Item "${itemToDelete.name}" removido.`);
}

// --- FILTROS E CONTAGEM ---

function filterItems(items, filter) {
  if (filter === 'PENDING') return items.filter(item => !item.isPurchased);
  if (filter === 'COMPLETED') return items.filter(item => item.isPurchased);
  return items;
}

function updateCounter() {
  const total = shoppingItems.length;
  const completed = shoppingItems.filter(i => i.isPurchased).length;
  itemCounter.textContent = `${total} item(ns) | ${completed} comprado(s)`;
}

// --- PERSISTÊNCIA (localStorage) ---

function saveItemsToStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(shoppingItems));
}

function loadItemsFromStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// --- RENDERIZAÇÃO ---

function createItemElement(item) {
  const li = document.createElement('li');
  li.className = `flex items-center justify-between p-3 border rounded-lg bg-white shadow-sm transition-all ${
    item.isPurchased ? 'item-purchased bg-slate-50' : ''
  }`;

  li.innerHTML = `
    <div class="flex items-center gap-3">
      <input 
        type="checkbox" 
        ${item.isPurchased ? 'checked' : ''} 
        class="h-5 w-5 text-blue-600 rounded cursor-pointer"
        aria-label="Marcar como comprado"
      >
      <div>
        <span class="font-medium text-slate-800 ${item.isPurchased ? 'line-through text-slate-400' : ''}">
          ${item.name}
        </span>
        <span class="ml-2 text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
          ${item.category}
        </span>
      </div>
    </div>
    <button 
      class="delete-btn text-slate-400 hover:text-red-600 font-bold px-2 py-1 transition-colors"
      title="Remover item"
    >
      🗑️
    </button>
  `;

  // Eventos inline com responsabilidade bem delimitada
  li.querySelector('input[type="checkbox"]').addEventListener('change', () => toggleItemStatus(item.id));
  li.querySelector('.delete-btn').addEventListener('click', () => removeItem(item.id));

  return li;
}

function render() {
  const filteredItems = filterItems(shoppingItems, currentFilter);
  itemList.innerHTML = '';

  if (filteredItems.length === 0) {
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
    filteredItems.forEach(item => {
      itemList.appendChild(createItemElement(item));
    });
  }

  updateCounter();
}

// --- INICIALIZAÇÃO ---

function init() {
  itemForm.addEventListener('submit', handleAddItem);

  // Event Listeners dos Filtros
  document.getElementById('filter-all').addEventListener('click', (e) => setFilter('ALL', e.target));
  document.getElementById('filter-pending').addEventListener('click', (e) => setFilter('PENDING', e.target));
  document.getElementById('filter-completed').addEventListener('click', (e) => setFilter('COMPLETED', e.target));

  render();
}

function setFilter(filter, buttonElement) {
  currentFilter = filter;
  
  // Atualiza destaque dos botões de filtro
  document.querySelectorAll('section button').forEach(btn => {
    btn.className = 'px-3 py-1 rounded-md hover:bg-slate-100';
  });
  buttonElement.className = 'px-3 py-1 rounded-md bg-blue-100 text-blue-700 font-medium';

  render();
}

document.addEventListener('DOMContentLoaded', init);