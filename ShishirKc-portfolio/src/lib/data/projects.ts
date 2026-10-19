export interface Project {
  name: string;
  description: string;
  github: string;
  live?: string;
  liveLabel?: string;
}

export const projects: Project[] = [
  {
    name: "IndexDB",
    description: "A lightweight indexed database built from scratch. Currently under development.",
    github: "https://github.com/Shishir-Kc/IndexDB"
  },
  {
    name: "Koushin",
    description: "A Python package published on PyPI.",
    github: "https://github.com/Shishir-Kc/Koushin",
    live: "https://pypi.org/project/koushin/",
    liveLabel: "PyPI"
  },
  {
    name: "Spark",
    description: "An AI model served through the Helios platform.",
    github: "https://github.com/Helios-4U/Spark",
    live: "https://helios.shishirkhatri.com.np/models/spark"
  },
  {
    name: "Ember",
    description: "A tokenizer built for the Helios platform.",
    github: "https://github.com/Helios-4U/Ember",
    live: "https://helios.shishirkhatri.com.np/tokenizers"
  },
  {
    name: "Blogs",
    description: "A platform for uploading daily blogs to the internet via a custom blog server.",
    github: "https://github.com/Shishir-Kc/Vox_Diurna",
    live: "https://vox-diurna.pages.dev/"
  },
  {
    name: "A.R.I.A",
    description: "A FastAPI-based home server application with health monitoring, email automation, and AI chat capabilities.",
    github: "https://github.com/Shishir-Kc/Elysium",
    live: "https://elysium.shishirkhatri.com.np/"
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