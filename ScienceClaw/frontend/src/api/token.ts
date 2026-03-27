/**
 * 纯 token 存取工具（不依赖 apiClient），用于避免 auth/client 循环依赖
 */
export function getStoredToken(): string | null {
  return localStorage.getItem('access_token');
}

export function storeToken(token: string): void {
  localStorage.setItem('access_token', token);
}

export function storeRefreshToken(refreshToken: string): void {
  localStorage.setItem('refresh_token', refreshToken);
}

export function getStoredRefreshToken(): string | null {
  return localStorage.getItem('refresh_token');
}

export function clearStoredTokens(): void {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}
