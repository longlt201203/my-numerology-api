import { Injectable } from "@nestjs/common";
import { CalculateNumerologyResult, GetEntriesQueryDto, GetExplainDataQueryDto, NumerologyRequestDto, SaveExplainDataDto, UpdateOrCreateCalculateExplainDto, UpdateOrCreateEntryDto, UpdateOrCreateExplainDto } from "./dto";
import { InjectModel } from "@nestjs/mongoose";
import { NumerologyCalculateExplain, NumerologyEntry, NumerologyExplain, NumerologyNumberMeaning } from "@schemas";
import { Model, Types } from "mongoose";
import { NumerologyNotFoundApiError } from "./errors";
import { LanguageService } from "@modules/language";

@Injectable()
export class NumerologyService {
    constructor(
        @InjectModel(NumerologyEntry.name)
        private readonly numerologyEntryModel: Model<NumerologyEntry>,
        @InjectModel(NumerologyExplain.name)
        private readonly numerologyExplainModel: Model<NumerologyExplain>,
        @InjectModel(NumerologyCalculateExplain.name)
        private readonly numerologyCalculateExplainModel: Model<NumerologyCalculateExplain>,
        @InjectModel(NumerologyNumberMeaning.name)
        private readonly numerologyNumberMeaningModel: Model<NumerologyNumberMeaning>,
        private readonly languageService: LanguageService
    ) { }

    private readonly charMap = {
        a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 1,
        k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9, s: 1, t: 2,
        u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
    } as const;
    private readonly vowels = ['a', 'i', 'u', 'e', 'o', 'y'];

    recursionDigitSum(n: number): number {
        let s = Array.from(n.toString(), (item) => parseInt(item));
        const sum = s.reduce((prev, curr) => prev + curr);
        return (sum < 10 || sum == 11 || sum == 22 || sum == 33) ? sum : this.recursionDigitSum(sum);
    }

    calculateLifePathNumber(dob: Date) {
        const daySum = this.recursionDigitSum(dob.getDate());
        const monthSum = this.recursionDigitSum(dob.getMonth() + 1);
        const yearSum = this.recursionDigitSum(dob.getFullYear());
        const lifePathNumber = this.recursionDigitSum(daySum + monthSum + yearSum);
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
        return this.recursionDigitSum(lifePathNumber + expressionNumber);
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
        const monthSum = this.recursionDigitSum(dob.getMonth() + 1);
        const yearSum = this.recursionDigitSum(dob.getFullYear());

        const first = Math.abs(daySum - monthSum);
        const second = Math.abs(daySum - yearSum);
        const third = Math.abs(first - second);
        return [first, second, third];
    }

    calculatePinnacleNumbers(dob: Date) {
        const daySum = this.recursionDigitSum(dob.getDate());
        const monthSum = this.recursionDigitSum(dob.getMonth() + 1);
        const yearSum = this.recursionDigitSum(dob.getFullYear());

        const first = this.recursionDigitSum(daySum + monthSum);
        const second = this.recursionDigitSum(daySum + yearSum);
        const third = this.recursionDigitSum(first + second);
        const fourth = this.recursionDigitSum(monthSum + yearSum);

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
        return this.charMap[firstName.charAt(firstName.length - 1)];
    }

    calculateFirstVowelNumber(fullName: string) {
        const firstName = fullName.split(" ").pop();
        for (const c of firstName) {
            if (this.vowels.includes(c)) {
                return this.charMap[c];
            }
        }
    }

    calculate(dto: NumerologyRequestDto): CalculateNumerologyResult {
        const dob = new Date(dto.dob);
        const fullName = dto.fullName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '');
        const lifePathNumber = this.calculateLifePathNumber(dob);
        const expressionNumber = this.calculateExpressionNumber(fullName);

