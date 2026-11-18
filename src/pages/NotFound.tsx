import { LinkButton } from '@/components/ui'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <div className="text-6xl font-bold text-muted-foreground">404</div>
      <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 text-muted-foreground">The page moved or never existed. Try search (⌘K) or start from the curriculum.</p>
      <div className="mt-6 flex justify-center gap-2">
        <LinkButton to="/learn">Curriculum</LinkButton>
        <LinkButton to="/" variant="outline">
          Home
        </LinkButton>
      </div>
    </div>
  )
}
