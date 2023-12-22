type MaskType = 'letters' | 'numbers' | 'both'

const applyMask = (
  value: string | number,
  mask: string,
  maskType: MaskType = 'numbers'
): string => {
  if (!value) return ''

  let regex

  switch (maskType) {
    case 'letters':
      regex = /[^a-zA-Z]+/g
      break
    case 'numbers':
      regex = /\D+/g
      break
    case 'both':
    default:
      regex = /[^a-zA-Z0-9]+/g
      break
  }

  let formattedValue = ''
  const unmaskedValue = String(value).replace(regex, '')
  let position = 0

  for (let i = 0; i < mask.length; i++) {
    if (
      (mask[i] === '#' || mask[i] === '*') &&
      unmaskedValue[position] !== undefined
    ) {
      formattedValue += unmaskedValue[position++]
    } else if (unmaskedValue[position] !== undefined) {
      formattedValue += mask[i]
    }
  }

  return formattedValue
}

export default applyMask
