const maze = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 1, 1, 0],
  [0, 1, 0, 1, 1, 0, 1, 0, 0],
  [0, 1, 0, 1, 1, 1, 1, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0]
];
const path = [];
const start = [1, 7];

const checkVertical = (arr, y, x) => {
  const steps = [];

  if (y === 0) {
    if (arr[y+1][x]) {
      return [y+1, x];
    }
  }
  if (arr.length === y+1) {
    if (arr[y-1][x]) {
      return [y-1, x];
    }
  }
  if (arr[y-1][x]) {
    steps.push([y-1, x]);
  }
  if (arr[y+1][x]) {
    steps.push([y+1, x]);
  }
  return steps;
};

const checkGorizontal = (arr, y, x) => {
  const steps = [];

  if (x === 0) {
    if (arr[y][x+1]) {
      return [y, x+1];
    }
  }
  if (arr[y].length === x + 1) {
    if (arr[y][x-1]) {
      return [y, x-1];
    }
  }
  if (arr[y][x-1]) {
    steps.push([y, x-1]);
  }
  if (arr[y][x+1]) {
    steps.push([y, x+1]);
  }
  return steps;
};


const checkStep = (arr, x, y) => {
  // console.log('step');
  const optionalStep = [];
  const start = [y,x];
  if (y === 0 || y === maze.length - 1) {
    return console.log('Вы выиграли', path);
  }
  // console.log('start', start);
  const vertical = checkVertical(arr, ...start);
  // console.log('vertical', vertical);
  const gorizontal = checkGorizontal(arr, ...start);
  // console.log('gorizontal', gorizontal);

  if (vertical.length) {
    optionalStep.push(...vertical);
  };
  if (gorizontal.length) {
    optionalStep.push(...gorizontal);
  }
  // console.log("optional", optionalStep);
  path.push(optionalStep[0]);
  maze[y][x] = 0;
  // console.log('maze after step', maze);
  const item = optionalStep[0];
  checkStep(maze, item[1], item[0]);
};

checkStep(maze, start[1], start[0]);
// console.log(maze[1][2])
