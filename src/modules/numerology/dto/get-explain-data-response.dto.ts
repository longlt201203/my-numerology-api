import { NumerologyCalculateExplainResponseDto } from "@modules/numerology/dto/numerology-calculate-explain-response.dto";
import { NumerologyExplainResponseDto } from "@modules/numerology/dto/numerology-explain-response.dto";
import { ApiProperty } from "@nestjs/swagger";
import { NumerologyCalculateExplain, NumerologyExplain } from "@schemas";

export class GetExplainDataResponseDto {
    @ApiProperty({ type: NumerologyExplainResponseDto, isArray: true })
    explainList: NumerologyExplainResponseDto[];

    @ApiProperty({ type: NumerologyCalculateExplainResponseDto, isArray: true })
    calculateExplainList: NumerologyCalculateExplainResponseDto[];

    static from(explainList: NumerologyExplain[], calculateExplainList: NumerologyCalculateExplain[]): GetExplainDataResponseDto {
        return {
            explainList: NumerologyExplainResponseDto.fromEntities(explainList),
            calculateExplainList: NumerologyCalculateExplainResponseDto.fromEntities(calculateExplainList)
        }
    }
}