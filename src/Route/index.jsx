import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Profile from "../Pages/Profile";
import Explore from "../Pages/Explore";
import FollowingPost from "../Pages/Followingpost";
import UpdateProfile from "../Pages/Updateprofile";
import GetFollowing from "../Pages/Getfollowing";
import GetFollower from "../Pages/Getfollower";
import Logout from "../Pages/Logout";
import ProtectedRoute from "./protectedRoute";
import DetailUserById from "../Pages/DetailUserById";
import DetailStory from "../Pages/DetailStory";
import GetFollowingById from "../Pages/Getfollowingbyid";
import GetFollowerById from "../Pages/Getfollowerbyid";
import DetailPost from "../Pages/DetailPost";
import UploadImageAndCreatePost from "../Pages/Uploadimage";





export const routes = [
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/userprofile",
        element: (
            <ProtectedRoute>
                <Profile/>
            </ProtectedRoute>
        ) 
    },
    {
        path: "/explore",
        element: (
            <ProtectedRoute>
                <Explore />

            </ProtectedRoute>
        )
    },
    {
        path: "/followingpost",
        element: (
            <ProtectedRoute>
                <FollowingPost />

            </ProtectedRoute>
        )
    },
    {
        path: "/updateprofile",
        element: <UpdateProfile />
    },
    {
        path:"/following",
        element: (
            <ProtectedRoute>
                <GetFollowing />
            </ProtectedRoute>
        )
    },
    {
        path: "/follower",
        element: (
            <ProtectedRoute>
                <GetFollower />

            </ProtectedRoute>
        ) 
    },
    {
        path: `/detailuserbyid/:userId`,
        element: (
            <ProtectedRoute>
                <DetailUserById />

            </ProtectedRoute>
        ) 
    },
    {
        path: '/detailstory/:storyId',
        element: (
            <ProtectedRoute>
                <DetailStory/>

            </ProtectedRoute>
        ) 
    },
    {
        path: "/logout",
        element: <Logout />
    },
    {
        path: "/uploadimage",
        element: <UploadImageAndCreatePost />
    },
    {
        path: "/getfollowingbyid/:userId",
        element: <GetFollowingById/>
    },
    {
        path: "/getfollowerbyid/:userId",
        element: <GetFollowerById/>
    },
    {
        path: "/detailpostbyid/:postId",
        element: <DetailPost />
    }
]