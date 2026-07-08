import { cookies } from 'next/headers'
import crypto from 'crypto'

const SESSION_COOKIE = 'crafcory9_admin_session'
const SESSION_EXPIRY = 24 * 60 * 60 * 1000 // 24h

// Generate a session token
export function createSessionToken(): string {
  return crypto.randomBytes(32).toString('hex')
}

// Hash a password for verification
function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

// Verify password against stored hash
function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':')
  const verify = crypto.scryptSync(password, salt, 64).toString('hex')
  return crypto.timingSafeEqual(Buffer.from(verify), Buffer.from(hash))
}

// Set admin session cookie
export function setSessionCookie(token: string) {
  const cookieStore = cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/admin',
    maxAge: SESSION_EXPIRY / 1000,
  })
}

// Clear admin session cookie
export function clearSessionCookie() {
  const cookieStore = cookies()
  cookieStore.delete(SESSION_COOKIE)
}

// Verify the current session
export function verifySession(): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    // If no password set, default to 'admin123'
    // In production, always set ADMIN_PASSWORD env var
    return false
  }

  const cookieStore = cookies()
  const sessionToken = cookieStore.get(SESSION_COOKIE)?.value
  if (!sessionToken) return false

  // Session is valid if the token matches a stored hash
  // For simplicity: the token itself (hashed) is the validation
  // In-memory session store
  const sessions = getSessionStore()
  const session = sessions[sessionToken]
  if (!session) return false
  if (Date.now() > session.expiresAt) {
    delete sessions[sessionToken]
    saveSessionStore(sessions)
    return false
  }
  return true
}

// Session store management
interface Session {
  createdAt: number
  expiresAt: number
}

// Simple global session store (resets on serverless cold start, but works for demo)
const globalSessions: Record<string, Session> = {}

function getSessionStore(): Record<string, Session> {
  return globalSessions
}

function saveSessionStore(_sessions: Record<string, Session>) {
  // Sessions are stored in memory
  // In production, use Vercel KV or database
}

export function addSession(token: string) {
  const sessions = getSessionStore()
  sessions[token] = {
    createdAt: Date.now(),
    expiresAt: Date.now() + SESSION_EXPIRY,
  }
}
