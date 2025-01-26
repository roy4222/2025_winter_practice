// 定義蛇的初始狀態
const defaultSnake = {
    head: { x: 2, y: 10 },          // 蛇頭的初始位置
    bodyList: [                     // 蛇身的初始位置列表
        { x: 1, y: 0 },
        { x: 0, y: 0 },
    ],
    maxLength: 3,                   // 蛇的最大長度
    direction: ARROW_RIGHT,         // 蛇的初始移動方向
    Speed: SNAKE_INITIAL_SPEED,     // 蛇的初始移動速度
};
// 定義一個創建食物的函數
const CreateFood = () => {
    // 返回一個包含隨機 x 和 y 坐標的物件
    return {
        // 生成一個在 0 到 GRID_SIZE-1 之間的隨機整數作為 x 坐標
        x: Math.floor(Math.random() * GRID_SIZE),
        // 生成一個在 0 到 GRID_SIZE-1 之間的隨機整數作為 y 坐標
        y: Math.floor(Math.random() * GRID_SIZE)
    }
}

const SnakeGame = () => {
    const [snake, setSnake] = useState(defaultSnake);
    const [food, setFood] = useState(CreateFood());
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [score, setScore] = useState(0);

    return (
        <Background>
            <Container>
                <Infornation/>
                <MainMap/>
                <Actions/>
            </Container>
        </Background>
    )
}