import { SkipGuard } from "@modules/auth";
import { CreateLanguageDto, LanguageResponseDto } from "./dto";
import { LanguageService } from "./language.service";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@Controller("language")
@ApiTags("language")
export class LanguageController {
    constructor(
        private readonly languageService: LanguageService
    ) {}

    @Post()
    @ApiBearerAuth()
    async create(@Body() dto: CreateLanguageDto) {
        const language = await this.languageService.createOne(dto);
        return LanguageResponseDto.fromEntity(language);
    }

    @Get()
    @SkipGuard()
    async get() {
        const languages = await this.languageService.getAll();
        return LanguageResponseDto.fromEntities(languages);
    }
}