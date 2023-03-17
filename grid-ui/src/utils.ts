const CHIP_COLORS = [
  'purple-darken-2',
  'orange-darken-2',
  'light-blue-darken-2',
  'indigo-darken-2',
  'pink-darken-2',
  'brown-lighten-2',
  'green-darken-2',
]

// https://stackoverflow.com/a/34842797/552621
const hashCode = (s: string) => s.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0)

/***
 * Return chip color for the given text
 */
export const chipColor = (text: string) => CHIP_COLORS[Math.abs(hashCode(text)) % CHIP_COLORS.length]

/**
 * Given a text generate two letter initials
 */
export const getInitials = (text: string) => {
  text
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export const requiredRule = (value: string) => (value ? true : 'Required')
export const minCharacters = (numChars: number) => (value: string) =>
  value.length >= numChars ? true : `At least ${numChars} characters`
