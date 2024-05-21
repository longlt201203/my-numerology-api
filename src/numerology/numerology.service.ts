import { Injectable } from "@nestjs/common";
import unidecode from "unidecode";

@Injectable()
export class NumerologyService {
    recursionDigitSum(n: number) {
        let s = Array.from(n.toString(), (item) => parseInt(item));
        const sum = s.reduce((prev, curr) => prev+curr);
        return (sum < 10 || sum == 11 || sum == 22 || sum == 33) ? sum : this.recursionDigitSum(sum);
    }

    calculateLifePathNumber(dob: Date) {
        const daySum = this.recursionDigitSum(dob.getDate());
        const monthSum = this.recursionDigitSum(dob.getMonth()+1);
        const yearSum = this.recursionDigitSum(dob.getFullYear());
        const resultNumber = this.recursionDigitSum(daySum+monthSum+yearSum);
        return resultNumber;
    }

    calculateSoulUrgeNumber(fullName: string) {
        const charMap = {
            a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10,
            k: 11, l: 12, m: 13, n: 14, o: 15, p: 16, q: 17, r: 18, s: 19, t: 20,
            u: 21, v: 22, w: 23, x: 24, y: 25, z: 26
        };

        let sum = 0;
        unidecode(fullName.toLowerCase())
            .split('')
            .forEach((item) => {
                if (charMap[item]) sum += charMap[item];
            });
        
        return this.recursionDigitSum(sum);
    }

    calculateExpressionNumber(fullName: string) {
        
    }
}