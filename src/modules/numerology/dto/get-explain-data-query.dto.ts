import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class GetExplainDataQueryDto {
    @ApiProperty({ description: "Language Code" })
    @IsString()
    @IsNotEmpty()
    lang: string;
}