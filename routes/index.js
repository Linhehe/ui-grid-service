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
mongoose.connect('mongodb://huyugui.eicp.net/test', function(err){
  if(err){
    console.error(err);
  } else{
    console.log('connect success');
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
var ClassName = '14游戏软件1班';
var time =[
  {
    "BeginWeek": 2,
    "EndWeek": 13,
    "BeginSubjectDate": '8:00',
    "EndSubjectDate": '11:50',
    "SubjectName": 'Android移动应用开发',
    "SubjectTeacher": '常亚平',
    "Build": 'S3',
    "ClassRoom": '223',
    "TodayWeek": 0 // 星期1
  },{
    "BeginWeek": 14,
    "EndWeek": 19,
    "BeginSubjectDate": '8:00',
    "EndSubjectDate": '11:50',
    "SubjectName": 'Android移动应用开发项目实训',
    "SubjectTeacher": '常亚平',
    "Build": 'S3',
    "ClassRoom": '223',
    "TodayWeek": 0 // 星期1
  },{
    "BeginWeek": 2,
    "EndWeek": 14,
    "BeginSubjectDate": '18:50',
    "EndSubjectDate": '20:40',
    "SubjectName": 'iOS移动应用开发',
    "SubjectTeacher": '胡玉贵',
    "Build": 'S3',
    "ClassRoom": '209',
    "TodayWeek": 0 // 星期1
  },{
    "BeginWeek": 16,
    "EndWeek": 19,
    "BeginSubjectDate": '18:50',
    "EndSubjectDate": '21:40',
    "SubjectName": 'iOS移动应用开发',
    "SubjectTeacher": '胡玉贵',
    "Build": 'S3',
    "ClassRoom": '209',
    "TodayWeek": 0 // 星期1
  },{
    "BeginWeek": 2,
    "EndWeek": 16,
    "BeginSubjectDate": '8:00',
    "EndSubjectDate": '11:50',
    "SubjectName": 'Photoshop图像处理',
    "SubjectTeacher": '钟丽萍',
    "Build": 'S1',
    "ClassRoom": '503',
    "TodayWeek": 1 // 星期2
  },{
    "BeginWeek": 17,
    "EndWeek": 17,
    "BeginSubjectDate": '8:00',
    "EndSubjectDate": '10:55',
    "SubjectName": 'Photoshop图像处理',
    "SubjectTeacher": '钟丽萍',
    "Build": 'S1',
    "ClassRoom": '503',
    "TodayWeek": 1 // 星期2
  },{
    "BeginWeek": 2,
    "EndWeek": 19,
    "BeginSubjectDate": '8:00',
    "EndSubjectDate": '11:50',
    "SubjectName": '数据结构与算法',
    "SubjectTeacher": '唐懿芳',
    "Build": 'S3',
    "ClassRoom": '319',
    "TodayWeek": 2 // 星期3
  },{
    "BeginWeek": 2,
    "EndWeek": 15,
    "BeginSubjectDate": '8:00',
    "EndSubjectDate": '11:50',
    "SubjectName": 'iOS移动应用开发',
    "SubjectTeacher": '胡玉贵',
    "Build": 'S3',
    "ClassRoom": '209',
    "TodayWeek": 3 // 星期4
  },{
    "BeginWeek": 16,
    "EndWeek": 19,
    "BeginSubjectDate": '8:00',
    "EndSubjectDate": '11:50',
    "SubjectName": 'iOS移动应用开发',
    "SubjectTeacher": '胡玉贵',
    "Build": 'S3',
    "ClassRoom": '209',
    "TodayWeek": 3 // 星期4
  },{
    "BeginWeek": 2,
    "EndWeek": 13,
    "BeginSubjectDate": '14:20',
    "EndSubjectDate": '17:05',
    "SubjectName": 'Android移动应用开发',
    "SubjectTeacher": '常亚平',
    "Build": 'S3',
    "ClassRoom": '223',
    "TodayWeek": 3 // 星期4
  },{
    "BeginWeek": 12,
    "EndWeek": 13,
    "BeginSubjectDate": '18:50',
    "EndSubjectDate": '20:40',
    "SubjectName": '就业指导',
    "SubjectTeacher": '钟耀庆',
    "Build": 'S3',
    "ClassRoom": '106',
    "TodayWeek": 3 // 星期4
  },{
    "BeginWeek": 2,
    "EndWeek": 19,
    "BeginSubjectDate": '8:00',
    "EndSubjectDate": '11:50',
    "SubjectName": 'C++面向对象程序设计',
    "SubjectTeacher": '李彬',
    "Build": 'S3',
    "ClassRoom": '223',
    "TodayWeek": 4 // 星期5
  },{
    "BeginWeek": 16,
    "EndWeek": 17,
    "BeginSubjectDate": '14:20',
    "EndSubjectDate": '16:10',
    "SubjectName": '形势与政策教育',
    "SubjectTeacher": '周和平',
    "Build": 'S3',
    "ClassRoom": '104',
    "TodayWeek": 4 // 星期5
  }
];

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
router.post('/AddStudent', function(req,res,next){
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

      Classes: req.body.Classes,
      Professions: req.body.Professions,
      Colleges: req.body.Colleges
    });
    student.save(function(err){
      if(err){
        console.error(err);
      }
    });
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
  console.log(req.body);
  //
  async.each(req.body.time, function(item, callback) {
    //
    Class.findOne({"ClassName": {'$regex': req.body.ClassName}}, function(err,classes){
      //
      console.log(item.BeginWeek+" ; "+item.EndWeek);
      //var BeginDay1 = BeginDay;
      for(var i=0; i<=(parseInt(item.EndWeek)-parseInt(item.BeginWeek)); i++){
        var dd = new Date(BeginDay.getFullYear()+'-'+(BeginDay.getMonth()+1)+" "+item.BeginSubjectDate);
        dd.setDate(BeginDay.getDate()+(parseInt(item.BeginWeek)-2+i)*7+(parseInt(item.TodayWeek)-1));
        //
        var ee = new Date(BeginDay.getFullYear()+'-'+(BeginDay.getMonth()+1)+" "+item.EndSubjectDate);
        ee.setDate(BeginDay.getDate()+(parseInt(item.BeginWeek)-2+i)*7+(parseInt(item.TodayWeek)-1));
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

            IsSignIn: 0, // 是否签到 （0为否，1为是）
            IsVacation: 0, // 是否请假 （0为否，1为是）

            IsTransferClass: 0 // 是否调课（0为否，1为新数据、可用，-1则本签到数据为旧数据、不可用）
          });
          //signin.save();
        }
      }
      callback();
    });
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
  Profession.find({}, function(err,profession){
    if(err){
      next(err);
    } else{
      res.json(profession);
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






// 添加学生
router.post('AddStudent', function(req,res,next){
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
  student.save();
});
// 删除学生
router.delete('DeleteStudent', function(req,res,next){
  //
  Student.remove({_id: req.body.StudentId}, function(err,students){
    if(err){
      next(err);
    } else{
      console.log('删除成功');
    }
  });
});
// 修改学生
router.put('UpdateStudent', function(req,res,next){
  //
  /*
   StudentInformation 为json格式
   {
       StudentName: '',
       Number: ''
       ......
   }
   */
  Student.findOneAndUpdate({_id: req.body.StudentId}, req.body.StudentInformation, function(err,doc){
    if(err){
      next(err);
    } else{
      console.log(doc);
    }
  });
});
// 查询学生
router.get('FindStudent', function(req,res,next){
  //
  Student.findOne({_id: req.query.StudentId}, function(err,students){
    if(err){
      next(err);
    } else{
      res.json(students);
    }
  })
});




// 查看所有学院
router.get('ViewCollege', function(req,res,next){
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
router.get('ViewProfession', function(req,res,next){
  College.findOne({_id: req.query.CollegeId})
      .populate('Professions')
      .exec(function(err,colleges){
        res.json(colleges.Professions);
      });
});
// 查看某个专业的所有班级
router.get('ViewClasses', function(req,res,next){
  Profession.findOne({_id: req.query.ProfessionId})
      .populate('Classes')
      .exec(function(err,professions){
        res.json(professions.Classes);
      });
});
// 查看某个班级的所有学生
router.get('ViewStudents', function(req,res,next){
  Class.findOne({_id: req.query.ClassId})
      .populate('Students')
      .exec(function(err,classes){
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

module.exports = router;
