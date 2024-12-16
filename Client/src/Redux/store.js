import { configureStore } from "@reduxjs/toolkit";

import AuthSlice from "./AuthSlice";
import CourseSlice from "./CourseSlice";
import DrawerSlice from "./DrawerSlice";
import NavbarSlice from "./NavbarSlice";
import PaymentSlice from "./PaymentSlice";
import StatisticSlice from "./StatisticsSlice";



const store = configureStore({
    reducer: {
        Auth: AuthSlice,
        Course: CourseSlice,
        Payment: PaymentSlice,
        Drawer: DrawerSlice,
        Statistics: StatisticSlice,
        Navbar: NavbarSlice,
    }
})


export default store