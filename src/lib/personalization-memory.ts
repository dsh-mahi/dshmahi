export type PersonalizationMemory = {
  active: boolean;
  interestsCsv: string;
  selectedInterests: string[];
  greeting: string | null;
};

let memory: PersonalizationMemory | null = null;

export function getPersonalizationMemory(): PersonalizationMemory | null {
  return memory;
}

export function setPersonalizationMemory(next: PersonalizationMemory) {
  memory = next;
}

export function clearPersonalizationMemory() {
  memory = null;
}

