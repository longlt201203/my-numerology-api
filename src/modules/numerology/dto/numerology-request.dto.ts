import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class NumerologyRequestDto {
    @ApiProperty({ type: Date })
    @IsDateString()
    dob: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    fullName: string;
}