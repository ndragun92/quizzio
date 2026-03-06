import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

const scrypt = promisify(scryptCallback)
const SALT_SIZE = 16
const KEY_LENGTH = 64
const HASH_PREFIX = 'scrypt'

const encode = (buffer: Buffer): string => buffer.toString('hex')
const decode = (value: string): Buffer => Buffer.from(value, 'hex')

export const isPasswordHash = (value: string): boolean => value.startsWith(`${HASH_PREFIX}$`)

export const hashPassword = async (password: string): Promise<string> => {
  const salt = randomBytes(SALT_SIZE)
  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer

  return `${HASH_PREFIX}$${encode(salt)}$${encode(derivedKey)}`
}

export const verifyPassword = async (
  password: string,
  storedPassword: string,
): Promise<boolean> => {
  if (!storedPassword) {
    return false
  }

  if (!isPasswordHash(storedPassword)) {
    return password === storedPassword
  }

  const [prefix, saltHex, hashHex] = storedPassword.split('$')

  if (prefix !== HASH_PREFIX || !saltHex || !hashHex) {
    return false
  }

  const salt = decode(saltHex)
  const expectedHash = decode(hashHex)
  const providedHash = (await scrypt(password, salt, expectedHash.length)) as Buffer

  if (providedHash.length !== expectedHash.length) {
    return false
  }

  return timingSafeEqual(providedHash, expectedHash)
}
