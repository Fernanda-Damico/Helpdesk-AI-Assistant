import { Headset } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-900 text-white shadow-lg shadow-slate-900/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-md shadow-blue-900/40">
            <Headset className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <h1 className="text-base font-semibold leading-tight tracking-tight sm:text-lg">
              HelpDesk AI Assistant
            </h1>
            <p className="text-xs leading-normal text-slate-300">Painel de triagem de chamados de TI</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-200 sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Triagem disponível
        </div>
      </div>
    </header>
  );
}
