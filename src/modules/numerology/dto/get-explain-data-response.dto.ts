import { NumerologyCalculateExplainResponseDto } from "@modules/numerology/dto/numerology-calculate-explain-response.dto";
import { NumerologyExplainResponseDto } from "@modules/numerology/dto/numerology-explain-response.dto";
import { NumerologyCalculateExplain, NumerologyExplain } from "@schemas";

export class GetExplainDataResponseDto {
    explainList: NumerologyExplainResponseDto[];
    calculateExplainList: NumerologyCalculateExplainResponseDto[];

    static from(explainList: NumerologyExplain[], calculateExplainList: NumerologyCalculateExplain[]): GetExplainDataResponseDto {
        return {
            explainList: NumerologyExplainResponseDto.fromEntities(explainList),
            calculateExplainList: NumerologyCalculateExplainResponseDto.fromEntities(calculateExplainList)
        }
    }
}