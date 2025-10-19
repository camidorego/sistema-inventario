import React, { use } from 'react';
import Link from "next/link";
import { usePathname, useSearchParams } from 'next/navigation';
import NewItemForm from '../inventario/(componentes)/newItemfForm';

type NavItem = {
    label: string;
    href: string;
    match?:(pathname: string) => boolean;
}

const navItems: NavItem[] = [
    {
        label: "Inventario",
        href: "/inventario",
    },
    {
        label: "Solicitudes Pendientes",
        href: "/solicitudes?filter=pendientes",
    },
    {
        label: "Todas las Solicitudes",
        href: "/solicitudes?filter=todas",
    },
];

type NavHref = string | { pathname: string; query?: Record<string, string> };

function useIsActive() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (href: NavHref) => {
    // Normalizamos a pathname + query esperada
    let expectedPath = "";
    let expectedQuery: Record<string, string> = {};

    if (typeof href === "string") {
      const url = new URL(href, "http://dummy");
      expectedPath = url.pathname;
      url.searchParams.forEach((v, k) => (expectedQuery[k] = v));
    } else {
      expectedPath = href.pathname;
      expectedQuery = href.query ?? {};
    }

    // 1) path debe coincidir
    if (pathname !== expectedPath) return false;

    // 2) si hay query esperada, debe coincidir (clave por clave)
    for (const [k, v] of Object.entries(expectedQuery)) {
      if (searchParams.get(k) !== v) return false;
    }

    return true;
  };
}

export default function Sidebar(
    { children, className }: { children?: React.ReactNode; className?: string }
){

    const isActive = useIsActive();

    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-[#FFFFFF]">
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]">
                {/* Dialog for NewItem */}
                <NewItemForm isOpen={isDialogOpen} onClose={()=>setIsDialogOpen(false)} onSave={()=>{}} />
                {/* Sidebar */}
                <aside className="sticky top-0 z-40 bg-[#3a86ff] p-4 md:h-screen py-20">
                <button
                    type="button"
                    className="w-full mb-3 rounded-xl bg-[#20519e] px-4 py-3 text-sm md:text-base font-semibold text-white shadow-sm hover:bg-[#184080] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6f2dbd]"
                    onClick={() => {setIsDialogOpen(true);}}
                >
                    Agregar Item
                </button>
                <nav className="mt-2 flex flex-col items-center gap-1 text-white">
                    {navItems.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <Link
                            key={item.href}
                            href={item.href}
                            className={[
                                "block w-52 rounded-sm px-3 py-2 text-sm transition-colors",
                                active
                                ? "bg-white/80 text-slate-900 shadow-sm"
                                : "text-white hover:bg-white/15 hover:text-white",
                            ].join(" ")}
                            >
                            {item.label}
                            </Link>
                        );
                    })}
                </nav>
                </aside>

                {/* Main */}
                <main className="p-6">{children}</main>
            </div>
        </div>
    )
}
