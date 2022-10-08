import { ApiProperty } from "@nestjs/swagger";

export class ListStudentsdto  {
    @ApiProperty({type:String})
    id: String;

    @ApiProperty({type:String})   
    firstname: string;

    @ApiProperty({type:String})   
    lastname: string;

    @ApiProperty({type:Number})    
    age: number;

    @ApiProperty({type:String})    
    telephone: string;

    @ApiProperty({type:Number})   
    degree: number;

    @ApiProperty({type:Date})
    createdAt: Date;
    
    @ApiProperty({type:Date})
    updatedAt: Date; 
   
    
}