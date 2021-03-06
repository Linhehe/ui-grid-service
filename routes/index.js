var express = require('express');
var router = express.Router();

var async = require('async');

var xlsx = require('node-xlsx');

var mongoose = require('mongoose');
//mongoose.connect('mongodb://10.211.55.3/menage', function(err){
//  if(err){
//    console.error(err);
//  } else{
//    console.log('connect success');
//  }
//});
//
// mongodb://linhehe:hyg&1qaz2wSX@113.31.89.205:27017/school
// mongodb://linhehe:linhehe@113.31.89.205:27017/test
mongoose.connect('mongodb://linhehe:hyg&1qaz2wSX@113.31.89.205:27017/school', function(err){
  if(err){
    console.error(err);
  } else{
    console.log('mongodb connected');
  }
});

require('../models/Students');
require('../models/Teachers');
require('../models/Classes');
require('../models/Professions');
require('../models/Colleges');
require('../models/Schools');
require('../models/Addresses');
require('../models/SubjectUnits');
require('../models/Subjects');
require('../models/SignIns');
require('../models/Vacations');
require('../models/TransferClasses');
require('../models/Messages');
require('../models/Excels');
require('../models/testSignIns');

var Student = mongoose.model('Student');
var Class = mongoose.model('Class');
var Teacher = mongoose.model('Teacher');
var Address = mongoose.model('Address');
var SubjectUnit = mongoose.model('SubjectUnit');
var Subject = mongoose.model('Subject');
var SignIn = mongoose.model('SignIn');
var Vacation = mongoose.model('Vacation');
var TransferClass = mongoose.model('TransferClass');
var Message = mongoose.model('Message');
var Profession = mongoose.model('Profession');
var College = mongoose.model('College');
var School = mongoose.model('School');
var Excel = mongoose.model('Excel');
var testSignIn = mongoose.model('testSignIn');

