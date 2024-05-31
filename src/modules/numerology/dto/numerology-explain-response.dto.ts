import { ApiProperty } from "@nestjs/swagger";
import { NumerologyExplain } from "@schemas";
import { NumerologyExplainType } from "@utils";

export class NumerologyExplainResponseDto {
    @ApiProperty({ enum: NumerologyExplainType })
    type: NumerologyExplainType;

    @ApiProperty()
    lang: string;

    @ApiProperty()
    content: string;

    static fromEntity(entity: NumerologyExplain): NumerologyExplainResponseDto {
        return {
            type: entity.type,
            lang: entity.lang.code,
            content: entity.content
        }
    }

    static fromEntities(entities: NumerologyExplain[]) {
        return entities.map(this.fromEntity);
    }
}