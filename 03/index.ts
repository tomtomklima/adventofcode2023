import {readFileSync} from 'fs';

function getRealData(): string[] {
    const file = readFileSync('./04/input.txt', 'utf-8');

    return file.split('\n').filter(function(item) {
        return item != '';
    });
}

const testGames: string[] = [
    'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
    'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
    'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1',
    'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83',
    'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36',
    'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11',
]

type Card = {
    index: number,
    win: number[],
    play: number[],
}

function parseData(data: string[]): Card[] {
    return data.map((cardData: string) => {
        let [rawIndex, rawNumbers] = cardData.split(': ');
        let [rawWin, rawPlay] = rawNumbers.split(' | ');

        return {
            index: parseInt(rawIndex.split(' ')[1]),
            win: rawWin.split(' ').filter(Number).map((number: string) => parseInt(number)),
            play: rawPlay.split(' ').filter(Number).map((number: string) => parseInt(number)),
        };
    });
}

function calculatePoints(cards: Card[]): number {
    let points = cards.map((card: Card) => calculateCardPoints(card));
    
    return points.reduce((a: number, b: number) => a + b);
}

function calculateCardPoints(card: Card): number {
    let intersectingNumbers = getIntersectingNumbers(card.win, card.play).length - 1;
    
    if (intersectingNumbers < 0) {
        return 0;
    }

    return 2 ** intersectingNumbers;
}

function calculateMatchingCount(card: Card): number {
    return getIntersectingNumbers(card.win, card.play).length;
}

function getIntersectingNumbers(a1: number[], a2: number[]): number[] {
    return a1.filter((v1) => {
        return a2.find((v2) => v1 == v2);
    });
}

function calculateSumCards(cards: Card[]): number {
    let matchingNumbers = cards.map((card: Card) => calculateMatchingCount(card));
    let copyCards = matchingNumbers.map((matching: number) => [1, matching]);
    
    let totalCards = 0;
    for (let i in copyCards) {
        let copyCard = copyCards[i];
        for (let c = 1; c <= copyCard[1]; c++) {
            // might break when cards will be not in sequence order form one
            let newIndex = parseInt(i) + c;
            if (newIndex in copyCards) {
                copyCards[newIndex][0] += copyCard[0];
            }
        }

        totalCards += copyCard[0];
    }

    return totalCards;
}

function main() {
    let parsedData = parseData(testGames);
    console.log(calculatePoints(parsedData));
    console.log(calculatePoints(parseData(getRealData())));
    console.log(calculateSumCards(parsedData));
    console.log(calculateSumCards(parseData(getRealData())));
}

main();
