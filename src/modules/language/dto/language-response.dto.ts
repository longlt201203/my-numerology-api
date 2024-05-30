import { Language } from "@schemas";

export class LanguageResponseDto {
    code: string;
    name: string;

    static fromEntity(entity: Language): LanguageResponseDto {
        return {
            code: entity.code,
            name: entity.name
        }
    }

    static fromEntities(entities: Language[]): LanguageResponseDto[] {
        return entities.map(this.fromEntity);
    }
}