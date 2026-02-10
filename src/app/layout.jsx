import QueryProvider from "@/providers/QueryProvider";
import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Next CRUD 게시판",
  description: "Zustand + TanStack Query CRUD 예시"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <main className="page">
            <header className="head">
              <h1>Next CRUD 게시판</h1>
              <p>Zustand 중앙 상태관리 + TanStack Query 캐싱 + 라우트 기반 CRUD 예시</p>
              <nav className="row">
                <Link href="/" className="link-btn">
                  목록
                </Link>
                <Link href="/write" className="link-btn">
                  글쓰기
                </Link>
              </nav>
            </header>
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
