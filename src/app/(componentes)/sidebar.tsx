import React from 'react';
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

type NavItem = {
    label: string;
    href: string;
};

const sidebarItemsByRole: Record<string, NavItem[]> = {
    inventario: [
        { label: "Inventario", href: "/inventario" },
        { label: "Solicitudes Pendientes", href: "/solicitudes?filter=pendientes" },
        { label: "Todas las Solicitudes", href: "/solicitudes?filter=todas" },
    ],
    admin: [
        { label: "Inventario", href: "/inventario" },
        { label: "Solicitudes Pendientes", href: "/solicitudes?filter=pendientes" },
        { label: "Todas las Solicitudes", href: "/solicitudes?filter=todas" },
        { label: "Crear Solicitud", href: "/solicitudes/nueva" },
    ],
};

type NavHref = string | { pathname: string; query?: Record<string, string> };

function useIsActive(defaultHref?: string) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (href: NavHref) => {
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

    if (!pathname && defaultHref === href) return true;

    if (pathname !== expectedPath) return false;

    for (const [k, v] of Object.entries(expectedQuery)) {
      if (searchParams.get(k) !== v) return false;
    }

    return true;
  };
}

// Usuario mock
const mockUser = {
  name: "Erika Cardozo",
  email: "erika@empresa.com",
  role: "inventario", 
};

export default function Sidebar({ children }: { children?: React.ReactNode }) {
    const router = useRouter();
    const isActive = useIsActive();

    const handleLogout = () => {
        console.log("Cerrar sesión");
        router.push("/login");
    };

    const navItems = sidebarItemsByRole[mockUser.role] || [];

    return (
        <div className="h-full bg-[#FFFFFF] justify-between flex flex-col">
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]">

                <aside className="sticky top-0 z-40 bg-[#3a86ff] p-4 md:h-screen py-6 flex flex-col justify-between">
                    <div>
                        <nav className="mt-2 flex flex-col items-center gap-1 text-white">
                            {navItems.map((item) => {
                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={[
                                            "block w-52 rounded-sm px-3 py-2 text-sm transition-colors text-center",
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
                    </div>

                    <div className="mt-4 flex flex-col items-center text-white">
                        <div className="mb-1 font-medium">{mockUser.name}</div>
                        <div className="mb-2 text-xs">{mockUser.role.toUpperCase()}</div>
                        <button
                            onClick={handleLogout}
                            className="rounded px-4 py-2 bg-[#20519e] hover:bg-[#184080] text-sm font-semibold"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </aside>

                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
