import { ApiProperty } from "@nestjs/swagger";
import { CalculateNumerologyResult } from "./calculate-numerology-result.dto";
import { NumerologyResultDescriptionDto } from "./numerology-result-description.dto";

export class NumerologyReadingResponseDto {
    @ApiProperty()
    fullName: string;

    @ApiProperty()
    dob: Date;

    @ApiProperty({ type: CalculateNumerologyResult })
    result: CalculateNumerologyResult;

    @ApiProperty({ type: NumerologyResultDescriptionDto })
    description: NumerologyResultDescriptionDto;
}