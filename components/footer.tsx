export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded bg-primary">
            <span className="text-[10px] font-bold text-primary-foreground">W</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {"© 2026 未名逻辑 | 工业级 AI 教培基础设施"}
          </span>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="transition-colors hover:text-foreground">
            {"联系我们"}
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            {"服务协议"}
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            {"隐私政策"}
          </a>
        </div>
      </div>
    </footer>
  )
}
