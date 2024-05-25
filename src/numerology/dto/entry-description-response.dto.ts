import { NumerologyEntryDescription } from "@schemas";
import { LanguageType } from "@utils";

export class EntryDescriptionResponseDto {
    lang: LanguageType;
    content: string;

    static fromEntity(entity: NumerologyEntryDescription): EntryDescriptionResponseDto {
        return {
            lang: entity.lang,
            content: entity.content
        }
    }
}