import { ApiProperty } from "@nestjs/swagger";
import { NumerologyEntryDescription } from "@schemas";
import { LanguageType } from "@utils";

export class EntryDescriptionResponseDto {
    @ApiProperty({ enum: LanguageType })
    lang: LanguageType;

    @ApiProperty()
    content: string;

    static fromEntity(entity: NumerologyEntryDescription): EntryDescriptionResponseDto {
        return {
            lang: entity.lang,
            content: entity.content
        }
    }
}