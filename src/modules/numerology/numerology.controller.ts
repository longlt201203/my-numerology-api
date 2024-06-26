import { Body, Controller, Get, Post, Put, Query } from "@nestjs/common";
import { NumerologyService } from "./numerology.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CalculateNumerologyResult, EntryResponseDto, GetEntriesQueryDto, GetExplainDataQueryDto, GetExplainDataResponseDto, NumerologyCalculateExplainResponseDto, NumerologyExplainResponseDto, NumerologyNumberResponseDto, NumerologyReadingResponseDto, NumerologyRequestDto, SaveExplainDataDto, UpdateOrCreateCalculateExplainDto, UpdateOrCreateEntryDto, UpdateOrCreateExplainDto, UpdateOrCreateNumberExplainDto } from "./dto";
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
    @SwaggerApiResponse(CalculateNumerologyResult)
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

    @Put("update-or-create-number-explain")
    async updateOrCreateNumberExplain(@Body() dto: UpdateOrCreateNumberExplainDto) {
        const entity = await this.numerologyService.updateOrCreateNumberExplain(dto);
        return new ApiResponseDto(NumerologyNumberResponseDto.fromEntity(entity));
    }

    @Get("explain-data")
    @SkipGuard()
    @SwaggerApiResponse(GetExplainDataResponseDto)
    async getExplainData(@Query() query: GetExplainDataQueryDto) {
        const data = await this.numerologyService.getExplainData(query);
        return new ApiResponseDto(GetExplainDataResponseDto.from(data[0], data[1], data[2]));
    }

    @Put("save-explain-data")
    @ApiBearerAuth()
    async saveExplainData(@Body() dto: SaveExplainDataDto) {
        await this.numerologyService.saveExplainData(dto);
        return new ApiResponseDto(null, null, "Update successfully!");
    }
}