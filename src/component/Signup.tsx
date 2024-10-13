import { Icon } from "@iconify/react/dist/iconify.js";
import atmImage from "../assets/Group11.png";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type formData = {
  email: string;
  date: string;
  password: string;
};

const SignUp = () => {
  // scheme input
  const schema: ZodType<formData> = z.object({
    email: z.string().email({ message: "This is not a valid email" }),
    date: z.string().refine(
      (val) => {
        const date = new Date(val);
        return date >= new Date("1950-01-01") && date <= new Date("1999-01-01");
      },
      { message: "Date must be between 1950 and 1999." }
    ),
    password: z
      .string()
      .min(5, { message: "Your Password is too short" })
      .max(10, { message: "Your password is too long" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({ resolver: zodResolver(schema) });

  const formSubmit = (data: formData) => {
    console.log(data);
  };

  return (
    <div className="py-10 w-full text-white ">
      <div className="my-5 w-full flex justify-center flex-col items-center">
        <h1 className="flex items-center text-sm gap-3 text-white">
          Go back to Home
          <Icon icon="ic:baseline-home" className="text-lg" />
        </h1>
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="my-5 flex justify-center w-full max-w-[54rem] shadow-lg shadow-appCyan/15"
        >
          <div className="bg-appfadeGray px-5 py-3 w-full">
            <h2 className="font-bold text-2xl text-white mb-5">
              Sign in to OnePoint
            </h2>

            <div className="my-3">
              <div>
                <label htmlFor="" className="my-2">
                  Email Address
                </label>
                <div className="my-3 w-full">
                  <input
                    type="text"
                    placeholder="youremail@gmail.com"
                    {...register("email")}
                    className="py-3 px-4 w-full max-w-[23rem] rounded-md outline-slate-700 bg-appfadeGray/70 border border-appCyan/70"
                  />
                  {errors.email && (
                    <h3 className="text-[#f5314b] text-sm">
                      {errors.email.message}
                    </h3>
                  )}
                </div>
                <label htmlFor="" className="my-2">
                  Enter Date
                </label>
                <div className="my-3 w-full">
                  <input
                    type="date"
                    placeholder="Enter date of birth"
                    {...register("date")}
                    className="py-3 px-4 w-full max-w-[23rem] rounded-md outline-slate-700 bg-appfadeGray/70 border border-appCyan/70"
                  />
                  {errors.date && (
                    <span className="text-[#f5314b] text-sm">
                      {errors.date.message}
                    </span>
                  )}
                </div>

                <label htmlFor="" className="my-2">
                  Password
                </label>
                <div className="my-3">
                  <input
                    type="password"
                    placeholder="set password"
                    {...register("password")}
                    className="py-3 px-4 w-full max-w-[23rem] rounded-md outline-slate-700 bg-appfadeGray/70 border border-appCyan/70"
                  />
                  {errors.password && (
                    <span className="text-[#f5314b] text-sm">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="my-6">
              <div className="flex items-center gap-3 my-3 ">
                <div className="border-b-[1.3px] border-b-gray-500 w-full max-w-[10rem]"></div>
                <p>Or</p>
                <div className="border-b-[1.3px] border-b-gray-500 w-full max-w-[10rem]"></div>
              </div>
              <div className="flex items-center py-3 my-3 justify-center gap-3 w-full mx-auto">
                <Icon icon="flat-color-icons:google" className="text-xl" />
                <h2 className="text-base text-white/90">Sign up with Google</h2>
              </div>
            </div>
            <button className="w-full text-white bg-appCyan max-w-[23rem] my-5 text-base font-semibold py-3.5 rounded-md px-4">
              Sign Up free
            </button>
          </div>
          <div className="bg-appCyan/80 py-3 px-4 w-full max-w-[27rem] flex items-center">
            <img src={atmImage} alt="/" className="w-[500px]" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
