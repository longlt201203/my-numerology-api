import { ApiProperty } from "@nestjs/swagger";
import { LanguageType, NumerologyEntryType } from "@utils";
import { EntryDescriptionRequestDto } from "./entry-description-request.dto";
import { IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class AddEntryDto {
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

    // @ApiProperty({ type: [EntryDescriptionRequestDto] })
    // @Type(() => EntryDescriptionRequestDto)
    // @ValidateNested({ each: true })
    // description: EntryDescriptionRequestDto[];
}