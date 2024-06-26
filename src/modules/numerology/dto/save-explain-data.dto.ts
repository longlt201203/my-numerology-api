import { UpdateOrCreateCalculateExplainDto } from "@modules/numerology/dto/update-or-create-calculate-explain.dto";
import { UpdateOrCreateExplainDto } from "@modules/numerology/dto/update-or-create-explain.dto";
import { UpdateOrCreateNumberExplainDto } from "@modules/numerology/dto/update-or-create-number-explain.dto";
import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";

class ExplainListItem extends OmitType(UpdateOrCreateExplainDto, ["lang"]) {}

class CalculateExplainListItem extends OmitType(UpdateOrCreateCalculateExplainDto, ["lang"]) {}

class NumberExplainListItem extends OmitType(UpdateOrCreateNumberExplainDto, ["lang"]) {}

export class SaveExplainDataDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lang: string;

    @ApiProperty({ type: ExplainListItem, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => ExplainListItem)
    explainList: ExplainListItem[];

    @ApiProperty({ type: CalculateExplainListItem, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => CalculateExplainListItem)
    calculateExplainList: CalculateExplainListItem[];

    @ApiProperty({ type: NumberExplainListItem, isArray: true })
    @ValidateNested({ each: true })
    @Type(() => NumberExplainListItem)
    numberMeaningList: NumberExplainListItem[];
}