// **********************************************************************************************************
var BeginDay = new Date('2015-9-7');
var ClassName = '15信管ERP3';
var time = [
  {
    "BeginWeek": 3,
    "EndWeek": 16,
    "BeginSubjectDate": '18:50',
    "EndSubjectDate": '20:40',
    "SubjectName": '实用会计基础',
    "SubjectTeacher": '陈维',
    "Build": 'J3',
    "ClassRoom": '306',
    "TodayWeek": 0 // 星期1
  }
];
//var ClassName = '14游戏软件1班';
//var time =[
//  {
//    "BeginWeek": 2,
//    "EndWeek": 13,
//    "BeginSubjectDate": '8:00',
//    "EndSubjectDate": '10:55',
//    "SubjectName": 'Android移动应用开发',
//    "SubjectTeacher": '常亚平',
//    "Build": 'S3',
//    "ClassRoom": '223',
//    "TodayWeek": 0 // 星期1
//  },{
//    "BeginWeek": 14,
//    "EndWeek": 19,
//    "BeginSubjectDate": '8:00',
//    "EndSubjectDate": '11:50',
//    "SubjectName": 'Android移动应用开发项目实训',
//    "SubjectTeacher": '常亚平',
//    "Build": 'S3',
//    "ClassRoom": '223',
//    "TodayWeek": 0 // 星期1
//  },{
//    "BeginWeek": 2,
//    "EndWeek": 14,
//    "BeginSubjectDate": '18:50',
//    "EndSubjectDate": '20:40',
//    "SubjectName": 'iOS移动应用开发',
//    "SubjectTeacher": '胡玉贵',
//    "Build": 'S3',
//    "ClassRoom": '209',
//    "TodayWeek": 0 // 星期1
//  },{
//    "BeginWeek": 16,
//    "EndWeek": 19,
//    "BeginSubjectDate": '18:50',
//    "EndSubjectDate": '21:40',
//    "SubjectName": 'iOS移动应用开发项目实训',
//    "SubjectTeacher": '胡玉贵',
//    "Build": 'S3',
//    "ClassRoom": '209',
//    "TodayWeek": 0 // 星期1
//  },{
//    "BeginWeek": 2,
//    "EndWeek": 16,
//    "BeginSubjectDate": '8:00',
//    "EndSubjectDate": '11:50',
//    "SubjectName": 'Photoshop图像处理',
//    "SubjectTeacher": '钟丽萍',
//    "Build": 'S1',
//    "ClassRoom": '503',
//    "TodayWeek": 1 // 星期2
//  },{
//    "BeginWeek": 17,
//    "EndWeek": 17,
//    "BeginSubjectDate": '8:00',
//    "EndSubjectDate": '10:55',
//    "SubjectName": 'Photoshop图像处理',
//    "SubjectTeacher": '钟丽萍',
//    "Build": 'S1',
//    "ClassRoom": '503',
//    "TodayWeek": 1 // 星期2
//  },{
//    "BeginWeek": 2,
//    "EndWeek": 19,
//    "BeginSubjectDate": '8:00',
//    "EndSubjectDate": '11:50',
//    "SubjectName": '数据结构与算法',
//    "SubjectTeacher": '唐懿芳',
//    "Build": 'S3',
//    "ClassRoom": '319',
//    "TodayWeek": 2 // 星期3
//  },{
//    "BeginWeek": 2,
//    "EndWeek": 15,
//    "BeginSubjectDate": '8:00',
//    "EndSubjectDate": '11:50',
//    "SubjectName": 'iOS移动应用开发',
//    "SubjectTeacher": '胡玉贵',
//    "Build": 'S3',
//    "ClassRoom": '209',
//    "TodayWeek": 3 // 星期4
//  },{
//    "BeginWeek": 16,
//    "EndWeek": 19,
//    "BeginSubjectDate": '8:00',
//    "EndSubjectDate": '11:50',
//    "SubjectName": 'iOS移动应用开发项目实训',
//    "SubjectTeacher": '胡玉贵',
//    "Build": 'S3',
//    "ClassRoom": '209',
//    "TodayWeek": 3 // 星期4
//  },{
//    "BeginWeek": 2,
//    "EndWeek": 13,
//    "BeginSubjectDate": '14:20',
//    "EndSubjectDate": '17:05',
//    "SubjectName": 'Android移动应用开发',
//    "SubjectTeacher": '常亚平',
//    "Build": 'S3',
//    "ClassRoom": '223',
//    "TodayWeek": 3 // 星期4
//  },{
//    "BeginWeek": 12,
//    "EndWeek": 13,
//    "BeginSubjectDate": '18:50',
//    "EndSubjectDate": '20:40',
//    "SubjectName": '就业指导',
//    "SubjectTeacher": '钟耀庆',
//    "Build": 'S3',
//    "ClassRoom": '106',
//    "TodayWeek": 3 // 星期4
//  },{
//    "BeginWeek": 2,
//    "EndWeek": 19,
//    "BeginSubjectDate": '8:00',
//    "EndSubjectDate": '11:50',
//    "SubjectName": 'C++面向对象程序设计',
//    "SubjectTeacher": '李彬',
//    "Build": 'S3',
//    "ClassRoom": '223',
//    "TodayWeek": 4 // 星期5
//  },{
//    "BeginWeek": 16,
//    "EndWeek": 17,
//    "BeginSubjectDate": '14:20',
//    "EndSubjectDate": '16:10',
//    "SubjectName": '形势与政策教育',
//    "SubjectTeacher": '周和平',
//    "Build": 'S3',
//    "ClassRoom": '104',
//    "TodayWeek": 4 // 星期5
//  }
//];

//
var arr = ['class1','class2'];
async.each(arr,function(item, callback) {
  Class.findOne({"ClassName": {'$regex': item}}, function(err,classes){
    //
    callback();
    //console.log(item);
  })
}, function(err) {

});

