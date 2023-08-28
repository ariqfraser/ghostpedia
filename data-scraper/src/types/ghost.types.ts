export interface Ghost {
    name: string;
    evidence: Evidence;
    speed: number[];
    sanity: number;
    behaviour: Behaviour[];
}

export interface Behaviour {
    title: string;
    info: string[];
}

interface Evidence {
    emf: boolean;
    dots: boolean;
    uv: boolean;
    freezing: boolean;
    orbs: boolean;
    writing: boolean;
    box: boolean;
    [key: string]: boolean;
}
