import { Linkedin, Mail, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import eduardoImg from "@/assets/contacts/eduardo.png";
import marcosImg from "@/assets/contacts/marcos.png";

const CONTACTS = [
  {
    name: "Eduardo Schuch",
    role: "CEO",
    email: "eduardo@tailbox.com",
    image: eduardoImg,
    linkedin: "https://www.linkedin.com/in/eduschuch/",
  },
  {
    name: "Marcos Hollmann",
    role: "Growth",
    email: "marcos@isla.to",
    image: marcosImg,
    linkedin: "https://www.linkedin.com/in/marcos-hollmann/",
  },
];

export function Footer() {
  const [open, setOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      toast.success(`${email} copied to clipboard`);
      setTimeout(() => {
        setCopiedEmail((current) => (current === email ? null : current));
      }, 2000);
    } catch {
      toast.error("Failed to copy email");
    }
  };

  return (
    <footer
      data-nav-theme="dark"
      className="relative w-full border-t border-white/10 bg-[#050506]"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-6 py-8 md:flex-row md:justify-between md:gap-4">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2 text-white">
          <svg
            width="26"
            height="24"
            viewBox="0 0 30 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.9736 2.81738C17.2662 2.73219 19.523 3.08333 20.7949 5.23535C21.145 5.98589 21.6834 6.33338 22.0713 6.58398C22.2102 6.67375 22.3301 6.75105 22.415 6.83008C22.5636 6.97235 23.0007 7.20894 23.4697 7.46191C24.0771 7.78951 24.7376 8.14531 24.8916 8.36328C26.1783 10.1671 26.3529 11.2357 26.3018 13.3965C25.8798 15.4759 24.1783 20.401 20.7471 23.4658C18.664 24.6185 16.8785 25.4894 14.5049 25.3076C14.4396 25.3032 14.3735 25.2992 14.3076 25.2949C13.8423 25.2646 13.3642 25.2334 12.9102 25.1553C12.5182 25.0968 12.1365 24.9993 11.7549 24.9023C11.5345 24.8463 11.3137 24.7909 11.0908 24.7422C10.9595 24.7135 10.8299 24.6849 10.7021 24.6572C8.68668 24.2211 7.09885 23.8776 5.45996 22.4092C5.15342 22.1345 4.91784 21.8122 4.67773 21.4834C4.65123 21.4471 4.62438 21.4104 4.59766 21.374C3.59572 20.0093 2.84309 18.5012 2.74902 16.7822C2.70953 16.0601 2.74014 15.2922 2.84668 14.5762C2.8789 14.3597 2.9216 14.1445 2.96484 13.9297C2.99666 13.7716 3.02922 13.6138 3.05664 13.4551C3.09092 13.2566 3.12526 13.058 3.16016 12.8594C3.30221 12.0507 3.44475 11.24 3.54883 10.4268C3.61314 9.92429 3.65204 9.4218 3.69043 8.91797C3.69725 8.82852 3.70397 8.739 3.71094 8.64941C3.71559 8.58964 3.7202 8.52964 3.72461 8.46973C3.7543 8.06661 3.78351 7.661 3.8877 7.26953C4.04923 6.66256 4.35603 6.05378 4.77832 5.58594C6.90102 3.23472 11.4532 2.99938 14.6514 2.83398C14.7604 2.82834 14.8679 2.82294 14.9736 2.81738ZM15.5234 5.72656C13.2848 4.32475 10.5446 3.20858 8.31152 4.61914C5.02678 6.69414 3.51321 10.0458 4.68848 14.4326C5.62201 17.9166 7.23376 20.4824 9.03223 22.4189C11.8636 25.4677 16.8643 23.8022 19.7998 20.8535C22.88 17.7595 25.8544 15.3322 24.8438 11.5605C23.5545 6.74918 20.1531 8.62536 15.5234 5.72656Z"
              fill="#ffffff"
            />
          </svg>
          <span className="font-display text-[16px] font-semibold tracking-tight">
            Isla
          </span>
        </a>

        {/* Copyright */}
        <p className="text-center text-[13px] text-white/50">
          Copyright © 2025 Isla is part of Tailbox, Inc. All rights reserved.
        </p>

        {/* Right cluster */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/company/isla-ai/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-isla-cyan/80 transition-colors hover:text-isla-cyan"
            >
              <Linkedin className="h-4 w-4" />
            </a>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  aria-label="Email"
                  className="text-isla-cyan/80 transition-colors hover:text-isla-cyan"
                >
                  <Mail className="h-4 w-4" />
                </button>
              </DialogTrigger>
              <DialogContent
                className="border border-white/10 bg-[#0b0b0c] text-white shadow-2xl sm:max-w-md sm:rounded-xl
                  data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[50%]
                  data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[50%]
                  data-[state=open]:zoom-in-100 data-[state=closed]:zoom-out-100
                  duration-200"
              >
                <DialogHeader>
                  <DialogTitle className="text-white">Get in touch</DialogTitle>
                </DialogHeader>
                <div className="mt-2 flex flex-col gap-3">
                  {CONTACTS.map((c) => (
                    <div
                      key={c.email}
                      className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-3"
                    >
                      <img
                        src={c.image}
                        alt={c.name}
                        className="h-12 w-12 shrink-0 rounded-full object-cover"
                      />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="text-sm font-medium text-white">
                          {c.name}
                        </span>
                        <span className="text-[12px] text-white/50">
                          {c.role}
                        </span>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <a
                          href={c.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${c.name} on LinkedIn`}
                          className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5 text-isla-cyan/90 transition-colors hover:border-isla-cyan/40 hover:bg-white/10 hover:text-isla-cyan"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopyEmail(c.email)}
                          aria-label={`Copy ${c.name}'s email`}
                          className={`flex h-8 items-center gap-1.5 rounded-md border px-2 transition-all ${
                            copiedEmail === c.email
                              ? "border-emerald-400/50 bg-emerald-400/10 text-emerald-300"
                              : "border-white/10 bg-white/5 text-isla-cyan/90 hover:border-isla-cyan/40 hover:bg-white/10 hover:text-isla-cyan"
                          }`}
                        >
                          {copiedEmail === c.email ? (
                            <>
                              <Check className="h-4 w-4" />
                              <span className="text-[12px] font-medium">
                                Copied
                              </span>
                            </>
                          ) : (
                            <>
                              <Mail className="h-4 w-4" />
                              <Copy className="h-3 w-3" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