// **************************************************************************************
async.each(time, function(item, callback) {
  //
  Class.findOne({"ClassName": {'$regex': ClassName}}, function(err,classes){
    //
    //console.log(item.BeginWeek+" ; "+item.EndWeek);
    //var BeginDay1 = BeginDay;
    for(var i=0; i<=(item.EndWeek-item.BeginWeek); i++){
      var dd = new Date(BeginDay.getFullYear()+'-'+(BeginDay.getMonth()+1)+" "+item.BeginSubjectDate);
      dd.setDate(BeginDay.getDate()+(item.BeginWeek-2+i)*7+item.TodayWeek);
      //
      var ee = new Date(BeginDay.getFullYear()+'-'+(BeginDay.getMonth()+1)+" "+item.EndSubjectDate);
      ee.setDate(BeginDay.getDate()+(item.BeginWeek-2+i)*7+item.TodayWeek);
      //
      for(var j=0; j<classes.Students.length; j++){
        var signin = new SignIn({
          StudentId: classes.Students[j],
          ClassId: classes._id,
          TeacherName: item.SubjectTeacher,
          SubjectName: item.SubjectName,
          BeginSubjectDate: dd, // 起始时间
          EndSubjectDate: ee, // 结束时间
          AddressName: item.Build, // 教学楼
          ClassRoomName: item.ClassRoom, // 教室

          FirstSignInState: 0,
          SecondSignInState: 0
        });
        //signin.save();
      }
    }
    callback();
  });
});
//SignIn.find({}, function(err,doc){
//  //console.log(doc);
//  doc.forEach(function(item){
//    console.log(item.BeginSubjectDate.getDay());
//  });
//});
// **************************************************************************************

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var obj = xlsx.parse('public/files/kcb.xls');
obj.forEach(function(item){
  //console.log("name = "+item.name+" ; data = "+item.data);
  //console.log(item.data[8][1]);
  var excel = new Excel({
    Name: item.name,
    Data: item.data
  });
  //excel.save();
});
//
Excel.findOne({Name: '14软件1（ACCP）'}, function(err,excel){
  //
  //console.log(excel.Data[8][10]);
});
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// ==========================================================================================================
//SignIn.find({ClassId: '55ed4d83100c389106ad7874', BeginSubjectDate: {$gte: new Date('2015-9-7')}, EndSubjectDate: {$lte: new Date()}}, function(err,signin){
//  //console.log(signin);
//  signin.forEach(function(item){
//    //console.log(item.StudentId);
//    var students = [];
//    if(students.Contains(item.StudentId)){
//      //
//    }
//  });
//});
// ==========================================================================================================

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// 教师上传学生信息表在数据库中添加学生
router.post('/AddStudentIntoDB', function(req,res,next){
  var obj = xlsx.parse('public/files/'+req.body.TeacherId+'.xls');
  for(var i=1; i<obj[0].data.length; i++){
    //console.log("Number: "+obj[0].data[i][0]);
    //console.log("StudentName: "+obj[0].data[i][1]);
    //console.log("Sex: "+obj[0].data[i][2]);
    //console.log("ID_card: "+obj[0].data[i][3]);
    //console.log("Phone: "+obj[0].data[i][4]);
    //console.log("FatherPhone: "+obj[0].data[i][5]);
    //console.log("MotherPhone: "+obj[0].data[i][6]);
    //console.log("Dorm: "+obj[0].data[i][7]);
    //console.log("Native: "+obj[0].data[i][8]);
    //console.log("QQ: "+obj[0].data[i][9]);
    var student = new Student({
      Purview: 5,
      StudentName: obj[0].data[i][1],
      Sex: obj[0].data[i][2],
      Photo: 'aa.jpg',
      Number: obj[0].data[i][0],
      Phone: obj[0].data[i][4],
      QQ: obj[0].data[i][9],
      ID_card: obj[0].data[i][3],
      Native: obj[0].data[i][8],
      Password: '123',
      IsSignIn: 0,
      DeviceId: '',
      WiFiSSID: '',
      FatherPhone: obj[0].data[i][5],
      MotherPhone: obj[0].data[i][6],

      ClassTeacher: req.body.TeacherId,

      Classes: req.body.ClassId,
      Professions: req.body.ProfessionId,
      Colleges: req.body.CollegeId
    });
    console.log(student);
    //student.save(function(err){
    //  if(err){
    //    console.error(err);
    //  }
    //});
  }
});
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 导入签到表
router.post('/ImportSignIn', function(req,res,next){
  //
  //console.log(req.body);
  var BeginDay = new Date(req.body.BeginDay);
  //console.log(BeginDay);
  //console.log(req.body);
  //
 async.each(req.body.time, function(item, callback1) {
    //
    Class.findOne({"ClassName": {'$regex': req.body.ClassName}}, function(err,classes){
      //
      //console.log(item.BeginWeek+" ; "+item.EndWeek);
      //var BeginDay1 = BeginDay;
      var weeks=[];
      for(var i=0; i<=(parseInt(item.EndWeek)-parseInt(item.BeginWeek)); i++)
      {
        weeks.push(i);
      }
      async.each(weeks,function(i,callback2){
        var dd = new Date(BeginDay.getFullYear()+'-'+(BeginDay.getMonth()+1)+"-"+BeginDay.getDate()+" "+item.BeginSubjectDate);
        //console.error(dd);
        dd.setDate(BeginDay.getDate()+(parseInt(item.BeginWeek)-2+i)*7+(parseInt(item.TodayWeek)-1));
        //console.log(BeginDay.getDate());
        //console.error((parseInt(item.BeginWeek)-2+i)*7);
        console.log(typeof parseInt(item.TodayWeek));
        console.error(item.TodayWeek);
        //console.error(new Date(dd));
        //
        var ee = new Date(BeginDay.getFullYear()+'-'+(BeginDay.getMonth()+1)+"-"+BeginDay.getDate()+" "+item.EndSubjectDate);
        ee.setDate(BeginDay.getDate()+(parseInt(item.BeginWeek)-2+i)*7+(parseInt(item.TodayWeek)-1));
        //
        async.each(classes.Students,function(s,callback3){

          var signin = new SignIn({
            StudentId: s,
            ClassId: classes._id,
            TeacherName: item.SubjectTeacher,
            SubjectName: item.SubjectName,
            BeginSubjectDate: dd, // 起始时间
            EndSubjectDate: ee, // 结束时间
            AddressName: item.Build, // 教学楼
            ClassRoomName: item.ClassRoom, // 教室

            FirstSignInState: 0,
            SecondSignInState: 0
          });
          console.log(signin);
          signin.save(function(error,doc){
            //
            console.log("name "+doc.StudentId)
            callback3();
            //
          });
        },function(err){
          callback2()
        });
      },function(error){
        callback1();
      });
    });
  },function(err){
   console.log("findish");
    res.jsonp("finish");
 });
});

