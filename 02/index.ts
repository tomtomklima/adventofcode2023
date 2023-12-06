import {readFileSync} from 'fs';

function getRealData(): Array<string> {
    const file = readFileSync('./02/input.txt', 'utf-8');

    return file.split('\n').filter(function(item) {
        return item != '';
    });
}

type Lot = [red: number, green: number, blue: number];
type Game = Array<Lot>;

function parseData(data: Array<string>): Array<Game> {
    let gamesParsedData: Game[] = [];
    for (let gameData of data) {
        let [index, data] = gameData.split(': ');

        gamesParsedData[parseInt(index.split(' ')[1])] = parseGame(data);
    }
    
    return gamesParsedData;
}

function parseGame(lotData: string): Game {
    let lotsData = lotData.split('; ').map((lot: string) => lot.split(', '));
    let lots: Array<Lot> = [];
    lotsData.map((lotData: Array<string>) => {
        let lot:Lot = [0, 0, 0];
        for (let lotSingleData of lotData) {            
            if (lotSingleData.endsWith('red')) {
                lot[0] = parseInt(lotSingleData.split(' ')[0]);
            }
            if (lotSingleData.endsWith('green')) {
                lot[1] = parseInt(lotSingleData.split(' ')[0]);
            }
            if (lotSingleData.endsWith('blue')) {
                lot[2] = parseInt(lotSingleData.split(' ')[0]);
            }
        }
        lots.push(lot);
    });

    return lots;
}

const testGames: string[] = [
    'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
    'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
    'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
    'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
    'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
]

function countGames(data: Array<Game>): number {

    let count = 0;

    data.forEach((game: Game, index: number) => {
        if (isValidGame(game)) {
            count += index;
        }
    });

    return count; 
}

function countGamesMinimal(data: Array<Game>): number {

    let count = 0;
    data.forEach((game: Game) => {
        count += getGameMinimal(game).reduce((a: number, b: number) => a * b);
    });

    return count; 
}

function getGameMinimal(game: Game): Lot {
    let gameMinimal: Lot = [0, 0, 0];
    game.forEach((lot: Lot) => {
        gameMinimal[0] = Math.max(gameMinimal[0], lot[0]);
        gameMinimal[1] = Math.max(gameMinimal[1], lot[1]);
        gameMinimal[2] = Math.max(gameMinimal[2], lot[2]);
    });
    
    return gameMinimal;
}

function isValidGame(game: Game) {
    for (const lot of game) {
        if (lot[0] >  12 || lot[1] > 13 || lot[2] > 14) {
            return false;
        }
    }

    return true;
}

function main() {
    console.log(countGames(parseData(testGames)));
    console.log(countGames(parseData(getRealData())));
    console.log(countGamesMinimal(parseData(testGames)));
    console.log(countGamesMinimal(parseData(getRealData())));
}

main();
