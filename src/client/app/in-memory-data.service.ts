import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let userlist = [
      { id: 1, name: 'Windstorm' },
      { id: 2, name: 'Bombasto' },
      { id: 3, name: 'Magneta' },
      { id: 4, name: 'Tornado' }
    ];

    let settingKpi = [
      { id: 1, name: 'Windstorm' },
      { id: 2, name: 'Bombasto' },
      { id: 3, name: 'Magneta' },
      { id: 4, name: 'Tornado' }
    ];

    let projectsInfo = [
      {
        "no": 1,
        "projectName": "PJT1",
        "projectStatus": "In Progress",
        "lastUpdateDay": "2017/02/03",
        "endDay": "2017/05/01"
      },{
        "no": 2,
        "projectName": "PJT2",
        "projectStatus": "Planing",
        "lastUpdateDay": "2017/03/03",
        "endDay": "2017/05/01"
      }, {
        "no": 3,
        "projectName": "PJT3",
        "projectStatus": "Finish",
        "lastUpdateDay": "2017/01/03",
        "endDay": "2017/02/03"
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
        "overcast": "0.8",
        "rain": "1",
        "noticeMsg":"Please bug"
      },{
        "no": 2,
        "projectNo": 2,
        "project": "PJT2",
        "system": "Redmine",
        "catalog": "task",
        "kpi": "task Amount",
        "overcast": "0.8",
        "rain": "1",
        "noticeMsg":"Please task"
      }, {
        "no": 3,
        "projectNo": 1,
        "project": "PJT1",
        "system": "Redmine",
        "catalog": "QA",
        "kpi": "QA Amount",
        "overcast": "0.8",
        "rain": "1",
        "noticeMsg":"Please QA"
      }, {
        "no": 4,
        "projectNo": 1,
        "project": "PJT1",
        "system": "SonarQube",
        "catalog": "Quality",
        "kpi": "Quality Threshold",
        "overcast": "0.8",
        "rain": "1",
        "noticeMsg":"Please Quality"
      }, {
        "no": 5,
        "projectNo": 2,
        "project": "PJT2",
        "system": "SonarQube",
        "catalog": "Quality",
        "kpi": "Quality Threshold",
        "overcast": "0.8",
        "rain": "1",
        "noticeMsg":"Please Quality"
      }, {
        "no": 6,
        "projectNo": 3,
        "project": "PJT3",
        "system": "SonarQube",
        "catalog": "Quality",
        "kpi": "Quality Threshold",
        "overcast": "0.8",
        "rain": "1",
        "noticeMsg":"Please Quality"
      }
    ];
    return {userlist, settingKpi, projectsInfo, thresholdInfo};
  }
}