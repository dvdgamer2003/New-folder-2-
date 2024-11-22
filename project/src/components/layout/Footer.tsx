import { ThemeToggle } from "../theme/ThemeToggle"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex h-14 items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © {currentYear} Divyesh Ravane. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}
