import {Pipe, PipeTransform} from '@angular/core';
import {ThresholdProfile} from './setting.interface';

@Pipe({
  name: 'ThresholdPipe'
})
export class ThresholdPipe implements PipeTransform{

  transform(allThreshold: ThresholdProfile[], arg?: String) {
    return allThreshold.filter( (threshold:ThresholdProfile) => {
      if (arg === "all") {
        return threshold;
      } else {
        return threshold.project === arg;
      }
    });
  }

}
