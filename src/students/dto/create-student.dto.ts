import { ApiProperty } from "@nestjs/swagger";
import {IsNotEmpty, IsString, IsNumber, Min, IsInt, Max} from 'class-validator'

export class CreateStudentDto {
    @ApiProperty({type:String})
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @ApiProperty({type:String})
    @IsString()
    @IsNotEmpty()
    lastname: string;

    @ApiProperty({type:Number})
    @IsNumber()
    @Min(4)
    @IsInt()
    age: number;

    @ApiProperty({type:String})
    @IsString()
    @IsNotEmpty()
    telephone: string;

    @ApiProperty({type:Number})
    @IsNumber()
    @Min(1)
    @Max(9)
    degree: number;
}
