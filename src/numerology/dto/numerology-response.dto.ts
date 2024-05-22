import { ApiProperty } from "@nestjs/swagger";

export class NumerologyResponseDto {
    @ApiProperty()
    lifePathNumber: number;

    @ApiProperty()
    soulUrgeNumber: number;

    @ApiProperty()
    expressionNumber: number;

    @ApiProperty()
    personalityNumber: number;

    @ApiProperty()
    birthdayNumber: number;

    @ApiProperty()
    maturityNumber: number;

    // @ApiProperty()
    // personalYearNumber: number;

    // @ApiProperty()
    // personalMonthNumber: number;

    @ApiProperty()
    balanceNumber: number;

    @ApiProperty()
    challengeNumbers: number[];

    @ApiProperty()
    pinnacleNumbers: number[];

    @ApiProperty()
    hiddenPassionNumbers: number[];

    @ApiProperty()
    cornerstoneNumber: number;

    @ApiProperty()
    capstoneNumber: number;

    @ApiProperty()
    firstVowelNumber: number;
}