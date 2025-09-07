import { useLocation, useNavigate, useParams } from "react-router-dom";

type Lang = "en" | "cs" | "de";

export default function LangSwitcher() {
  const { pathname } = useLocation();
  const { lang = "cs" as Lang } = useParams();
  const navigate = useNavigate();

  const setLang = (next: Lang) => {
    if (next === lang) return;
    const nextPath = pathname.replace(`/${lang}`, `/${next}`);
    navigate(nextPath, { replace: true });
  };

  return (
    <div className="flex gap-2">
      <button className="px-2 py-1 rounded hover:bg-black/5" onClick={() => setLang("cs")}>CS</button>
      <button className="px-2 py-1 rounded hover:bg-black/5" onClick={() => setLang("en")}>EN</button>
      <button className="px-2 py-1 rounded hover:bg-black/5" onClick={() => setLang("de")}>DE</button>
    </div>
  );
}