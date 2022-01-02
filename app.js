const maze = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 1, 1, 0],
  [0, 1, 0, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 1, 1, 1],
  [0, 1, 1, 1, 1, 0, 1, 0, 0],
  [0, 1, 0, 0, 1, 1, 1, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
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


const checkStep = (arr, y, x) => {
  // console.log('step');
  const optionalStep = [];
  if ((y === 0 || y === maze.length - 1) || x === 0 || x === maze[y].length - 1) {
    return console.log('Вы выиграли', path);
  }
  // console.log('start', y, x);
  const vertical = checkVertical(arr, y, x);
  // console.log('vertical', vertical);
  const gorizontal = checkGorizontal(arr, y, x);
  // console.log('gorizontal', gorizontal);

  if (vertical.length) {
    optionalStep.push(...vertical);
  }
  if (gorizontal.length) {
    optionalStep.push(...gorizontal);
  }
  // console.log("optional", optionalStep);
  if (optionalStep.length) {
    // console.log('before add to path', optionalStep[0])
    path.push(optionalStep[0]);
    maze[y][x] = 0;
  } else {
    maze[y][x] = 0;
    // console.log(path[path.length-1]);
    path.splice(path.length-1, 1);
    const prevStep = path[path.length-1];
    // console.log("prevStep",prevStep);
    return checkStep(maze, prevStep[0], prevStep[1]);
  }

  // console.log('maze after step', maze);
  const item = optionalStep[0];
  return checkStep(maze, item[0], item[1]);
};

checkStep(maze, start[0], start[1]);
// console.log(maze[1][2])