        return {
            lifePath: lifePathNumber,
            soulUrge: this.calculateSoulUrgeNumber(fullName),
            expression: expressionNumber,
            personality: this.calculatePersonalityNumber(fullName),
            birthday: this.calculateBirthdayNumber(dob),
            maturity: this.calculateMaturityNumber(lifePathNumber, expressionNumber),
            balance: this.calculateBalanceNumber(fullName),
            challenge: this.calculateChallengeNumbers(dob),
            pinnacle: this.calculatePinnacleNumbers(dob),
            hiddenPassion: this.calculateHiddenPassionNumber(fullName),
            cornerstone: this.calculateCornerstoneNumber(fullName),
            capstone: this.calculateCapstoneNumber(fullName),
            firstVowel: this.calculateFirstVowelNumber(fullName)
        }
    }

    async readResult(result: CalculateNumerologyResult) {

    }

    async readNumerology(dto: NumerologyRequestDto) {
        const result = this.calculate(dto);
    }

    async findEntry(id: string) {
        if (!Types.ObjectId.isValid(id)) throw new NumerologyNotFoundApiError(id);
        const entry = await this.numerologyEntryModel.findById(id);
        if (!entry) throw new NumerologyNotFoundApiError(id);
        return entry;
    }

    async updateOrCreateEntry(dto: UpdateOrCreateEntryDto) {
        const language = await this.languageService.getOneByCode(dto.lang);

        let entry = await this.numerologyEntryModel.findOne({ type: dto.type, lang: language, number: dto.number })

        if (entry) {
            entry.content = dto.content;
            entry.summary = dto.summary;
        } else {
            entry = new this.numerologyEntryModel({
                type: dto.type,
                number: dto.number,
                lang: language,
                content: dto.content,
                summary: dto.summary
            });
        }

        entry = await entry.save();
        return await entry.populate("lang");
    }

    async getEntries(query: GetEntriesQueryDto) {
        const findQuery: any = {};
        const findLangQuery: any = {};
        if (query.type) findQuery.type = query.type;
        if (query.lang) findLangQuery.code = query.lang;
        let entries = await this.numerologyEntryModel
            .find(findQuery, null, {
                sort: {
                    type: 1,
                    number: 1
                }
            })
            .populate({ path: "lang", match: findLangQuery });
        return entries.filter(item => item.lang != null);
    }

    async updateOrCreateExplain(dto: UpdateOrCreateExplainDto) {
        const language = await this.languageService.getOneByCode(dto.lang);

        let entity = await this.numerologyExplainModel.findOne({
            type: dto.type,
            lang: language
        });

        if (entity) {
            entity.content = dto.content;
        } else {
            entity = new this.numerologyExplainModel({
                type: dto.type,
                lang: language,
                content: dto.content
            });
        }

        entity = await entity.save();
        return entity;
    }

    async updateOrCreateCalculateExplain(dto: UpdateOrCreateCalculateExplainDto) {
        const language = await this.languageService.getOneByCode(dto.lang);

        let entity = await this.numerologyCalculateExplainModel.findOne({
            type: dto.type,
            lang: language
        });

        if (entity) {
            entity.content = dto.content;
        } else {
            entity = new this.numerologyCalculateExplainModel({
                type: dto.type,
                lang: language,
                content: dto.content
            });
        }

        entity = await entity.save();
        return entity;
    }

    async saveExplainData(dto: SaveExplainDataDto) {
        const language = await this.languageService.getOneByCode(dto.lang);

        const explainTypeList = dto.explainList.map(item => item.type);
        const calculateExplainTypeList = dto.calculateExplainList.map(item => item.type);

        const [
            explainList,
            calculateExplainList
        ] = await Promise.all([
            this.numerologyExplainModel.find({ lang: language, type: { $in: explainTypeList } }),
            this.numerologyCalculateExplainModel.find({ lang: language, type: { $in: calculateExplainTypeList } })
        ]);

        let newExplainList = [];
        for (const item of dto.explainList) {
            let entity = explainList.find(element => element.type == item.type);
            if (!entity) entity = new this.numerologyExplainModel({ lang: language, type: item.type });
            entity.content = item.content;
            newExplainList.push(entity);
        }

        let newCalculateExplainList = [];
        for (const item of dto.calculateExplainList) {
            let entity = calculateExplainList.find(element => element.type == item.type);
            if (!entity) entity = new this.numerologyCalculateExplainModel({ lang: language, type: item.type });
            entity.content = item.content;
            newCalculateExplainList.push(entity);
        }

        await Promise.all([
            this.numerologyExplainModel.bulkSave(newExplainList),
            this.numerologyCalculateExplainModel.bulkSave(newCalculateExplainList),
        ]);
    }

    async getExplainData(query: GetExplainDataQueryDto) {
        const language = await this.languageService.getOneByCode(query.lang);

        return await Promise.all([
            this.numerologyExplainModel.find({ lang: language }),
            this.numerologyCalculateExplainModel.find({ lang: language }),
            this.numerologyNumberMeaningModel.find({ lang: language })
        ]);
    }
}