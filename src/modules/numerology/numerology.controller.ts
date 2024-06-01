import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { NumerologyService } from "./numerology.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { EntryResponseDto, GetEntriesQueryDto, GetExplainDataQueryDto, GetExplainDataResponseDto, NumerologyCalculateExplainResponseDto, NumerologyExplainResponseDto, NumerologyReadingResponseDto, NumerologyRequestDto, SaveExplainDataDto, UpdateOrCreateCalculateExplainDto, UpdateOrCreateEntryDto, UpdateOrCreateExplainDto } from "./dto";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";
import { SkipGuard } from "@modules/auth";

@Controller("numerology")
@ApiTags("numerology")
export class NumerologyController {
    constructor(
        private readonly numerologyService: NumerologyService
    ) {}

    @Post("calculate")
    @SkipGuard()
    @SwaggerApiResponse(NumerologyReadingResponseDto)
    async calculate(@Body() dto: NumerologyRequestDto) {
        return new ApiResponseDto(this.numerologyService.calculate(dto));
    }

    @Put("update-or-create-entry")
    @ApiBearerAuth()
    @SwaggerApiResponse(EntryResponseDto)
    async updateEntry(@Body() dto: UpdateOrCreateEntryDto) {
        const entry = await this.numerologyService.updateOrCreateEntry(dto);
        return new ApiResponseDto(EntryResponseDto.fromEntity(entry));
    }

    @Get("get-entries")
    @SkipGuard()
    @SwaggerApiResponse(EntryResponseDto, { isArray: true })
    async getEntries(@Query() query: GetEntriesQueryDto) {
        const entries = await this.numerologyService.getEntries(query);
        return new ApiResponseDto(EntryResponseDto.fromEntities(entries));
    }

    @Put("update-or-create-explain")
    @ApiBearerAuth()
    async updateOrCreateExplain(@Body() dto: UpdateOrCreateExplainDto) {
        const entity = await this.numerologyService.updateOrCreateExplain(dto);
        return new ApiResponseDto(NumerologyExplainResponseDto.fromEntity(entity));
    }

    @Put("update-or-create-calculate-explain")
    @ApiBearerAuth()
    async updateOrCreateCalculateExplain(@Body() dto: UpdateOrCreateCalculateExplainDto) {
        const entity = await this.numerologyService.updateOrCreateCalculateExplain(dto);
        return new ApiResponseDto(NumerologyCalculateExplainResponseDto.fromEntity(entity));
    }

    @Get("explain-data")
    @SkipGuard()
    @SwaggerApiResponse(GetExplainDataResponseDto)
    async getExplainData(@Query() query: GetExplainDataQueryDto) {
        const [explainList, calculateExplainList] = await this.numerologyService.getExplainData(query);
        return new ApiResponseDto(GetExplainDataResponseDto.from(explainList, calculateExplainList));
    }

    @Put("save-explain-data")
    @ApiBearerAuth()
    async saveExplainData(@Body() dto: SaveExplainDataDto) {
        await this.numerologyService.saveExplainData(dto);
        return new ApiResponseDto(null, null, "Update successfully!");
    }

    @Put("save-number-meaning-data")
    async saveNumberMeandingData() {
        
    }
}