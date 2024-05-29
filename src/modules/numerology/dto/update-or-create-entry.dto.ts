import { ApiProperty } from "@nestjs/swagger";
import { LanguageType, NumerologyEntryType } from "@utils";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateOrCreateEntryDto {
    @ApiProperty({ enum: NumerologyEntryType })
    @IsEnum(NumerologyEntryType)
    type: NumerologyEntryType;

    @ApiProperty({ enum: LanguageType })
    @IsEnum(LanguageType)
    lang: LanguageType;

    @ApiProperty()
    @IsNumber()
    number: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    summary: string;
}