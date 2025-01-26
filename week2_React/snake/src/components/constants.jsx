//地圖為30x30格子
export const GRID_SIZE = 30; 

// 定義蛇的初始速度（毫秒）
export const SNAKE_INITIAL_SPEED = 200;

export const PAGE_PADDING = 8;
export const MAX_WIDTH = 700;


// 定義方向鍵常量
export const ARROW_UP = 'ArrowUp';
export const ARROW_DOWN = 'ArrowDown';
export const ARROW_LEFT = 'ArrowLeft';
export const ARROW_RIGHT = 'ArrowRight';
export const SPACE = 'Space';

// 定義方向對應的坐標變化
const direction = {
    [ARROW_UP]: { x: 0, y: -1 },    // 向上移動：y減少
    [ARROW_DOWN]: { x: 0, y: 1 },   // 向下移動：y增加
    [ARROW_LEFT]: { x: -1, y: 0 },  // 向左移動：x減少
    [ARROW_RIGHT]: { x: 1, y: 0 },  // 向右移動：x增加
}

export default direction;