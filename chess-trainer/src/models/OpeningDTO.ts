interface OpeningDTO {
    id: string | number;
    name: string;
    description: string;
    moveSequence: string[];
    difficulty: string | number;
}

interface DetailedOpeningDTO extends OpeningDTO {
    masterGames: MasterGameDTO[];
}
