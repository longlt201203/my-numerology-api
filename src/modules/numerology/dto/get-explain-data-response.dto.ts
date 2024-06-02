import { NumerologyCalculateExplainResponseDto } from "@modules/numerology/dto/numerology-calculate-explain-response.dto";
import { NumerologyExplainResponseDto } from "@modules/numerology/dto/numerology-explain-response.dto";
import { ApiProperty } from "@nestjs/swagger";
import { NumerologyCalculateExplain, NumerologyExplain, NumerologyNumberMeaning } from "@schemas";
import { NumerologyNumberResponseDto } from "./numerology-number-response.dto";

export class GetExplainDataResponseDto {
    @ApiProperty({ type: NumerologyExplainResponseDto, isArray: true })
    explainList: NumerologyExplainResponseDto[];

    @ApiProperty({ type: NumerologyCalculateExplainResponseDto, isArray: true })
    calculateExplainList: NumerologyCalculateExplainResponseDto[];

    @ApiProperty({ type: NumerologyNumberResponseDto, isArray: true })
    numerologyMeaningList: NumerologyNumberResponseDto[];

    static from(explainList: NumerologyExplain[], calculateExplainList: NumerologyCalculateExplain[], numerologyMeaningList: NumerologyNumberMeaning[]): GetExplainDataResponseDto {
        return {
            explainList: NumerologyExplainResponseDto.fromEntities(explainList),
            calculateExplainList: NumerologyCalculateExplainResponseDto.fromEntities(calculateExplainList),
            numerologyMeaningList: NumerologyNumberResponseDto.fromEntities(numerologyMeaningList)
        }
    }
}