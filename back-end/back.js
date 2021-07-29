// ทำการประกาศ
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const e = require("express");

const app = express();
const router = express.Router();


//กำหนด port
const PORT = 4001;

//การ route 

app.use(cors());
app.use("/api", bodyParser.json(), router);
app.use("/api", bodyParser.urlencoded({ extended: false }), router);


//การกำหนดข้อมูล

let students = {
  list: [
    { id: 1, name: "Pajaree", age: 23, weight: 50 },
    { id: 2, name: "Eve", age: 21, weight: 55 },
  ],
};

//การเพิ่ม route  ตัวเดียว 

router
    .route("/students")
    .get((req, res) => {
        
        res.json(students)


    })

    .post((req, res) => {
       
        let id = students.list.length ? students.list[students.list.length - 1].id + 1 : 1;
        


        let newstudents = {};
        newstudents.id = id;
        newstudents.name = req.body.name;
        newstudents.age = req.body.age;
        newstudents.weight = req.body.weight;
        

        students = { list: [...students.list, newstudents] };


        res.json(students);
    });

let income = 0;
router
    .route("/income").get((req, res) => {
     res.json(income);

});




    //การทำpets หลายตัว 

router
    .route("/students/:studentId")
    .get((req, res) => {
        
        let id = students.list.findIndex(
            (item) => item.id == +req.params.studentId
        );

         if (id == -1) {
           res.json("Not Found");
         } else {
           res.json(students.list[id]);
         }

    })
    

    //การแก้ไข 
    .put((req, res) => {
        
        let id = students.list.findIndex(
          (item) => item.id == +req.params.studentId
        );
        console.log("id = ", id);

        if (id < 0) {
          res.json("Not Found");
        } else {
          students.list[id].name = req.body.name;
          students.list[id].age = req.body.age;
          students.list[id].weight = req.body.weight;
          
            
          res.json(students);
        }
    })
    
    .delete((req, res) => {
        
          let id = students.list.findIndex(
            (item) => item.id == +req.params.studentId
        );
        
        students.list = students.list.filter((item) => (item.id !== +req.params.studentId))

        if (id >= 0) {
          students.list = students.list.filter(
            (item) => item.id !== +req.params.studentId
          );
          res.json(students);
        } else {
          res.json("Can't Delete");
        }

    })


app.listen(PORT, () => { console.log("Server runing is port", PORT);});