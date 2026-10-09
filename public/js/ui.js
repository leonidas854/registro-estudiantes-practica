/**
 * Módulo de Manipulación de UI y Estado Visual
 */
const messageBox = document.getElementById('messageBox');

export function showBanner(text, type) {
  if (!messageBox) return;
  messageBox.textContent = text;
  messageBox.className = `message-banner ${type}`;
  messageBox.classList.remove('hidden');
}

export function clearFieldErrors() {
  document.querySelectorAll('.form-group').forEach((g) => g.classList.remove('has-error'));
  document.querySelectorAll('.field-error').forEach((s) => (s.textContent = ''));
  if (messageBox) {
    messageBox.classList.add('hidden');
    messageBox.className = 'message-banner hidden';
  }
}

export function setFieldError(field, msg) {
  const group = document.getElementById(`group-${field}`);
  const errorSpan = document.getElementById(`error-${field}`);
  if (group) group.classList.add('has-error');
  if (errorSpan) errorSpan.textContent = msg;
}

export function switchTab(targetId) {
  const tabFormBtn = document.getElementById('tabFormBtn');
  const tabListBtn = document.getElementById('tabListBtn');
  const formSection = document.getElementById('formSection');
  const listSection = document.getElementById('listSection');

  const isForm = targetId === 'formSection';
  tabFormBtn?.classList.toggle('active', isForm);
  tabFormBtn?.setAttribute('aria-selected', String(isForm));
  tabListBtn?.classList.toggle('active', !isForm);
  tabListBtn?.setAttribute('aria-selected', String(!isForm));

  formSection?.classList.toggle('active', isForm);
  listSection?.classList.toggle('active', !isForm);
}