// 上传学生信息的Excel表格
router.post('/UploadExcel', function(req,res,next){
  //
  console.log(req.body);
});

// 添加学院
router.post('/AddCollege', function(req,res,next){
  //
  var college = new College({
    CollegeName: req.body.CollegeName
  });
  college.save();
});
// 选择学院
router.get('/ChooseCollege', function(req,res,next){
  //
  College.find({}, function(err,college){
    if(err){
      next(err);
    } else{
      res.json(college);
    }
  });
});
// 添加专业
router.post('/AddProfession', function(req,res,next){
  //
  var profession = new Profession({
    ProfessionName: req.body.ProfessionName
  });
  profession.save();
  //
  College.findOne({CollegeName: req.body.CollegeName}, function(err,college){
    //
    college.Professions.push(profession);
    college.save();
  });
});
// 选择专业
router.get('/ChooseProfession', function(req,res,next){
  //
  //Profession.find({}, function(err,profession){
  //  if(err){
  //    next(err);
  //  } else{
  //    res.json(profession);
  //  }
  //});
  College.findOne({_id: req.query.CollegeId})
      .populate('Professions')
      .exec(function(err,colleges){
        if(err){
          next(err);
        } else{
          if(colleges){
            res.json(colleges.Professions);
          } else{
            res.send('no');
          }
        }
      });
});
// 添加班级
router.post('/AddClass', function(req,res,next){
  //
  var classes = new Class({
    ClassName: req.body.ClassName
  });
  classes.save();
  //
  Profession.findOne({ProfessionName: req.body.ProfessionName}, function(err,profession){
    //
    profession.Classes.push(classes);
    profession.save();
  });
});
// 选择班级
router.get('/ChooseClass', function(req,res,next){
  //
  Profession.findOne({_id: req.query.ProfessionId})
      .populate('Classes')
      .exec(function(err,colleges){
        if(err){
          next(err);
        } else{
          if(colleges){
            res.json(colleges.Classes);
          } else{
            res.send('no');
          }
        }
      });
});






