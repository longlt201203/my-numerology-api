import { CreateLanguageDto, LanguageResponseDto } from "./dto";
import { LanguageService } from "./language.service";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("language")
@ApiTags("language")
export class LanguageController {
    constructor(
        private readonly languageService: LanguageService
    ) {}

    @Post()
    async create(@Body() dto: CreateLanguageDto) {
        const language = await this.languageService.createOne(dto);
        return LanguageResponseDto.fromEntity(language);
    }

    @Get()
    async get() {
        const languages = await this.languageService.getAll();
        return LanguageResponseDto.fromEntities(languages);
    }
}