document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const navToggle = document.querySelector("#navToggle");
  const mainNav = document.querySelector("#mainNav");

  function closeMenu() {
    if (!navToggle || !mainNav) return;
    mainNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menu");
  }

  function openMenu() {
    if (!navToggle || !mainNav) return;
    mainNav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Fechar menu");
  }

  navToggle?.addEventListener("click", () => {
    navToggle.getAttribute("aria-expanded") === "true" ? closeMenu() : openMenu();
  });

  mainNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });

  const form = document.querySelector("#formContato");
  if (!form) return;

  const nome = document.querySelector("#nome");
  const email = document.querySelector("#email");
  const mensagem = document.querySelector("#mensagem");
  const erroNome = document.querySelector("#erro-nome");
  const erroEmail = document.querySelector("#erro-email");
  const erroMensagem = document.querySelector("#erro-mensagem");
  const status = document.querySelector("#statusForm");
  const submit = form.querySelector('button[type="submit"]');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function error(field, target, message = "") {
    if (!field || !target) return;
    target.textContent = message;
    field.setAttribute("aria-invalid", String(Boolean(message)));
  }

  function validateName() {
    const value = nome.value.trim();
    if (!value) { error(nome, erroNome, "Informe seu nome."); return false; }
    if (value.length < 2) { error(nome, erroNome, "Digite pelo menos 2 caracteres."); return false; }
    error(nome, erroNome);
    return true;
  }

  function validateEmail() {
    const value = email.value.trim();
    if (!value) { error(email, erroEmail, "Informe seu e-mail."); return false; }
    if (!emailRegex.test(value)) { error(email, erroEmail, "Digite um e-mail válido."); return false; }
    error(email, erroEmail);
    return true;
  }

  function validateMessage() {
    const value = mensagem.value.trim();
    if (!value) { error(mensagem, erroMensagem, "Escreva uma mensagem."); return false; }
    if (value.length < 10) { error(mensagem, erroMensagem, "A mensagem deve ter pelo menos 10 caracteres."); return false; }
    error(mensagem, erroMensagem);
    return true;
  }

  function clearStatus() {
    status.textContent = "";
    status.classList.remove("is-success", "is-error");
  }

  [nome, email, mensagem].forEach((field) => {
    field?.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") {
        if (field === nome) validateName();
        if (field === email) validateEmail();
        if (field === mensagem) validateMessage();
      }
    });
  });

  nome?.addEventListener("blur", validateName);
  email?.addEventListener("blur", validateEmail);
  mensagem?.addEventListener("blur", validateMessage);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearStatus();

    const valid = validateName() && validateEmail() && validateMessage();
    if (!valid) {
      const invalid = form.querySelector('[aria-invalid="true"]');
      invalid?.focus();
      status.textContent = "Revise os campos destacados antes de continuar.";
      status.classList.add("is-error");
      return;
    }

    const originalText = submit.textContent.trim();
    submit.disabled = true;
    submit.textContent = "Validando...";

    window.setTimeout(() => {
      status.textContent = "Formulário validado com sucesso! Esta é uma demonstração acadêmica.";
      status.classList.add("is-success");
      form.reset();
      [nome, email, mensagem].forEach((field) => field?.setAttribute("aria-invalid", "false"));
      [erroNome, erroEmail, erroMensagem].forEach((target) => { if (target) target.textContent = ""; });
      submit.disabled = false;
      submit.textContent = originalText || "Enviar mensagem";
    }, 650);
  });
});
