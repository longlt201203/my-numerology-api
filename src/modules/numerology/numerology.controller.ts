import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { NumerologyService } from "./numerology.service";
import { ApiTags } from "@nestjs/swagger";
import { EntryResponseDto, GetEntriesQueryDto, GetExplainDataQueryDto, GetExplainDataResponseDto, NumerologyCalculateExplainResponseDto, NumerologyExplainResponseDto, NumerologyRequestDto, NumerologyResponseDto, SaveExplainDataDto, UpdateOrCreateCalculateExplainDto, UpdateOrCreateEntryDto, UpdateOrCreateExplainDto } from "./dto";
import { ApiResponseDto, SwaggerApiResponse } from "@utils";

@Controller("numerology")
@ApiTags("numerology")
export class NumerologyController {
    constructor(
        private readonly numerologyService: NumerologyService
    ) {}

    @Post("calculate")
    @SwaggerApiResponse(NumerologyResponseDto)
    async calculate(@Body() dto: NumerologyRequestDto) {
        return new ApiResponseDto(this.numerologyService.calculate(dto));
    }

    @Put("update-or-create-entry")
    @SwaggerApiResponse(EntryResponseDto)
    async updateEntry(@Body() dto: UpdateOrCreateEntryDto) {
        const entry = await this.numerologyService.updateOrCreateEntry(dto);
        return new ApiResponseDto(EntryResponseDto.fromEntity(entry));
    }

    @Get("get-entries")
    @SwaggerApiResponse(EntryResponseDto, { isArray: true })
    async getEntries(@Query() query: GetEntriesQueryDto) {
        const entries = await this.numerologyService.getEntries(query);
        return new ApiResponseDto(EntryResponseDto.fromEntities(entries));
    }

    @Put("update-or-create-explain")
    async updateOrCreateExplain(@Body() dto: UpdateOrCreateExplainDto) {
        const entity = await this.numerologyService.updateOrCreateExplain(dto);
        return new ApiResponseDto(NumerologyExplainResponseDto.fromEntity(entity));
    }

    @Put("update-or-create-calculate-explain")
    async updateOrCreateCalculateExplain(@Body() dto: UpdateOrCreateCalculateExplainDto) {
        const entity = await this.numerologyService.updateOrCreateCalculateExplain(dto);
        return new ApiResponseDto(NumerologyCalculateExplainResponseDto.fromEntity(entity));
    }

    @Get("explain-data")
    @SwaggerApiResponse(GetExplainDataResponseDto)
    async getExplainData(@Query() query: GetExplainDataQueryDto) {
        const [explainList, calculateExplainList] = await this.numerologyService.getExplainData(query);
        return new ApiResponseDto(GetExplainDataResponseDto.from(explainList, calculateExplainList));
    }

    @Put("save-explain-data")
    async saveExplainData(@Body() dto: SaveExplainDataDto) {
        await this.numerologyService.saveExplainData(dto);
        return new ApiResponseDto(null, null, "Update successfully!");
    }
}