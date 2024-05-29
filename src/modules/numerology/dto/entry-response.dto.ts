import { LanguageType, NumerologyEntryType } from "@utils";
import { EntryDescriptionResponseDto } from "./entry-description-response.dto";
import { NumerologyEntry } from "@schemas";
import { ApiProperty } from "@nestjs/swagger";

export class EntryResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty({ enum: LanguageType })
    lang: string;

    @ApiProperty({ enum: NumerologyEntryType })
    type: NumerologyEntryType;

    @ApiProperty()
    number: number;

    @ApiProperty()
    content: string;

    @ApiProperty()
    summary: string;

    // @ApiProperty({ type: [EntryDescriptionResponseDto] })
    // description: EntryDescriptionResponseDto[];

    static fromEntity(entity: NumerologyEntry): EntryResponseDto {
        return {
            id: entity._id,
            type: entity.type,
            number: entity.number,
            lang: entity.lang.code,
            content: entity.content,
            summary: entity.summary
            // description: entity.description.map((item) => EntryDescriptionResponseDto.fromEntity(item))
        }
    }

    static fromEntities(entities: NumerologyEntry[]): EntryResponseDto[] {
        return entities.map((item) => this.fromEntity(item));
    }
}