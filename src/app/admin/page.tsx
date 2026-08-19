import BfcacheGuard from "@/components/admin/BfcacheGuard";
import { BRAND_MARK_UPPER } from "@/lib/brand";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function AdminLoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <BfcacheGuard />
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-cinzel text-2xl text-[#f2ca50] tracking-[0.3rem] mb-1">
            {BRAND_MARK_UPPER}
          </p>
          <p className="text-neutral-600 text-[10px] tracking-[0.25rem] uppercase">
            Espace Administrateur
          </p>
        </div>

        <form action="/api/admin/login" method="POST" className="space-y-5">
          <div>
            <label className="block text-[10px] text-neutral-500 tracking-widest uppercase mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="w-full bg-transparent border-b border-neutral-800 text-[#e5e2e1] text-sm py-3 px-0 focus:outline-none focus:border-[#f2ca50] transition-colors duration-300"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs tracking-wide">
              Mot de passe incorrect.
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#f2ca50] text-[#0a0a0a] py-3.5 font-cinzel font-bold tracking-widest uppercase text-xs hover:bg-[#d4af37] transition-colors duration-300 mt-4"
          >
            Accéder
          </button>
        </form>
      </div>
    </div>
  );
}
