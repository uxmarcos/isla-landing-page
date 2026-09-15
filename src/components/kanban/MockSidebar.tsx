import {
  LayoutGrid,
  Calendar as CalIcon,
  BarChart3,
  Settings,
  LogOut,
  User,
  ChevronRight,
  Sparkles,
  Lightbulb,
  Home,
  Rocket,
  Inbox,
  Sun,
} from "lucide-react";

const items = [
  { icon: Home, label: "Home" },
  { icon: LayoutGrid, label: "Kanban", active: true },
  { icon: Inbox, label: "Inbox" },
  { icon: CalIcon, label: "Calendar" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Sparkles, label: "AI Outreach" },
  { icon: Lightbulb, label: "Post Ideas" },
  { icon: Settings, label: "Settings" },
];

function IslaGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M14.9736 2.81738C17.2662 2.73219 19.523 3.08333 20.7949 5.23535C21.145 5.98589 21.6834 6.33338 22.0713 6.58398C22.2102 6.67375 22.3301 6.75105 22.415 6.83008C22.5636 6.97235 23.0007 7.20894 23.4697 7.46191C24.0771 7.78951 24.7376 8.14531 24.8916 8.36328C26.1783 10.1671 26.3529 11.2357 26.3018 13.3965C25.8798 15.4759 24.1783 20.401 20.7471 23.4658C18.664 24.6185 16.8785 25.4894 14.5049 25.3076C14.4396 25.3032 14.3735 25.2992 14.3076 25.2949C13.8423 25.2646 13.3642 25.2334 12.9102 25.1553C12.5182 25.0968 12.1365 24.9993 11.7549 24.9023C11.5345 24.8463 11.3137 24.7909 11.0908 24.7422C10.9595 24.7135 10.8299 24.6849 10.7021 24.6572C8.68668 24.2211 7.09885 23.8776 5.45996 22.4092C5.15342 22.1345 4.91784 21.8122 4.67773 21.4834C4.65123 21.4471 4.62438 21.4104 4.59766 21.374C3.59572 20.0093 2.84309 18.5012 2.74902 16.7822C2.70953 16.0601 2.74014 15.2922 2.84668 14.5762C2.8789 14.3597 2.9216 14.1445 2.96484 13.9297C2.99666 13.7716 3.02922 13.6138 3.05664 13.4551C3.09092 13.2566 3.12526 13.058 3.16016 12.8594C3.30221 12.0507 3.44475 11.24 3.54883 10.4268C3.61314 9.92429 3.65204 9.4218 3.69043 8.91797C3.69725 8.82852 3.70397 8.739 3.71094 8.64941C3.71559 8.58964 3.7202 8.52964 3.72461 8.46973C3.7543 8.06661 3.78351 7.661 3.8877 7.26953C4.04923 6.66256 4.35603 6.05378 4.77832 5.58594C6.90102 3.23472 11.4532 2.99938 14.6514 2.83398C14.7604 2.82834 14.8679 2.82294 14.9736 2.81738ZM15.5234 5.72656C13.2848 4.32475 10.5446 3.20858 8.31152 4.61914C5.02678 6.69414 3.51321 10.0458 4.68848 14.4326C5.62201 17.9166 7.23376 20.4824 9.03223 22.4189C11.8636 25.4677 16.8643 23.8022 19.7998 20.8535C22.88 17.7595 25.8544 15.3322 24.8438 11.5605C23.5545 6.74918 20.1531 8.62536 15.5234 5.72656Z" fill="currentColor"/>
    </svg>
  );
}

/** Collapsed icon-rail replica of the Isla app sidebar. Purely decorative. */
export function MockSidebar() {
  return (
    <aside
      aria-hidden="true"
      className="relative flex w-[68px] shrink-0 flex-col items-center justify-between self-stretch border-r border-[#E6E6E6] bg-[#F8F8F8] py-0 dark:border-[#2C2C2C] dark:bg-[#111111]"
    >
      <span className="absolute -right-3 top-24 z-10 flex size-6 items-center justify-center rounded-full border border-[#E6E6E6] bg-white text-neutral-500 shadow-sm dark:border-[#2C2C2C] dark:bg-[#111111] dark:text-neutral-400">
        <ChevronRight className="size-3.5" />
      </span>

      <div className="w-full">
        <div className="flex h-[60px] items-center justify-center border-b border-[#E6E6E6] dark:border-[#2C2C2C]">
          <IslaGlyph className="size-6 text-neutral-900 dark:text-white" />
        </div>

        <div className="flex justify-center border-b border-[#E6E6E6] py-4 dark:border-[#2C2C2C]">
          <div className="grid size-9 place-items-center rounded-md bg-[#F71963] text-[13px] font-bold text-white">
            V
          </div>
        </div>

        <nav className="flex flex-col items-center gap-1 py-3">
          {items.map(({ icon: Icon, label, active }) => (
            <div
              key={label}
              className={`grid size-9 place-items-center rounded-[6px] ${
                active
                  ? "bg-[#00BFFF] text-white"
                  : "text-neutral-600 dark:text-neutral-400"
              }`}
            >
              <Icon className="size-4" />
            </div>
          ))}
        </nav>
      </div>

      <div className="flex w-full flex-col items-center gap-3 pb-5">
        <div className="grid size-9 place-items-center rounded-[6px] border border-[#E6E6E6] text-neutral-900 dark:border-[#2C2C2C] dark:text-white">
          <Rocket className="size-4" />
        </div>
        <div className="grid size-9 place-items-center rounded-[6px] text-neutral-600 dark:text-neutral-400">
          <User className="size-4" />
        </div>
        <div className="grid size-9 place-items-center rounded-[6px] text-neutral-500 dark:text-neutral-400">
          <Sun className="size-4" />
        </div>
        <div className="grid size-9 place-items-center rounded-[6px] text-[#E1634E]">
          <LogOut className="size-4" />
        </div>
      </div>
    </aside>
  );
}


export default MockSidebar;
