export function validateNumber(value: unknown) {
  const num = Number(value)
  return typeof value === 'string' || typeof value === 'number'
    ? isNaN(num) ? null : { num }
    : null
}