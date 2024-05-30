import { ApiProperty } from "@nestjs/swagger";
import { NumerologyEntryType } from "@utils";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class UpdateOrCreateCalculateExplainDto {
    @ApiProperty({ enum: NumerologyEntryType })
    @IsEnum(NumerologyEntryType)
    type: NumerologyEntryType;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lang: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;
}