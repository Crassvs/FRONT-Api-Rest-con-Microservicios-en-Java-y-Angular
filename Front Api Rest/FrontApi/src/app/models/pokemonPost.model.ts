export interface PokemonPost  {
    id: number | null,
    nombre: string,
    ataque: number,
    defensa: number,
    velocidad: number,
    idTipos: number[],
    idMovimientos: number[],
    idRegiones: number[],
    idEvolucion: number | null

}