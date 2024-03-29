import { useForm } from "react-hook-form";
import { useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Authentication/AuthProvider";
import axios from "axios";

const CreateTask = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        const temp = {
            ...data
        }
        console.log(temp);

        axios.post(`http://localhost:5000/createTask?user=${user.email}`, temp)
            .then(res => {
                console.log(res.data)
                Swal.fire({
                    title: "Congratulation!",
                    text: "Your task has been created.",
                    icon: "success"
                });
                reset();
                // navigate('/mytask')
            })

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
                                <span className="label-text font-semibold">Task Title*</span>
                            </label>
                            <input required {...register("content")} type="text" placeholder="Title" className="input input-bordered w-full" />
                        </div>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-semibold">Priority*</span>
                            </label>
                            <select required defaultValue='default' {...register("category")} className="select select-bordered">
                                <option disabled hidden value='default'>priority level</option>
                                <option value='Low'>Low</option>
                                <option value='moderate'>moderate</option>
                                <option value='high'>high</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Deadline*</span>
                        </label>
                        <input required {...register("deadline")} type="date" placeholder="Your question" className="input input-bordered w-full" />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Task descriptions*</span>
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