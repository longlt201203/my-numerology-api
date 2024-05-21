import { Injectable } from "@nestjs/common";

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
}