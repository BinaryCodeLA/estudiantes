import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { ListStudentsdto } from './dto/students-items.dto';
import { DeleteStudentDto } from './dto/delete-student.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  //Create Student 
  @Post()
  @ApiResponse({status:201, description:'Student Added Succesfully'})
  @ApiBadRequestResponse({status:400, description:'Bad Request'})
  @ApiBody({type: CreateStudentDto,description:"Student Registration"})
  async create(@Body() createStudentDto: CreateStudentDto):Promise<CreateStudentDto> {
    let results = await this.studentsService.create(createStudentDto)
    return results
  }

  //Get All Students
  @ApiResponse({status:200,type:ListStudentsdto, description: 'Get All Students'})
  @Get()
 async findAll():Promise<Array<ListStudentsdto>> {
    let students = await this.studentsService.findAll();
    return students
  }

  //Get Student By Id
  @ApiResponse({status:200, type:ListStudentsdto, description: 'Get Student by Id'})
  @ApiBadRequestResponse({status:404, description:'Student not found'})
  @Get(':id')
  async findOne(@Param('id') id: string):Promise<ListStudentsdto> {
    let student = await this.studentsService.findOne(id)
    return student
  }

  //Update Student
  @ApiResponse({status:200, type: UpdateStudentDto, description: 'Update Student by Id'})
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStudentDto: CreateStudentDto):Promise<UpdateStudentDto> {
    let result =  this.studentsService.update(id,updateStudentDto)
    return result
  }

  //Delete User
  @ApiResponse({status:200, type:DeleteStudentDto, description:'Delete Student by Id'})
  @Delete(':id')
  async remove(@Param('id') id: string):Promise<DeleteStudentDto> {
    let resultDelete = await this.studentsService.remove(id);
    return resultDelete
  }
}
