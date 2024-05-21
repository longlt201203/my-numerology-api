import { Body, Controller, Post } from "@nestjs/common";
import { NumerologyService } from "./numerology.service";
import { ApiTags } from "@nestjs/swagger";
import { NumerologyDto } from "./dto";

@Controller("numerology")
@ApiTags("numerology")
export class NumerologyController {
    constructor(
        private readonly numerologyService: NumerologyService
    ) {}

    @Post('life-path')
    async getLifePath(@Body() dto: NumerologyDto) {
        return { data: this.numerologyService.calculateLifePathNumber(new Date(dto.dob)) };
    } 
}