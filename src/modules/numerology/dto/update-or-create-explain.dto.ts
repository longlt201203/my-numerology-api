import { ApiProperty } from "@nestjs/swagger";
import { NumerologyExplainType } from "@utils";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class UpdateOrCreateExplainDto {
    @ApiProperty({ enum: NumerologyExplainType })
    @IsEnum(NumerologyExplainType)
    type: NumerologyExplainType;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lang: string;

    @ApiProperty()
    @IsString()
    content: string;
}