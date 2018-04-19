import { SELECT_STUDENT } from '../Actions/Students/Types';

const DEFAULT_STATE = {
  activeStudent: {},
  selectedStudent: null,
};

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SELECT_STUDENT:
      return action.Students;
    default:
      return state;
  }
}
