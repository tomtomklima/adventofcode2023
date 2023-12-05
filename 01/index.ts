import {readFileSync} from 'fs';

function getRealData(): Array<string> {
    const file = readFileSync('./01/input.txt', 'utf-8');

    return file.split('\n').filter(function(item) {
        return item != '';
    });
}

function transformData(data: Array<string>): number {
    const numbers = [
        'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
    ].join('|');
    const reverseNumbers = numbers.split('').reverse().join('');
    
    let result = data.map((word: string): number => {
        let firstNumber = word.match('[0-9]|' + numbers)?.pop()
        let lastNumber = word.split('').reverse().join('').match('[0-9]|' + reverseNumbers)?.pop()?.split('').reverse().join('')
    
        return parseNumbers(firstNumber ?? '', lastNumber ?? '');
    });

    return result.reduce((a: number, b: number) => a + b)
}

function parseNumbers(number1: string, number2: string): number {

    return parseInt([parseNumber(number1), parseNumber(number2)].join(''));
}

function parseNumber(number: string): number {
    const parsedInt: number | typeof NaN = parseInt(number);
    if (!isNaN(parsedInt)) {
        return parsedInt;
    }
    
    const numberMap: {[key: string]: number} = {
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
    };

    return numberMap[number];
}

const testWords: string[] = [
    '1abc2',
    'pqr3stu8vwx',
    'a1b2c3d4e5f',
    'treb7uchet',
]

const testWordsSecond: string[] = [
    'two1nine',
    'eightwothree',
    'abcone2threexyz',
    'xtwone3four',
    '4nineeightseven2',
    'zoneight234',
    '7pqrstsixteen',
]

function main() {
    console.log(transformData(testWords));
    console.log(transformData(testWordsSecond));
    console.log(transformData(getRealData()));
}

main();
