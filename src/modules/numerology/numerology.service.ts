import { Injectable } from "@nestjs/common";
import { AddEntryDto, GetEntriesQueryDto, ImportEntriesDto, NumerologyRequestDto, NumerologyResponseDto, UpdateEntryDto } from "./dto";
import { InjectModel } from "@nestjs/mongoose";
import { NumerologyEntry, NumerologyEntryDescription } from "@schemas";
import { Model, Types } from "mongoose";
import { NumerologyNotFoundApiError } from "./errors";

@Injectable()
export class NumerologyService {
    constructor(
        @InjectModel(NumerologyEntry.name)
        private readonly numerologyEntryModel: Model<NumerologyEntry>,
        @InjectModel(NumerologyEntryDescription.name)
        private readonly numerologyEntryDescriptionModel: Model<NumerologyEntryDescription>
    ) {}

    private readonly charMap = {
        a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 1,
        k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9, s: 1, t: 2,
        u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
    } as const;
    private readonly vowels = ['a', 'i', 'u', 'e', 'o', 'y'];

    recursionDigitSum(n: number): number {
        let s = Array.from(n.toString(), (item) => parseInt(item));
        const sum = s.reduce((prev, curr) => prev+curr);
        return (sum < 10 || sum == 11 || sum == 22 || sum == 33) ? sum : this.recursionDigitSum(sum);
    }

    calculateLifePathNumber(dob: Date) {
        const daySum = this.recursionDigitSum(dob.getDate());
        const monthSum = this.recursionDigitSum(dob.getMonth()+1);
        const yearSum = this.recursionDigitSum(dob.getFullYear());
        const lifePathNumber = this.recursionDigitSum(daySum+monthSum+yearSum);
        return lifePathNumber;
    }

    calculateSoulUrgeNumber(fullName: string) {
        let sum = 0;
        for (const c of fullName) {
            if (this.vowels.includes(c)) {
                sum += this.charMap[c];
            }
        }
        return this.recursionDigitSum(sum);
    }

    calculateExpressionNumber(fullName: string) {
        let sum = 0;
        for (const part of fullName.split(" ")) {
            let tmp = 0;
            for (const c of part) {
                tmp += this.charMap[c];
            }
            sum += this.recursionDigitSum(tmp);
        }
        
        return this.recursionDigitSum(sum);
    }

    calculatePersonalityNumber(fullName: string) {
        let sum = 0;
        for (const c of fullName) {
            if (!this.vowels.includes(c) && this.charMap[c]) {
                sum += this.charMap[c];
            }
        }
        return this.recursionDigitSum(sum);
    }

    calculateBirthdayNumber(dob: Date) {
        return this.recursionDigitSum(dob.getDate());
    }

    calculateMaturityNumber(lifePathNumber: number, expressionNumber: number) {
        return this.recursionDigitSum(lifePathNumber+expressionNumber);
    }

    calculateBalanceNumber(fullName: string) {
        let sum = 0;
        for (const part of fullName.split(" ")) {
            sum += this.charMap[part.charAt(0)];
        }
        return this.recursionDigitSum(sum);
    }

    calculateChallengeNumbers(dob: Date) {
        const daySum = this.recursionDigitSum(dob.getDate());
        const monthSum = this.recursionDigitSum(dob.getMonth()+1);
        const yearSum = this.recursionDigitSum(dob.getFullYear());

        const first = Math.abs(daySum-monthSum);
        const second = Math.abs(daySum-yearSum);
        const third = Math.abs(first-second);
        return [first, second, third];
    }

    calculatePinnacleNumbers(dob: Date) {
        const daySum = this.recursionDigitSum(dob.getDate());
        const monthSum = this.recursionDigitSum(dob.getMonth()+1);
        const yearSum = this.recursionDigitSum(dob.getFullYear());

        const first = this.recursionDigitSum(daySum+monthSum);
        const second = this.recursionDigitSum(daySum+yearSum);
        const third = this.recursionDigitSum(first+second);
        const fourth = this.recursionDigitSum(monthSum+yearSum);

        return [first, second, third, fourth]
    }

