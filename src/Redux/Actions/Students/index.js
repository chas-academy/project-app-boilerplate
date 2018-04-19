import _ from 'lodash';
import { SELECT_STUDENT } from './Types';

export function selectStudent(student, index, { Students }) {
  Students = _.merge({}, Students, {
    activeStudent: student,
    selectedStudent: index,
  });
  console.log(Students);
  return { type: SELECT_STUDENT, Students };
}
