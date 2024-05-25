import { NumerologyEntryTypeEnum } from "@utils";
import { EntryDescriptionResponseDto } from "./entry-description-response.dto";
import { NumerologyEntry } from "@schemas";

export class EntryResponseDto {
    id: string;
    type: NumerologyEntryTypeEnum;
    number: number;
    description: EntryDescriptionResponseDto[];

    static fromEntity(entity: NumerologyEntry): EntryResponseDto {
        return {
            id: entity._id,
            type: entity.type,
            number: entity.number,
            description: entity.description.map((item) => EntryDescriptionResponseDto.fromEntity(item))
        }
    }
}