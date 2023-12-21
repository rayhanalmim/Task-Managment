import { Link } from "react-router-dom";
import TaskDashboard from "./TaskDashboard";
import { useContext } from "react";
import { AuthContext } from "../../Authentication/AuthProvider";

const Home = () => {
    const { user } = useContext(AuthContext)
    return (
        <div>
            <div className="bg-[url('https://i.ibb.co/P1yRjtn/jason-goodman-vbxy-Fxlgpj-M-unsplash-scaled-e1695364489124.webp')] bg-cover bg-center h-3/4 md:h-full w-full rounded bg-fixed">
                <div className="text-center inset-0 bg-black bg-opacity-60 bg-blend-multiply py-36 space-y-3">
                    <h3 className="text-gray-50 text-3xl font-bold">Find Your Focus</h3>
                    <p className="text-gray-100 font-medium w-full md:w-2/3 mx-auto">Introducing Effortless Organizer, where simplicity meets sophistication in the realm of task management. Take control of your day with a tool that adapts to your needs seamlessly. Effortless Organizer is more than just a task manager; it's a companion in your journey towards enhanced productivity. Dive into a user-friendly interface that empowers you to prioritize, collaborate, and accomplish tasks with unmatched ease. Your daily tasks, now effortlessly organized and optimized for success</p>
                    <div>
                        {
                            user ? <Link to='mytask'><button className="btn btn-active hover:bg-[#01013D] btn-secondary bg-gray-900 border-0 tracking-widest">Let’s Explore</button></Link> :
                                <Link to='/SingIn'><button className="btn btn-active hover:bg-[#01013D] btn-secondary bg-gray-900 border-0 tracking-widest">Let’s Explore</button></Link>
                        }
                    </div>
                </div>
                <footer className="footer bg-black bg-opacity-80 footer-center p-4 text-gray-100">
                <aside>
                    <p>Copyright © 2023 - All right reserved by ZenTask Ltd</p>
                </aside>
            </footer>
            </div>

          
        </div>
    );
};

export default Home;