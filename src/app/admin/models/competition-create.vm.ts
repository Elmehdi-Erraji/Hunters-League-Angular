export interface CompetitionCreateVM {
  code: string;
  location: string;
  date: string; // ISO string format for datetime-local input
  speciesType: string; // Corresponds to SpeciesType enum
  minParticipants: number;
  maxParticipants: number;
  openRegistration?: boolean;
}
