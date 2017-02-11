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

    let saveProject = {
      'result': 1
    };

    return {userlist, settingKpi, projectsInfo, thresholdInfo, saveProject};
  }
}
