import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let userlist = [
      {
        "id": 1,
        "project": "PJ1",
        "role": "Member",
        "avatar": "assets/img/background.jpg",
        "email": "wei.zhang@accenture.com",
        "fristName": "Wei",
        "lastName": "zhang"
      },{
        "id": 2,
        "project": "PJ2",
        "role": "Owner",
        "avatar": "assets/img/dashboard.png",
        "email": "changsheng.liu@accenture.com",
        "fristName": "changsheng",
        "lastName": "liu"
      }, {
        "id": 3,
        "project": "PJ1",
        "role": "Owner",
        "avatar": "assets/img/dashboard.png",
        "email": "xiaodong.deng@accenture.com",
        "fristName": "xiaodong",
        "lastName": "deng"
      }, {
        "id": 4,
        "project": "PJ3",
        "role": "Member",
        "avatar": "assets/img/dashboard.png",
        "email": "baofeng.wu@accenture.com",
        "fristName": "baofeng",
        "lastName": "wu"
      }
    ];

    let projectsInfo = [
      {
        "no": 1,
        "projectName": "PJT1",
        "projectStatus": "In Progress",
        "updateDay": new Date('2014-04-03'),
        "endDay": new Date('2017-05-01')
      },{
        "no": 2,
        "projectName": "PJT2",
        "projectStatus": "Planing",
        "updateDay": new Date('2014-04-03'),
        "endDay": new Date('2017-05-01')
      }, {
        "no": 3,
        "projectName": "PJT3",
        "projectStatus": "Finish",
        "updateDay": new Date('2014-04-03'),
        "endDay": new Date('2017-05-01')
    }
    ];

    let thresholdInfo = [
      {
        "no": 1,
        "projectNo": 1,
        "project": "PJT1",
        "system": "Redmine",
        "catalog": "bug",
        "kpi": "bug Amount",
        "overCast": "0.8",
        "rain": "1",
        "noticeMsg":"Please bug"
      },{
        "no": 2,
        "projectNo": 2,
        "project": "PJT2",
        "system": "Redmine",
        "catalog": "task",
        "kpi": "task Amount",
        "overCast": "0.8",
        "rain": "1",
        "noticeMsg":"Please task"
      }, {
        "no": 3,
        "projectNo": 1,
        "project": "PJT1",
        "system": "Redmine",
        "catalog": "QA",
        "kpi": "QA Amount",
        "overCast": "0.8",
        "rain": "1",
        "noticeMsg":"Please QA"
      }, {
        "no": 4,
        "projectNo": 1,
        "project": "PJT1",
        "system": "SonarQube",
        "catalog": "Quality",
        "kpi": "Quality Threshold",
        "overCast": "0.8",
        "rain": "1",
        "noticeMsg":"Please Quality"
      }, {
        "no": 5,
        "projectNo": 2,
        "project": "PJT2",
        "system": "SonarQube",
        "catalog": "Quality",
        "kpi": "Quality Threshold",
        "overCast": "0.8",
        "rain": "1",
        "noticeMsg":"Please Quality"
      }, {
        "no": 6,
        "projectNo": 3,
        "project": "PJT3",
        "system": "SonarQube",
        "catalog": "Quality",
        "kpi": "Quality Threshold",
        "overCast": "0.8",
        "rain": "1",
        "noticeMsg":"Please Quality"
      }
    ];

    return {userlist, projectsInfo, thresholdInfo};
  }
}
