import { Body, Controller, Post } from "@nestjs/common";
import { NumerologyService } from "./numerology.service";
import { ApiTags } from "@nestjs/swagger";
import { NumerologyRequestDto } from "./dto";
import { ApiResponseDto } from "@utils";

@Controller("numerology")
@ApiTags("numerology")
export class NumerologyController {
    constructor(
        private readonly numerologyService: NumerologyService
    ) {}

    @Post("calculate")
    async calculate(@Body() dto: NumerologyRequestDto) {
        return new ApiResponseDto(this.numerologyService.calculate(dto));
    }
}