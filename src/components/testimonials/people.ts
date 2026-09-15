import brendo from "@/assets/testimonials/brendo.png";
import caetano from "@/assets/testimonials/caetano.png";
import sharan from "@/assets/testimonials/sharan.png";
import jessica from "@/assets/testimonials/jessica.png";
import fayner from "@/assets/testimonials/fayner.png";
import adam from "@/assets/testimonials/adam.png";
import igor from "@/assets/testimonials/igor.png";
import rafaela from "@/assets/testimonials/rafaela.png";

export type Person = {
  name: string;
  company?: string;
  image: string;
  linkedin: string;
  hidden?: boolean;
};

export const PEOPLE: Person[] = [
  { name: "Brendo da Luz", company: "CEO @ Cammus", image: brendo, linkedin: "https://www.linkedin.com/in/brendo-da-luz/" },
  { name: "Caetano Vizel", company: "CTO @ Cammus", image: caetano, linkedin: "https://www.linkedin.com/in/caetano-vizel/" },
  { name: "Sharan JM", company: "Founder @ Lumif.ai", image: sharan, linkedin: "https://www.linkedin.com/in/sharanjm/" },
  { name: "Jessica Ilunga", company: "Nonprofit Founder", image: jessica, linkedin: "https://www.linkedin.com/in/jessicailunga/" },
  { name: "Fayner Costa", company: "Founder", image: fayner, linkedin: "https://www.linkedin.com/in/fayner-costa-5711a2b0/" },
  { name: "Adam W. Barney", company: "Founder @ EnergyOS", image: adam, linkedin: "https://www.linkedin.com/in/adamwbarney/" },
  { name: "Rafaela Tiengo", company: "Co-founder & COO @ Easymap", image: rafaela, linkedin: "https://www.linkedin.com/in/rafaelatiengo/" },
  { name: "Igor Mallagoli", company: "Founder", image: igor, linkedin: "https://www.linkedin.com/in/igor-mm/", hidden: true },
];

export type Testimonial = {
  initials: string;
  name: string;
  role: string;
  quote: string;
  tag: string;
  hidden?: boolean;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    initials: "BL",
    name: "Brendo da Luz",
    role: "CEO @ Cammus",
    quote:
      "Isla became part of how we run GTM. Every morning the team wakes up to clear signals and the right next action — no more guessing what to post or who to engage.",
    tag: "Daily GTM signal",
  },
  {
    initials: "RT",
    name: "Rafaela Tiengo",
    role: "Co-founder & COO @ Easymap",
    quote:
      "I've been using this platform to create social media posts, and it's been a game-changer. It's fast, super useful, and the built-in team organization is a real plus.",
    tag: "Team-ready",
  },
  {
    initials: "CV",
    name: "Caetano Vizel",
    role: "CTO @ Cammus",
    quote:
      "We plugged Isla in and it immediately started surfacing warm leads from our LinkedIn activity. It's the closest thing to a 24/7 operator we've ever had.",
    tag: "Warm leads on autopilot",
  },
  {
    initials: "SM",
    name: "Sharan JM",
    role: "Founder @ Lumif.ai · MIT",
    quote:
      "A single LinkedIn post used to take me 1–2 hours. Now I open Isla, pick a direction from the trending feed or one of my recent conversations, structure it quickly, and I'm done in under 15 minutes. It removed the friction.",
    tag: "1–2h → 15 min",
  },
  {
    initials: "JI",
    name: "Jessica Ilunga",
    role: "Founder & CEO @ Ius Stella",
    quote:
      "As a nonprofit founder, Isla is the personal assistant I've always dreamed of. She understands my voice better than I do and anticipates my branding needs before I even articulate them.",
    tag: "Personal assistant",
  },
  {
    initials: "FC",
    name: "Fayner Costa",
    role: "Head of GenAI Digital @ Itaú · MIT",
    quote:
      "I didn't expect Isla to become my unfair advantage. It doesn't just refine ideas — it brings me the right news and topics to write about before I even realize I should. No more creative blocks. No more staring at a blank page. It captures my voice and turns it into relevant, consistent content, super fast.",
    tag: "Unfair advantage",
  },
  {
    initials: "AB",
    name: "Adam W. Barney",
    role: "Coach for Founders & Executives · Harvard",
    quote:
      "Isla literally kills the blank page and keeps me human. The audit shows what to say, Pulse hands me timely angles, and the brand-aware chat drafts in my tone so I'm not editing for hours. I'm consistently shipping 3–5 on-brand posts a week in about 15 minutes each — and I'm not exhausted after.",
    tag: "3–5 posts/week",
  },
  {
    initials: "IM",
    name: "Igor Mallagoli",
    role: "Founder @ Mira · Building in Public",
    quote:
      "Isla turned LinkedIn from a chore into a system. I show up, follow the signals, and the content actually sounds like me. The compounding effect on reach and inbound is real.",
    tag: "Compounding reach",
  },
];
