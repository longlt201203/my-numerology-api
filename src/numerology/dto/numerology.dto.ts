import { ApiProperty } from "@nestjs/swagger";
import { IsDateString } from "class-validator";

export class NumerologyDto {
    @ApiProperty({ type: Date })
    @IsDateString()
    dob: string;
}