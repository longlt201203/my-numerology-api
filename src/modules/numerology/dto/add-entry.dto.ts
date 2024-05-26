import { ApiProperty } from "@nestjs/swagger";
import { NumerologyEntryTypeEnum } from "@utils";
import { EntryDescriptionRequestDto } from "./entry-description-request.dto";
import { IsEnum, IsNumber, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class AddEntryDto {
    @ApiProperty({ enum: NumerologyEntryTypeEnum })
    @IsEnum(NumerologyEntryTypeEnum)
    type: NumerologyEntryTypeEnum;

    @ApiProperty()
    @IsNumber()
    number: number;

    @ApiProperty({ type: [EntryDescriptionRequestDto] })
    @Type(() => EntryDescriptionRequestDto)
    @ValidateNested({ each: true })
    description: EntryDescriptionRequestDto[];
}