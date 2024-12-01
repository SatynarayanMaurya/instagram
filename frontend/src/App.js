
import {Routes, Route} from "react-router-dom"
import Homepage from "./Pages/HomePage/Homepage";
import Mainbar from "./Pages/HomePage/Mainbar"
import Explore from "./Pages/HomePage/Explore";
import Profile from "./Pages/HomePage/Profile";
import SignupPage from "./Pages/Auth/SignupPage";
import LoginPage from "./Pages/Auth/LoginPage";
import Create from "./Pages/HomePage/Create";
import PrivateRoute from "./Pages/PrivateRoute/PrivateRoute";
import EditProfile from "./Pages/HomePage/EditProfile";
import Reels from "./Pages/HomePage/Reels";
import AnotherAccountPage from "./Pages/HomePage/MorePages/AnotherAccountPage";


function App() {

  return (
    <div>

      <Routes>

          <Route path="/" element={
                                    <PrivateRoute>
                                      <Homepage/>
                                    </PrivateRoute>
                                  }>

            <Route path="/" element={<Mainbar/>}/>
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/reels" element={<Reels/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/createPost" element={<Create/>}/>
            <Route path="/edit-profile" element={<EditProfile/>}/>
            <Route path="/account/:userId" element={<AnotherAccountPage/>}/>


          </Route>

          <Route path="/signup" element={<SignupPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
