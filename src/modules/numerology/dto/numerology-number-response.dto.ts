import { NumerologyNumberMeaning } from "@schemas";

export class NumerologyNumberResponseDto {
    number: number;
    lang: string;
    content: string;

    static fromEntity(entity: NumerologyNumberMeaning): NumerologyNumberResponseDto {
        return {
            number: entity.number,
            lang: entity.lang.code,
            content: entity.content
        }
    }

    static fromEntities(entities: NumerologyNumberMeaning[]) {
        return entities.map(this.fromEntity);
    }
}