// 添加学生
router.post('/AddStudent', function(req,res,next){
  //
  var student = new Student({
    StudentName: req.body.StudentName,
    Sex: req.body.Sex,
    Number: req.body.Number,
    Phone: req.body.Phone,
    QQ: req.body.QQ,
    Dorm: req.body.Dorm,
    ID_card: req.body.ID_card,
    Native: req.body.Native,

    Classes: req.body.Classes,
    Professions: req.body.Professions,
    Colleges: req.body.Colleges,

    ClassTeacher: req.body.ClassTeacher,
    FatherPhone: req.body.FatherPhone,
    MotherPhone: req.body.MotherPhone
  });
  //console.log(student);
  student.save(function(result){
    if(result == null){
      res.send('success');
    } else{
      res.send('fail');
    }
  });
});
// 删除学生
router.delete('/DeleteStudent', function(req,res,next){
  //
  Student.remove({_id: req.query.StudentId}, function(err,students){
    if(err){
      next(err);
    } else{
      res.send('删除成功');
      console.log('删除成功');
    }
  });
});
// 修改学生
router.put('/UpdateStudent', function(req,res,next){
  //
  /*
   StudentInformation 为json格式
   {
       StudentName: '',
       Number: ''
       ......
   }
   */
  var str = '{\"'+req.body.tag+'\": \"'+req.body.val+'\"}';
  str = JSON.parse(str);
  console.log(str);
  Student.findOneAndUpdate({_id: req.body.id}, str, function(err,doc){
    if(err){
      next(err);
    } else{
      console.log(doc);
      res.send('success');
    }
  });
});

var str = "{\"_id\": \"5603a430065c87e7060865cf\", \"StudentName\": \"456\"}";
str = JSON.parse(str);
//Student.findOneAndUpdate({_id: '5603a430065c87e7060865cf'}, str, function(err,doc){
//  if(err){
//    next(err);
//  } else{
//    console.log(doc);
//  }
//});

// 查询学生
router.get('/FindStudent', function(req,res,next){
  //
  Student.findOne({Number: req.query.Number})
      .populate('Colleges')
      .populate('Professions')
      .populate('Classes')
      .exec(function(err,students){
        if(err){
          next(err);
        } else{
          if(students){
            res.json(students);
          } else{
            res.send('no');
          }
        }
      });
});




// 查看所有学院
router.get('/ViewCollege', function(req,res,next){
  College.find({}, function(err,colleges){
    if(err){
      next(err);
    } else{
      if(colleges){
        res.json(colleges);
      } else{
        res.send('还未添加任何学院');
      }
    }
  })
});
// 查看某个学院的所有专业
router.get('/ViewProfession', function(req,res,next){
  College.findOne({_id: req.query.CollegeId})
      .populate('Professions')
      .exec(function(err,colleges){
        if(err) next(err);
        res.json(colleges.Professions);
      });
});
// 查看某个专业的所有班级
router.get('/ViewClasses', function(req,res,next){
  Profession.findOne({_id: req.query.ProfessionId})
      .populate('Classes')
      .exec(function(err,professions){
        if(err) next(err);
        res.json(professions.Classes);
      });
});
// 查看某个班级的所有学生
router.get('/ViewStudents', function(req,res,next){
  Class.findOne({_id: req.query.ClassId})
      .populate('Students')
      .exec(function(err,classes){
        if(err) next(err);
        res.json(classes.Students);
      });
});

//var arr = {
//  StudentName: 'linhehe',
//  Sex: 'man',
//  Age: '18',
//  Number: '47',
//  Phone: '110'
//};
//for(var key in arr){
//  console.log(key);
//  console.error(arr[key]);
//}






/*
    签到课程的管理
 */
// 添加课程
//Class.findOne({_id: '5603a41956494f239c9f8937'})
//    .populate('Students')
//    .exec(function(err,classes){
//      //
//      classes.Students.forEach(function(item,callback){
//        //
//        console.log(item._id);
//      });
//    });
router.post('/AddSubject', function(req,res,next){
  //
  Class.findOne({_id: ''}, function(err,classes){
    //
    console.log(classes);
  });
  //var signin = new SignIn({
  //  StudentId: classes.Students[j],
  //  ClassId: classes._id,
  //  TeacherName: item.SubjectTeacher,
  //  SubjectName: item.SubjectName,
  //  BeginSubjectDate: dd, // 起始时间
  //  EndSubjectDate: ee, // 结束时间
  //  AddressName: item.Build, // 教学楼
  //
  //  IsSignIn: 0, // 是否签到 （0为否，1为是）
  //  IsVacation: 0, // 是否请假 （0为否，1为是）
  //
  //  IsTransferClass: 0 // 是否调课（0为否，1为新数据、可用，-1则本签到数据为旧数据、不可用）
  //});
});
// 删除课程
//router.delete('/DeleteSubject', function(req,res,next){
//  //
//});
// 修改课程
//router.put('/UpdateSubject', function(req,res,next){
//  //
//});

