import { ApiProperty } from "@nestjs/swagger";
import { LanguageType } from "@utils";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class EntryDescriptionRequestDto {
    @ApiProperty({ enum: LanguageType })
    @IsEnum(LanguageType)
    lang: LanguageType;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;
}