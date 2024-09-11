import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./AuthSlice";
import CourseSlice from "./CourseSlice";
import DrawerSlice from "./DrawerSlice";
import PaymentSlice from "./PaymentSlice";
import StatisticSlice from "./StatisticsSlice";



const store = configureStore({
    reducer: {
        Auth: AuthSlice,
        Course: CourseSlice,
        Payment: PaymentSlice,
        Drawer: DrawerSlice,
        Statistics: StatisticSlice,
    }
})


export default store