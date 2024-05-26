import { NumerologyEntryTypeEnum } from "@utils";
import { EntryDescriptionResponseDto } from "./entry-description-response.dto";
import { NumerologyEntry } from "@schemas";
import { ApiProperty } from "@nestjs/swagger";

export class EntryResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty({ enum: NumerologyEntryTypeEnum })
    type: NumerologyEntryTypeEnum;

    @ApiProperty()
    number: number;

    @ApiProperty({ type: [EntryDescriptionResponseDto] })
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