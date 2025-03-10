// 引入頁面組件
import Sign from './pages/Sign';
import Register from './pages/Register';
import HomePage from './pages/HomePage';

// 定義路由路徑常量
export const ROUTES = {
    HOME: '/',
    SIGN: '/sign',
    REGISTER: '/register'
};

// 定義路由配置
export const routes = [
    {
        path: ROUTES.HOME,
        element: HomePage,
        title: '首頁'
    },
    {
        path: ROUTES.SIGN,
        element: Sign,
        title: '登入'
    },
    {
        path: ROUTES.REGISTER,
        element: Register,
        title: '註冊'
    }
];

// 導出所有路由配置
export default routes;
