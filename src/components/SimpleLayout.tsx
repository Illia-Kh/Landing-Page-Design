import { Outlet, NavLink, useParams, useLocation, useNavigate } from "react-router-dom";

type Lang = "en" | "cs" | "de";

function SimpleLangSwitcher() {
  const { pathname } = useLocation();
  const { lang = "cs" as Lang } = useParams();
  const navigate = useNavigate();

  const setLang = (next: Lang) => {
    if (next === lang) return;
    const pathParts = pathname.split('/');
    pathParts[1] = next; // Replace the language part
    const nextPath = pathParts.join('/');
    navigate(nextPath, { replace: true });
  };

  return (
    <div className="flex gap-2">
      <button 
        className={`px-2 py-1 rounded ${lang === "cs" ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
        onClick={() => setLang("cs")}
      >
        CS
      </button>
      <button 
        className={`px-2 py-1 rounded ${lang === "en" ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <button 
        className={`px-2 py-1 rounded ${lang === "de" ? "bg-blue-600 text-white" : "hover:bg-gray-100"}`}
        onClick={() => setLang("de")}
      >
        DE
      </button>
    </div>
  );
}

export default function SimpleLayout() {
  const { lang = "cs" as Lang } = useParams();

  const linkBase = (slug?: string) => `/${lang}${slug ? `/${slug}` : ""}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-8">
              <NavLink 
                to={linkBase()} 
                end
                className={({ isActive }) => 
                  `text-blue-600 hover:text-blue-800 ${isActive ? "font-bold border-b-2 border-blue-600" : ""}`
                }
              >
                Domů
              </NavLink>
              <NavLink 
                to={linkBase("about")} 
                className={({ isActive }) => 
                  `text-blue-600 hover:text-blue-800 ${isActive ? "font-bold border-b-2 border-blue-600" : ""}`
                }
              >
                O nás
              </NavLink>
              <NavLink 
                to={linkBase("services")} 
                className={({ isActive }) => 
                  `text-blue-600 hover:text-blue-800 ${isActive ? "font-bold border-b-2 border-blue-600" : ""}`
                }
              >
                Služby
              </NavLink>
              <NavLink 
                to={linkBase("contacts")} 
                className={({ isActive }) => 
                  `text-blue-600 hover:text-blue-800 ${isActive ? "font-bold border-b-2 border-blue-600" : ""}`
                }
              >
                Kontakt
              </NavLink>
            </div>
            <SimpleLangSwitcher />
          </div>
        </nav>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-white text-center py-4">© IKH Systems</footer>
    </div>
  );
}