    calculateHiddenPassionNumber(fullName: string) {
        const counter = {};
        let max = 0;
        const hiddenPassionNumbers: number[] = [];
        for (const c of fullName) {
            if (this.charMap[c]) {
                if (counter[this.charMap[c]]) {
                    counter[this.charMap[c]]++;
                } else {
                    counter[this.charMap[c]] = 1;
                }

                if (counter[this.charMap[c]] > max) {
                    max = counter[this.charMap[c]];
                };
            }
        }
        for (const k in counter) {
            if (counter[k] == max) {
                hiddenPassionNumbers.push(parseInt(k));
            }
        }
        return hiddenPassionNumbers;
    }
    
    calculateCornerstoneNumber(fullName: string) {
        const firstName = fullName.split(" ").pop();
        return this.charMap[firstName.charAt(0)];
    }

    calculateCapstoneNumber(fullName: string) {
        const firstName = fullName.split(" ").pop();
        return this.charMap[firstName.charAt(firstName.length-1)];
    }

    calculateFirstVowelNumber(fullName: string) {
        const firstName = fullName.split(" ").pop();
        for (const c of firstName) {
            if (this.vowels.includes(c)) {
                return this.charMap[c];
            }
        }
    }

    calculate(dto: NumerologyRequestDto): NumerologyResponseDto {
        const dob = new Date(dto.dob);
        const fullName = dto.fullName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '');
        const lifePathNumber = this.calculateLifePathNumber(dob);
        const expressionNumber = this.calculateExpressionNumber(fullName);

        return {
            lifePathNumber: lifePathNumber,
            soulUrgeNumber: this.calculateSoulUrgeNumber(fullName),
            expressionNumber: expressionNumber,
            personalityNumber: this.calculatePersonalityNumber(fullName),
            birthdayNumber: this.calculateBirthdayNumber(dob),
            maturityNumber: this.calculateMaturityNumber(lifePathNumber, expressionNumber),
            balanceNumber: this.calculateBalanceNumber(fullName),
            challengeNumbers: this.calculateChallengeNumbers(dob),
            pinnacleNumbers: this.calculatePinnacleNumbers(dob),
            hiddenPassionNumbers: this.calculateHiddenPassionNumber(fullName),
            cornerstoneNumber: this.calculateCornerstoneNumber(fullName),
            capstoneNumber: this.calculateCapstoneNumber(fullName),
            firstVowelNumber: this.calculateFirstVowelNumber(fullName)
        }
    }

    async addEntry(dto: AddEntryDto) {
        let entry = new this.numerologyEntryModel({
            type: dto.type,
            number: dto.number,
            lang: dto.lang,
            content: dto.content,
            // description: dto.description.map((item) => new this.numerologyEntryDescriptionModel({
            //     content: item.content,
            //     lang: item.lang
            // }))
        });
        entry = await entry.save();
        return entry;
    }

    async findEntry(id: string) {
        if (!Types.ObjectId.isValid(id)) throw new NumerologyNotFoundApiError(id);
        const entry = await this.numerologyEntryModel.findById(id);
        if (!entry) throw new NumerologyNotFoundApiError(id);
        return entry;
    }

    async updateEntry(id: string, dto: UpdateEntryDto) {
        let entry = await this.findEntry(id);
        entry.type = dto.type;
        entry.number = dto.number;
        entry.lang = dto.lang;
        entry.content = dto.content;
        // entry.description = dto.description.map((item) => new this.numerologyEntryDescriptionModel({
        //     content: item.content,
        //     lang: item.lang
        // }));
        entry = await entry.save();
        return entry;
    }

    async getEntries(query: GetEntriesQueryDto) {
        const findQuery: any = {};
        if (query.type) findQuery.type = query.type;
        if (query.lang) findQuery.lang = query.lang;
        let entries = await this.numerologyEntryModel.find(findQuery, null, {
            sort: {
                type: 1,
                number: 1
            }
        });
        return entries;
    }

    async importEntries(dto: ImportEntriesDto) {
        let entries = [];
        for (const item of dto.data) {
            entries.push(new this.numerologyEntryModel({
                type: item.type,
                number: item.number,
                lang: item.lang,
                content: item.content,
                // description: item.description.map((subitem) => new this.numerologyEntryDescriptionModel({
                //     lang: subitem.lang,
                //     content: subitem.content
                // }))
            }));
        }
        await this.numerologyEntryModel.deleteMany();
        entries = await this.numerologyEntryModel.insertMany(entries);
        return entries;
    }
}