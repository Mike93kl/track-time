import {ProjectModel} from './ProjectModel';
import {TrackedTimeModel} from './TrackedTimeModel';
import {Model} from './Model';

export interface TaskModel extends Model{
  project: ProjectModel | string;
  identifier: string;
  activeTracker?: TrackedTimeModel | string;
  trackedTimes?: TrackedTimeModel[] | string[];
}
