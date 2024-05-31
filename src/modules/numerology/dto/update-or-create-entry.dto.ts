import { ApiProperty } from "@nestjs/swagger";
import { NumerologyEntryType } from "@utils";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateOrCreateEntryDto {
    @ApiProperty({ enum: NumerologyEntryType })
    @IsEnum(NumerologyEntryType)
    type: NumerologyEntryType;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lang: string;

    @ApiProperty()
    @IsNumber()
    number: number;

    @ApiProperty()
    @IsString()
    content: string;

    @ApiProperty()
    @IsString()
    summary: string;
}