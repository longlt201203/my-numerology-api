import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { NumerologyService } from "./numerology.service";
import { ApiTags } from "@nestjs/swagger";
import { AddEntryDto, EntryResponseDto, GetEntriesQueryDto, ImportEntriesDto, NumerologyRequestDto, NumerologyResponseDto, UpdateEntryDto } from "./dto";
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

    @Post("add-entry")
    @SwaggerApiResponse(EntryResponseDto)
    async addEntry(@Body() dto: AddEntryDto) {
        const entry = await this.numerologyService.addEntry(dto);
        return new ApiResponseDto(EntryResponseDto.fromEntity(entry));
    }

    @Put("update-entry/:id")
    @SwaggerApiResponse(EntryResponseDto)
    async updateEntry(@Param("id") id: string, @Body() dto: UpdateEntryDto) {
        const entry = await this.numerologyService.updateEntry(id, dto);
        return new ApiResponseDto(EntryResponseDto.fromEntity(entry));
    }

    @Get("get-entries")
    @SwaggerApiResponse(EntryResponseDto, { isArray: true })
    async getEntries(@Query() query: GetEntriesQueryDto) {
        const entries = await this.numerologyService.getEntries(query);
        return new ApiResponseDto(entries.map((item) => EntryResponseDto.fromEntity(item)));
    }

    @Post("import")
    @SwaggerApiResponse(EntryResponseDto, { isArray: true })
    async importEntries(@Body() dto: ImportEntriesDto) {
        const entries = await this.numerologyService.importEntries(dto);
        return new ApiResponseDto(entries.map((item) => EntryResponseDto.fromEntity(item)), null, "Import entries successfully!");
    }
}