//
// 查询课程
//
// 按班级查看
//SignIn.find({ClassId: '55ed4d83100c389106ad7874'})
//    //.select('SubjectName')
//    .exec(function(err,signs){
//      //
//      signs.forEach(function(item,callback){
//        //
//        console.log({
//          SubjectName: item.SubjectName,
//          TeacherName: item.TeacherName,
//          BeginSubjectDate: item.BeginSubjectDate,
//          EndSubjectDate: item.EndSubjectDate
//        });
//      });
//    });
//
// 按任课老师查看
//SignIn.find({TeacherName: '胡玉贵'})
//    .exec(function(err,signs) {
//      //
//      var arr = [];
//      async.each(signs, function(item, callback){
//        //
//        if(arr.length!=0){
//          for(var i=0; i<arr.length; i++){
//            //console.log(typeof item.BeginSubjectDate.toLocaleDateString());
//            //console.error(typeof arr[i].BeginSubjectDate.toLocaleDateString());
//            if(item.BeginSubjectDate.toLocaleDateString() != arr[i].BeginSubjectDate.toLocaleDateString()){
//              //arr.push({
//              //  SubjectName: item.SubjectName,
//              //  TeacherName: item.TeacherName,
//              //  BeginSubjectDate: item.BeginSubjectDate,
//              //  EndSubjectDate: item.EndSubjectDate
//              //});
//              //console.log(item.SubjectName);
//            }
//          }
//        } else{
//          arr.push({
//            SubjectName: item.SubjectName,
//            TeacherName: item.TeacherName,
//            BeginSubjectDate: item.BeginSubjectDate,
//            EndSubjectDate: item.EndSubjectDate
//          });
//        }
//      });
//      //
//      //console.log(arr);
//    });
SignIn
    //.find({TeacherName: '胡玉贵'}, {_id:0})
    //.select('SubjectName')
    //.select('TeacherName')
    //.select('ClassId')
    //.select('BeginSubjectDate')
    .distinct('TeacherName')
    .exec(function(err,signs){
      //console.log(signs);
      //var arr=[];
      //async.each(signs, function(item,callback){
      //  if(arr.length == 0){
      //    arr.push(item)
      //  } else{
      //    for(var i=0; i<arr.length; i++){
      //      if(arr[i].ClassId != item.ClassId){
      //        arr.push(item);
      //      }
      //    }
      //    callback();
      //  }
      //  console.log(arr);
      //});
    });
router.get('/FindSubject', function(req,res,next){
  //
});






//for(var i=1; i<=60; i++){
//  var student = new Student({
//    StudentName: "测试账号"+i,
//    Sex: "男",
//    Number: "201511210"+i,
//    Phone: "13726224169",
//    QQ: "123456789",
//    Dorm: "19#408",
//    ID_card: "00000000000000000",
//    Native: "广东省",
//
//    Classes: "565024d95234c69804a2530f",
//    "Professions" : "55ed4e13d7d3839606a084a2",
//    "Colleges" : "55ed4e76c5e8329906b14051",
//
//    ClassTeacher: "55ed546d5ef0f1be065579ce",
//    FatherPhone: "13726224270",
//    MotherPhone: "13726223041"
//  });
//}

// 列出所有的任课教师
router.get('/getTeacher', function(req,res,next){
  SignIn.find({ClassId: req.query.ClassId})
      .distinct('TeacherName', function(err,signs){
        console.log(signs);
        res.json(signs);
      });
});

// 列出该老师上的所有课程
router.get('/getTeacherSubject', function(req,res,next){
  SignIn.find({TeacherName: req.query.TeacherName, ClassId: req.query.ClassId})
      .select('BeginSubjectDate')
      .select('EndSubjectDate')
      .select('SubjectName')
      .exec(function(err,signs){
        var array = signs;
        //console.log(array[0]);
        function ov1(arr){
          //var a1=((new Date).getTime())
          for(var i=0;i<arr.length;i++)
            for(var j=i+1;j<arr.length;j++)
              if(arr[i].BeginSubjectDate.toLocaleString()===arr[j].BeginSubjectDate.toLocaleString()){arr.splice(j,1);j--;}
          //console.info((new Date).getTime()-a1)
          return arr.sort(function(a,b){return a-b});
        }
        console.log(ov1(array));
        res.json(ov1(array));
      });
});

