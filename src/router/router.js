import MainView from "@/views/MainView"
import PurchaseView from "@/views/PurchaseView"
import TripsView from "@/views/TripsView"
import LoginView from "@/views/LoginView"
import AdminView from "@/views/AdminView"
import FeedbacksView from "@/views/FeedbacksView"
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        component: MainView
    },
    {
        path: '/purchase',
        component: PurchaseView
    },
    {
        path: '/trips',
        component: TripsView
    },
    {
        path: '/feedbacks',
        component: FeedbacksView
    },
    {
        path: '/login',
        component: LoginView
    },
    {
        path: '/admin',
        component: AdminView
    }
]
const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;

