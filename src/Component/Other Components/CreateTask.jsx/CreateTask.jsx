import { useForm } from "react-hook-form";
import { useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Authentication/AuthProvider";

const CreateTask = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        const temp = {
            ...data,
            "like": 0,
            "dislike": 0,
            "surveyor": user.email,
            "vote": {
                "yes": 0,
                "no": 0
            },
            "voted": [],
            "likesBy": [],
            "dislikesBy": [],
            "timestamp": new Date(),
            "status": "pending",
            "feedback": [],
            "comment": [],
            "report": [],
            "adminFeedback": "",
            "feelBackBy": []
        }
        console.log(temp);

        // axiosSecure.post('/createsurvey', temp)
        //     .then(res => {
        //         console.log(res.data)
        //         Swal.fire({
        //             title: "Congratulation!",
        //             text: "Your survey has been created.",
        //             icon: "success"
        //         });
        //         reset();
        //         navigate('/dashboard/mypostedsurvey')
        //     })

    }

    return (
        <div>
            <div className="relative border-s-8 border-gray-700 ps-3">
                <h2 className="text-6xl font-bold z-20">Create Task</h2>
                <p className="absolute bottom-0 text-6xl md:text-7xl lg:text-9xl z-10 opacity-5 overflow-hidden">Create Task</p>
            </div>
            <div>
                <form className="p-5 rounded-lg mb-5" onSubmit={handleSubmit(onSubmit)}>

                    <div className="flex gap-4">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Survey Title*</span>
                            </label>
                            <input required {...register("title")} type="text" placeholder="Title" className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Category*</span>
                            </label>
                            <select required defaultValue='default' {...register("category")} className="select select-bordered">
                                <option disabled hidden value='default'>category</option>
                                <option value='Food'>Food</option>
                                <option value='Travel'>Travel</option>
                                <option value='Education'>Education</option>
                                <option value='Health'>Health</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Question*</span>
                        </label>
                        <input required {...register("questionOne")} type="text" placeholder="Your question" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Survey details*</span>
                        </label>
                        <textarea required {...register("description")} className="textarea textarea-bordered h-24" placeholder="About Survey"></textarea>
                    </div>
                    {/* errors will return when field validation fails  */}
                    <br />
                    <input className="btn btn-active btn-neutral px-8 w-full " type="submit" />
                </form>
            </div>
        </div>
    );
};

export default CreateTask;