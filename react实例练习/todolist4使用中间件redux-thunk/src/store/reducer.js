import {
  CHANGE_INPUT_VALUE,
  ADD_TODO_ITEM,
  DELETE_TODO_ITEM,
  INIT_LIST_ACTION,
} from "./actionTypes";

const defaultState = {
  inputValue:'',
  list:[]
}
// 纯函数指的是 给定固定的输入，就一定有固定的输出，而且不会有任何副作用（不能做修改）
export default (state = defaultState, action) => {
  console.log('action',action)
  if (action.type === CHANGE_INPUT_VALUE) {
    // 只有store 能够改变自己的内容
    // reducer 可以接受一个state，但是绝对不能改变state，所以需要重新拷贝一份 state
    // 故不能这么写 state.inputValue = action.value
    const newState = JSON.parse(JSON.stringify(state));

    newState.inputValue = action.value;
    return newState;
  }
  if (action.type === ADD_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.push(newState.inputValue);
    newState.inputValue = "";
    return newState;
  }
  if (action.type === DELETE_TODO_ITEM) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index, 1);
    return newState;
  }
  if (action.type === INIT_LIST_ACTION) {
    const newState = JSON.parse(JSON.stringify(state));
    newState.list = action.data
    return newState;
  }
  return state;
};