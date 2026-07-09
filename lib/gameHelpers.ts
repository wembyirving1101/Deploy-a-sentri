import { Email, Password, DataClassification } from './types'

export function selectRandomFromArray<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

export function getRandomDelay(min: number = 3000, max: number = 10000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateRandomIncident(
  emails: Email[],
  passwords: Password[],
  documents: DataClassification[]
): { type: 'email' | 'password' | 'data-classification'; id: string } | null {
  if (emails.length === 0 && passwords.length === 0 && documents.length === 0) {
    return null
  }

  const types: Array<'email' | 'password' | 'data-classification'> = []
  if (emails.length > 0) types.push('email')
  if (passwords.length > 0) types.push('password')
  if (documents.length > 0) types.push('data-classification')

  const selectedType = selectRandomFromArray(types)

  switch (selectedType) {
    case 'email':
      return { type: 'email', id: selectRandomFromArray(emails).id }
    case 'password':
      return { type: 'password', id: selectRandomFromArray(passwords).id }
    case 'data-classification':
      return { type: 'data-classification', id: selectRandomFromArray(documents).id }
  }
}

export function getUniqueRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, array.length))
}
