import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { NumerologyService } from "./numerology.service";
import { ApiTags } from "@nestjs/swagger";
import { EntryResponseDto, GetEntriesQueryDto, NumerologyRequestDto, NumerologyResponseDto, UpdateOrCreateEntryDto } from "./dto";
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
}