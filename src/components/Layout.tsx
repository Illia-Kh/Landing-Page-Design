import { Outlet, NavLink, useParams } from "react-router-dom";
import LangSwitcher from "./LangSwitcher";

type Lang = "en" | "cs" | "de";

export default function Layout() {
  const { lang = "cs" as Lang } = useParams();

  const linkBase = (slug?: string) => `/${lang}${slug ? `/${slug}` : ""}`;

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-lg ${isActive ? "font-semibold opacity-100" : "opacity-70 hover:opacity-100"}`;

  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-40 backdrop-blur border-b">
        <nav className="container mx-auto flex items-center gap-4 py-3">
          <NavLink to={linkBase()} end className={linkClass}>Domů</NavLink>
          <NavLink to={linkBase("about")} className={linkClass}>O nás</NavLink>
          <NavLink to={linkBase("services")} className={linkClass}>Služby</NavLink>
          <NavLink to={linkBase("contacts")} className={linkClass}>Kontakt</NavLink>
          <div className="ml-auto">
            <LangSwitcher />
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t py-6 text-center opacity-70">© IKH Systems</footer>
    </div>
  );
}