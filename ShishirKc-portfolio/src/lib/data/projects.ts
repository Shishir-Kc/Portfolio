export interface Project {
  name: string;
  description: string;
  github: string;
  live?: string;
}

export const projects: Project[] = [
  {
    name: "Vox_Diurna",
    description: "A platform for uploading daily blogs to the internet via a custom blog server.",
    github: "https://github.com/Shishir-Kc/Vox_Diurna",
    live: "https://vox-diurna.pages.dev/"
  },
  {
    name: "Hyper.backend",
    description: "Backend for internal tool to be used by my team members.",
    github: "https://github.com/Krypton-learn/Hyper.backend"
  },
  {
    name: "Aris",
    description: "A prototype operating system built from scratch.",
    github: "https://github.com/Shishir-Kc/Aris"
  },
  {
    name: "Extractro",
    description: "An OCR-based tool that extracts text from various sources with high accuracy.",
    github: "https://github.com/Shishir-Kc/extractro"
  }
];