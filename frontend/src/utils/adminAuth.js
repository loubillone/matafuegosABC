export function getAuthHeaders() {
  const token = localStorage.getItem("adminToken");
  return { Authorization: `Bearer ${token}` };
}

export function getAuthJsonHeaders() {
  return {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
  };
}

// Si la respuesta es 401, limpia la sesión y redirige al login.
// Devuelve true si manejó el caso (el llamador debe cortar el flujo).
export function handleUnauthorized(response) {
  if (response.status === 401) {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsuario");
    window.location.href = "/admin/login";
    return true;
  }
  return false;
}
