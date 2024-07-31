import { Pothos } from "./pothos.model";

export interface PothosDTO extends Omit<Pothos, 'id'> {}
