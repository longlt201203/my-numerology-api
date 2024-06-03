import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateOrCreateNumberExplainDto {
    @ApiProperty()
    @IsNumber()
    number: number;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lang: string;

    @ApiProperty()
    @IsString()
    content: string;
}