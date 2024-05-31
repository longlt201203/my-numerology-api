import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class EntryDescriptionRequestDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lang: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;
}