router.put('/updateSignIn', function(req,res,next){
  SignIn.update(
      {BeginSubjectDate: new Date(req.body.old_BeginSubjectDate), ClassId: req.body.ClassId},
      //{_id: req.body._id},
      {$set:{BeginSubjectDate: new Date(req.body.new_BeginSubjectDate), EndSubjectDate: new Date(req.body.new_EndSubjectDate)}},
      {upsert: false, multi: true},
      function(err,signs){
        //
        if(err){
          next(err);
        } else{
          console.log(signs);
          res.json(signs);
        }
      });
});

router.get('/getClassProject', function(req,res,next){
  SignIn.aggregate(
    {$match:{"ClassId":mongoose.Types.ObjectId(req.query.ClassId)}},
    {$group:{_id:{SubjectName:"$SubjectName",date:"$BeginSubjectDate",BeginSubjectDate:"$BeginSubjectDate",EndSubjectDate:"$EndSubjectDate",TeacherName:"$TeacherName"}}
    },
    {$group:{_id:{SubjectName:"$_id.SubjectName"}, my: {$push:{date:"$_id.BeginSubjectDate",BeginSubjectDate:"$_id.BeginSubjectDate",EndSubjectDate:"$_id.EndSubjectDate",TeacherName:"$_id.TeacherName"}}}}
  , function(err,result){
        if(err){
          next(err);
        } else{
          res.json(result);
        }
      });
});

router.delete('/deleteSubject', function(req,res,next){
  SignIn.remove({ClassId: req.query.ClassId, BeginSubjectDate: new Date(req.query.BeginSubjectDate)}, function(err){
    if(err){
      next(err);
    } else{
      res.jsonp('delete finish');
    }
  });
});

router.get('/getProjectByProjectName', function(req,res,next){
  SignIn.aggregate(
    {$match:{"ClassId":mongoose.Types.ObjectId(req.query.ClassId), "SubjectName":req.query.SubjectName}},
    {$group:{_id:{SubjectName:"$SubjectName",BeginSubjectDate:"$BeginSubjectDate",EndSubjectDate:"$EndSubjectDate"}}},
    {$group:{_id:{SubjectName:"$_id.SubjectName"}, my:{$push:{BeginSubjectDate:"$_id.BeginSubjectDate",EndSubjectDate:"$_id.EndSubjectDate"}}}}
  , function(err,result){
        if(err){
          next(err);
        } else{
          res.jsonp(result);
        }
      });
});

router.post('/addaNewSubject', function(req,res,next){
  Class.findOne({_id: req.body.ClassId}, function(err,classes){
    if(err){
      next(err);
    } else{
      if(classes){
        var stop_val = classes.Students.length;
        for(var i=0; i<classes.Students.length; i++){
          var sign = new SignIn({
            StudentId: classes.Students[i],
            ClassId: req.body.ClassId,
            TeacherName: req.body.TeacherName,
            SubjectName: req.body.SubjectName,
            BeginSubjectDate: new Date(req.body.BeginSubjectDate), // 起始时间
            EndSubjectDate: new Date(req.body.EndSubjectDate), // 结束时间
            AddressName: req.body.AddressName, // 教学楼
            ClassRoomName: req.body.ClassRoomName // 教室
          });
          sign.save();
          if(i == stop_val){
            console.log('finish');
            res.jsonp('finish');
          }
        }
      }
    }
  });
});


//SignIn.aggregate([
//  {$match: {
//    ClassId : '55ed4d83100c389106ad7874'
//  }},
//  {$group: {
//    _id: { ClassId: "$ClassId", BeginSubjectDate: "$BeginSubjectDate", EndSubjectDate: "$EndSubjectDate" }
//  }}
//])
//    .exec(function(err,result){
//      if(err){
//        console.error(err);
//        return;
//      }
//      console.log(result);
//    });


//var date1 = new Date('2015-11-27 12:00');
//var date2 = new Date('2015-11-27 12:00');
//console.log(date1.toLocaleString() == date2.toLocaleString());

//SignIn.find({BeginSubjectDate:signs[0]}, function(err,signs1){
//  console.log(signs1);
//})

module.exports = router;
