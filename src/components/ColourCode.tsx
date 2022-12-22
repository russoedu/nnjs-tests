import './ColourCode.css'

export function toHex (num: number) {
  const txt = Number(num).toString(16).toUpperCase()
  return '0'.repeat(2 - txt.length) + txt
}

export function ColourCode ({ color, red, green, blue }: { color?: string, red?: number, green?: number, blue?: number }) {
  let r = '00'
  let g = '00'
  let b = '00'

  if (red !== undefined && green !== undefined && blue !== undefined) {
    r = toHex(red)
    g = toHex(green)
    b = toHex(blue)
  } else if (color !== undefined) {
    const clean = color.replace(/#\s?/, '')
    r = clean.substring(0, 2)
    g = clean.substring(2, 4)
    b = clean.substring(4, 6)
  }

  return (
    <pre className='cc-code'>
      # <span className='cc-red'>{r}</span> <span className='cc-green'>{g}</span> <span className='cc-blue'>{b}</span>
    </pre>
  )
}
