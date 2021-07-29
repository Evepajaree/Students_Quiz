import styles from '../styles/front.module.css'
import axios from 'axios'
const URL = "http://localhost:4001/api/students";
import {  useEffect, useState} from 'react'

export default function Home() {

  //ส่วนของฟังกชั่น
  const [students, setStudents] = useState({});
  const [name, setName] = useState('');
  const [age, setAge] = useState();
  const [weight, setWeight] = useState();
  



  
  //  แสดงผลข้อมูลตัวแปร  product
 console.log("student",students)
  const getstudents = async () => {
    
  let result = await axios.get(URL); //ถ้าใส่ await   ต้องมีการใส่ async

   // console.log(result.data);
    setStudents(result.data.list)
  }

  const showstudents = () => {
    if(students && students.length) //เช็คเงื่อนไงของ product
      return students.map((item,index) => { // ฟังก์ชั่น map

        return (
          <li className={styles.editbutton} key={index}>
            {item.name} : {item.age} : {item.weight}
            <button className={styles .getButton} onClick={() => getbyStudent(item.id)}>Get</button>
            <button className={styles.updateButton} onClick={() => UpdatebyStudents(item.id)}>Update</button>
            <button className={styles.deleteButton} onClick={() => DeletebyStudent(item.id)}>Delete</button>
          </li>
        );
       
      })
    else {
       <div  className={styles.name} > No Student</div>
     }
  }
  const [student, setStudent] = useState({})
  console.log(student)

  const getbyStudent = async (id) => {

    let student = await axios.get(`${URL}/${id}`)
    setStudent(student.data)

  }

   
  const UpdatebyStudents = async (id) => {

    let student = await axios.put(`${URL}/${id}`,{name,age,weight});
    getstudents()
  }



    
  const DeletebyStudent = async (id) => {

    let student = await axios.delete(`${URL}/${id}`)
    getstudents()

  }
  
 
  const AddbyStudent = async (name,age,weight) => {
  
    let student = await axios.post(URL, { name, age, weight});
  getstudents()
}




  useEffect(() => { getstudents()},[])

  
  return (
    /// clasName  ใส่ส่วนของ css
    <div  className={styles.inputDisplay}>  Student
      <ul>{showstudents()}</ul>{student.name}
    
      Weight <br/><input type="number" onChange={(e) => setWeight(e.target.value)}></input><br/><br/>
      Age <br/> <input type="number" onChange={(e) => setAge(e.target.value)}></input><br/><br/>
      Name <br/> <input type="text" onChange={(e) => setName(e.target.value)}></input><br/><br/>
      <br/>
      <button className={styles.addButton} onClick={() => AddbyStudent(name,age,weight)}>Add New Student</button>
      
    </div>
  );
}