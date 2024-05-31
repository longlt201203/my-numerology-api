import { ApiProperty } from "@nestjs/swagger";
import { NumerologyCalculateExplain } from "@schemas";
import { NumerologyEntryType } from "@utils";

export class NumerologyCalculateExplainResponseDto {
    @ApiProperty({ enum: NumerologyEntryType })
    type: NumerologyEntryType;

    @ApiProperty()
    lang: string;

    @ApiProperty()
    content: string;

    static fromEntity(entity: NumerologyCalculateExplain): NumerologyCalculateExplainResponseDto {
        return {
            type: entity.type,
            lang: entity.lang.code,
            content: entity.content
        }
    }

    static fromEntities(entities: NumerologyCalculateExplain[]) {
        return entities.map(this.fromEntity);
    }
}