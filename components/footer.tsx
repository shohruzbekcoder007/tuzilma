import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Миллий статистика қўмитаси. Барча ҳуқуқлар ҳимояланган.
          </p>
          <p className="text-xs text-muted-foreground">Манзил: Тошкент шаҳри, Мустақиллик кўчаси, 63-уй</p>
        </div>
        <div className="flex gap-4">
          {/* <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Махфийлик сиёсати
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Фойдаланиш шартлари
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
            Алоқа
          </Link> */}
        </div>
      </div>
    </footer>
  )
}

