import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import MyScheduleView from "@/views/MyScheduleView.vue";
import ScheduleDetail from "@/components/ScheduleDetail.vue";
import ScheduleList from "@/components/ScheduleList.vue";
import ReviewView from "@/views/ReviewView.vue";
import ReviewList from "@/components/ReviewList.vue";
import ReviewDetail from "@/components/ReviewDetail.vue";
import TourInfoView from "@/views/TourInfoView.vue";
import PlanBoardView from "@/views/PlanBoardView.vue";
import PlanList from "@/components/plan/PlanList.vue";
import PlanDetail from "@/components/plan/PlanDetail.vue";

import store from "@/store";

Vue.use(VueRouter);

const onlyAuthUser = async (to, from, next) => {
    const checkUserInfo = store.getters["memberStore/checkUserInfo"];
    const checkToken = store.getters["memberStore/checkToken"];
    let token = sessionStorage.getItem("access-token");
    console.log("로그인 처리 전", checkUserInfo, token);

    if (checkUserInfo != null && token) {
        console.log("토큰 유효성 체크하러 가자!!!!");
        await store.dispatch("memberStore/getUserInfo", token);
    }
    if (!checkToken || checkUserInfo === null) {
        alert("로그인이 필요한 페이지입니다..");
        // next({ name: "login" });
        router.push({ name: "login" });
    } else {
        console.log("로그인 했다!!!!!!!!!!!!!.");
        next();
    }
};

const routes = [
    {
        path: "/",
        name: "HomeView",
        component: HomeView,
    },
    {
        path: "/plan",
        name: "PlanBoardView",
        component: PlanBoardView,
        redirect: "/plan/list",
        children: [
            {
                path: "list",
                name: "planList",
                beforeEnter: onlyAuthUser,
                component: PlanList,
            },
            {
                path: "detail/:plan_id",
                name: "planDetail",
                beforeEnter: onlyAuthUser,
                component: PlanDetail,
            },
        ],
    },
    {
        path: "/tourinfo",
        name: "TourInfoView",
        component: TourInfoView,
    },
    {
        path: "/login",
        name: "LoginView",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
    },
    {
        path: "/schedule",
        name: "schedule",
        component: MyScheduleView,
        redirect: "/schedule/list",
        children: [
            {
                path: "list",
                name: "scheduleList",
                beforeEnter: onlyAuthUser,
                component: ScheduleList,
            },
            {
                path: "detail/:schedule_id",
                name: "scheduleDetail",
                beforeEnter: onlyAuthUser,
                component: ScheduleDetail,
            },
        ],
    },
    {
        path: "/review",
        name: "review",
        component: ReviewView,
        redirect: "/review/list",
        children: [
            {
                path: "list",
                name: "reviewList",
                component: ReviewList,
            },
            {
                path: "detail/:review_id",
                name: "reviewDetail",
                component: ReviewDetail,
            },
        ],
    },
];

const router = new VueRouter({
    routes,
});

export default router;
