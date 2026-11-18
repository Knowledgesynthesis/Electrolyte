import { Fragment, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

/**
 * Minimal inline formatter for content strings:
 * **bold**, *italic*, `code`, [label](/internal) or [label](https://external)
 */
const TOKEN = /(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g

export function Rich({ text }: { text: string }) {
  const parts = text.split(TOKEN)
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null
        if (part.startsWith('**') && part.endsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
        if (part.startsWith('`') && part.endsWith('`')) return <code key={i} className="rounded bg-muted px-1 py-0.5 font-mono text-[0.9em]">{part.slice(1, -1)}</code>
        if (part.startsWith('[')) {
          const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
          if (m) {
            const [, label, href] = m
            return href.startsWith('/') ? (
              <Link key={i} to={href} className="font-medium text-primary underline-offset-2 hover:underline">
                {label}
              </Link>
            ) : (
              <a key={i} href={href} target="_blank" rel="noreferrer" className="font-medium text-primary underline-offset-2 hover:underline">
                {label}
              </a>
            )
          }
        }
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}

/** Render multi-line text (newlines → line breaks) */
export function Lines({ text }: { text: string }): ReactNode {
  const lines = text.split('\n')
  return lines.map((l, i) => (
    <Fragment key={i}>
      <Rich text={l} />
      {i < lines.length - 1 && <br />}
    </Fragment>
  ))
}
