import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="relative size-6 overflow-hidden rounded border border-border bg-card">
            <Image src="/logo.png" alt="原点智能 Logo" fill className="object-contain p-0.5" />
          </div>
          <span className="text-sm text-muted-foreground">
            {"© 2026 原点智能｜教培机构的 AI 运营系统"}
          </span>
        </div>
      </div>
    </footer>
  )
}
