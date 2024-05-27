import { ApiProperty } from "@nestjs/swagger";
import { LanguageType, NumerologyEntryType } from "@utils";
import { IsEnum, IsOptional } from "class-validator";

export class GetEntriesQueryDto {
    @ApiProperty({ required: false, enum: NumerologyEntryType })
    @IsEnum(NumerologyEntryType)
    @IsOptional()
    type?: NumerologyEntryType;

    @ApiProperty({ required: false, enum: LanguageType })
    @IsEnum(LanguageType)
    @IsOptional()
    lang?: LanguageType;
}