import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { v4 as uuid } from 'uuid';
import { Client } from '../db/client';
import { ListStudentsdto } from './dto/students-items.dto';
import { DeleteStudentDto } from './dto/delete-student.dto';


@Injectable()
export class StudentsService {
 //dependency injection for DynamoDB Connection
  constructor(private connect: Client){ }

  //Save new student
 async create(createStudentDto: CreateStudentDto):Promise<CreateStudentDto> {
   let student = await this.createStudent(createStudentDto)
    return student
  }

  //Get all students
  async findAll(): Promise<Array<ListStudentsdto>> {
    let dataStudents = await this.getStudents()    
    return dataStudents
  }

  async findOne(id: string):Promise<ListStudentsdto> {
    let dataStudent = await this.getByStudents(id)
    return dataStudent
  }

  async update(id: string, updateStudentDto: CreateStudentDto):Promise<UpdateStudentDto> {
    let resultUpdate = await this.updateStudent(id,updateStudentDto)
    return resultUpdate
  }

  async remove(id: string):Promise<DeleteStudentDto> {
    let resultDelete = await this.deleteStudent(id)
    return resultDelete
  }


  //Save in DynamoDB
  private async createStudent(dto: CreateStudentDto): Promise<CreateStudentDto> {
    const student = {
      id: uuid(),
      ...dto,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };   
     try {
      await this.connect.dynamoDB
        .put({          
          TableName: 'students',
          Item: student,
        })
        .promise();
    } catch (error) {
      console.log(error);
    }    
    return student;
  }

  //Get All Students from DynamoDB
  private async getStudents(): Promise<Array<ListStudentsdto>> {  
    return new Promise(async(resolve, reject)=>{
      let ListStudents: ListStudentsdto[] = []   
      try {
       
       const params = {
         TableName : "students"
       }
     await this.connect.dynamoDB.scan(params, (err: any, data: { Items: any[]; })=>{
                   if(err){
                     console.log("Error: ", err)
                     reject(ListStudents)
                   }                  
                   data.Items.forEach((element:any) => {         
                     ListStudents.push({
                      firstname: element.firstname.S,
                      lastname: element.lastname.S,
                      degree: element.degree.N,
                      telephone: element.telephone.S,
                      id: element.id.S,
                      age: element.age.N,
                      updatedAt: element.updatedAt.S,
                      createdAt: element.createdAt.S
                     })
                   });
                   resolve(ListStudents)
                  
                 })  
         
     } catch (error) {
       console.log(error)
       reject(ListStudents)
     }    
    })
    
    
  }

  //Get Students by Id from DynamoDB
  private async getByStudents(id: string): Promise<ListStudentsdto> {  
    return new Promise(async(resolve, reject)=>{
      let ListStudents: ListStudentsdto = new ListStudentsdto()
      try {
       
       const params = {
        // Set the Collection Name, which you want.
         TableName : "students",  
          // Specify which filter in the results are returned.
          Key: {
            'id': {S: id}
          }
       }
     await this.connect.dynamoDB.getItem(params, (err: any, data:{ Item: any})=>{
                   if(err){
                     console.log("Error: ", err)
                     reject(ListStudents)
                   } 
             
                    ListStudents.id= data.Item.id.S
                    ListStudents.firstname= data.Item.firstname.S
                    ListStudents.lastname= data.Item.lastname.S
                    ListStudents.age= data.Item.age.N
                    ListStudents.telephone= data.Item.telephone.S
                    ListStudents.degree= data.Item.degree.N
                    ListStudents.createdAt= data.Item.createdAt.S
                    ListStudents.updatedAt= data.Item.updatedAt.S
                 
                   resolve(ListStudents)
                  
                 })  
         
     } catch (error) {
       console.log(error)
       reject(ListStudents)
     }    
    })
    
    
  }

  //Delete Student by Id from DynamoDB
  private async deleteStudent(id: string): Promise<DeleteStudentDto> {  
    return new Promise(async(resolve, reject)=>{
      let ListStudents: DeleteStudentDto = new DeleteStudentDto()
      ListStudents.deleted  = false
      ListStudents.id = id 
      try {
       
       const params = {
        // Set the Collection Name, which you want.
         TableName : "students",  
          // Specify which filter in the results is deleted.
          Key: {
            'id':{S: id}
          }
       }
     await this.connect.dynamoDB.deleteItem(params, (err: any, data:any)=>{
                   if(err){
                     console.log("Error: ", err)
                     ListStudents.deleted  = false                                  
                     reject(ListStudents)
                   } 
             
                   ListStudents.deleted  = true 
                   resolve(ListStudents)
                  
                 })  
         
     } catch (error) {
       console.log(error)
       reject(ListStudents)
     }    
    })
    
    
  }

   //Update Student by Id from DynamoDB
   private async updateStudent(id: string, student: CreateStudentDto): Promise<UpdateStudentDto> {  
    return new Promise(async(resolve, reject)=>{
      let ListStudents: UpdateStudentDto = new UpdateStudentDto()
      try {
       
       const params = {
        // Set the Collection Name, which you want.
         TableName : "students",  
          // Specify which filter in the results are returned.
          Key: {
            'id':id
          },
          //update Statement
          UpdateExpression: 'set firstname = :n, lastname = :l, telephone = :t, degree = :d, age = :a',
          ExpressionAttributeValues: {
            ':n' : student.firstname,
            ':l' : student.lastname,
            ':t' : student.telephone,
            ':d' : student.degree,
            ':a' : student.age
          }
       }
     await this.connect.dynamoDBClient.update(params, (err: any, data:any)=>{
                   if(err){
                     console.log("Error: ", err)
                     ListStudents.updated  = false
                     ListStudents.firstname = student.firstname
                     ListStudents.lastname = student.lastname
                     ListStudents.telephone = student.telephone
                     ListStudents.degree = student.degree
                     ListStudents.age = student.age
                     reject(ListStudents)
                   } 
             
                   ListStudents.updated  = true
                   ListStudents.firstname = student.firstname
                   ListStudents.lastname = student.lastname
                   ListStudents.telephone = student.telephone
                   ListStudents.degree = student.degree
                   ListStudents.age = student.age
                 
                   resolve(ListStudents)
                  
                 })  
         
     } catch (error) {
       console.log(error)
       reject(ListStudents)
     }    
    })
    
    
  }

}
