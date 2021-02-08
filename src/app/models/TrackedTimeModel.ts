import {TaskModel} from './TaskModel';
import {Model} from './Model';

export interface TrackedTimeModel extends Model{
  task: TaskModel | string;
  startTime: number;
  endTime?: number;
  status: 'started' | 'finished' | 'neutral';
}
