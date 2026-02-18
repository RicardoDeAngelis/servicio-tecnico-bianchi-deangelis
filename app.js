// SPA básica con rutas por data-route + almacenamiento en localStorage

const ROUTES = ['home', 'services', 'request', 'status', 'contact'];
const STORAGE_KEY_ORDERS = 'serviclima_orders_v1';

function selectRoute(route) {
  if (!ROUTES.includes(route)) route = 'home';

  document.querySelectorAll('.route').forEach((section) => {
    section.classList.toggle('active', section.id === `route-${route}`);
  });

  const nav = document.querySelector('.topbar-nav');
  nav?.classList.remove('open');

  if (route === 'status') {
    renderStatusInitial();
  }
}

function navigate(route) {
  window.location.hash = `#${route}`;
  selectRoute(route);
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(showToast._timeout);
  showToast._timeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 2600);
}

function generateOrderId() {
  const now = new Date();
  const year = now.getFullYear();
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `SC-${year}-${rand}`;
}

function getStoredOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ORDERS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
}

function addOrder(payload) {
  const orders = getStoredOrders();
  const order = {
    id: generateOrderId(),
    createdAt: new Date().toISOString(),
    status: 'pending',
    ...payload,
  };
  orders.unshift(order);
  saveOrders(orders);
  return order;
}

function findOrder(id) {
  const orders = getStoredOrders();
  return orders.find((o) => o.id.toLowerCase() === id.toLowerCase());
}

function formatDate(iso) {
  try {
    const date = new Date(iso);
    return date.toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function renderStatusInitial() {
  const container = document.getElementById('statusResult');
  if (!container) return;
  container.classList.add('empty');
  container.innerHTML = '<p>Ingresá un número de orden para ver su estado.</p>';
}

function renderStatus(order) {
  const container = document.getElementById('statusResult');
  if (!container) return;

  if (!order) {
    container.classList.remove('empty');
    container.innerHTML =
      '<p>No encontramos una orden con ese número. Revisá que esté bien escrito.</p>';
    return;
  }

  container.classList.remove('empty');
  const statusMap = {
    pending: { label: 'Pendiente de confirmación', cls: 'pending' },
    scheduled: { label: 'Visita programada', cls: 'scheduled' },
    completed: { label: 'Trabajo completado', cls: 'completed' },
  };
  const status = statusMap[order.status] || statusMap.pending;

  container.innerHTML = `
    <div>
      <div class="status-badge ${status.cls}">
        <span>Estado:</span>
        <strong>${status.label}</strong>
      </div>
      <p class="status-meta">
        N.º de orden: <strong>${order.id}</strong><br />
        Creada el: <strong>${formatDate(order.createdAt)}</strong><br />
        Categoría: <strong>${order.category === 'ac' ? 'Aire acondicionado' : 'Electricidad'}</strong><br />
        Urgencia: <strong>${order.priority}</strong>
      </p>
      <p class="status-meta">
        Esta información es local a tu navegador y solo se usa a modo de ejemplo.
      </p>
    </div>
  `;
}

function handleQuickRequestSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value.trim();
  const phone = form.phone.value.trim();
  const service = form.service.value;

  if (!name || !phone || !service) return;

  addOrder({
    name,
    phone,
    email: '',
    category: service.startsWith('ac') ? 'ac' : 'electric',
    priority: 'normal',
    address: '',
    description: `Solicitud rápida: ${service}`,
    fromQuick: true,
  });

  form.reset();
  showToast('Solicitud enviada. Te contactaremos a la brevedad.');
}

function handleRequestSubmit(e) {
  e.preventDefault();
  const form = e.target;

  const data = {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    email: form.email.value.trim(),
    category: form.category.value,
    priority: form.priority.value,
    address: form.address.value.trim(),
    description: form.description.value.trim(),
    hasWarranty: form.hasWarranty.checked,
  };

  if (!data.name || !data.phone || !data.category || !data.priority || !data.address || !data.description) {
    showToast('Por favor completá todos los campos obligatorios.');
    return;
  }

  const order = addOrder(data);
  form.reset();
  showToast(`Orden creada: ${order.id}`);

  const statusInput = document.getElementById('orderId');
  if (statusInput) {
    statusInput.value = order.id;
  }
}

function handleStatusSubmit(e) {
  e.preventDefault();
  const id = e.target.orderId.value.trim();
  if (!id) return;
  const order = findOrder(id);
  renderStatus(order);
}

function handleContactSubmit(e) {
  e.preventDefault();
  e.target.reset();
  showToast('Mensaje enviado. Te responderemos por email a la brevedad.');
}

function initNavigation() {
  document.querySelectorAll('[data-route]').forEach((el) => {
    el.addEventListener('click', (ev) => {
      const route = el.getAttribute('data-route');
      if (!route) return;
      ev.preventDefault();
      navigate(route);
    });
  });

  window.addEventListener('hashchange', () => {
    const route = window.location.hash.replace('#', '') || 'home';
    selectRoute(route);
  });

  const initialRoute = window.location.hash.replace('#', '') || 'home';
  selectRoute(initialRoute);
}

function initForms() {
  const quickForm = document.getElementById('quickRequestForm');
  const requestForm = document.getElementById('requestForm');
  const statusForm = document.getElementById('statusForm');
  const contactForm = document.getElementById('contactForm');

  quickForm?.addEventListener('submit', handleQuickRequestSubmit);
  requestForm?.addEventListener('submit', handleRequestSubmit);
  statusForm?.addEventListener('submit', handleStatusSubmit);
  contactForm?.addEventListener('submit', handleContactSubmit);
}

function initTabs() {
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      tabs.forEach((t) => t.classList.toggle('active', t === tab));
      panels.forEach((p) => {
        p.classList.toggle('active', p.getAttribute('data-panel') === target);
      });
    });
  });
}

function initTopbarToggle() {
  const toggle = document.getElementById('topbarToggle');
  const nav = document.querySelector('.topbar-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
}

function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initForms();
  initTabs();
  initTopbarToggle();
  initYear();
});

