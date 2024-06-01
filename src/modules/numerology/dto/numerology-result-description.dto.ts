import { ApiProperty } from "@nestjs/swagger";

export class NumerologyResultDescriptionDto {
    @ApiProperty()
    lifePath: string;

    @ApiProperty()
    soulUrge: string;

    @ApiProperty()
    expression: string;

    @ApiProperty()
    personality: string;

    @ApiProperty()
    birthday: string;

    @ApiProperty()
    maturity: string;

    // @ApiProperty()
    // personalYearstring: string;

    // @ApiProperty()
    // personalMonthstring: string;

    @ApiProperty()
    balance: string;

    @ApiProperty({ type: String, isArray: true })
    challenge: string[];

    @ApiProperty({ type: String, isArray: true })
    pinnacle: string[];

    @ApiProperty({ type: String, isArray: true })
    hiddenPassion: string[];

    @ApiProperty()
    cornerstone: string;

    @ApiProperty()
    capstone: string;

    @ApiProperty()
    firstVowel: string;
}