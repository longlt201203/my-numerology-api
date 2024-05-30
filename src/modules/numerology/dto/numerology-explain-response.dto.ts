import { NumerologyExplain } from "@schemas";
import { NumerologyExplainType } from "@utils";

export class NumerologyExplainResponseDto {
    type: NumerologyExplainType;
    lang: string;
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