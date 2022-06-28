interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  createdAt: number;
  status: string;
}

export const seedData: SeedData = {
  entries: [
    {
      description:
        "Pendiente: Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description:
        "En progreso: It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      status: "in progress",
      createdAt: Date.now(),
    },
    {
      description:
        "Terminada: There are many variations of passages of Lorem Ipsum available.",
      status: "finished",
      createdAt: Date.now(),
    },
  ],
};
