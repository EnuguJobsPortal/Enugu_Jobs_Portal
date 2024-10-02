import bg from "@/assets/images/bg3.jpg";
import logoDark from "@/assets/images/enugu-jobs-logo-dark.png";
import slider5 from "@/assets/images/slider5.jpg";
import ControlledInput from "@/components/shared/ControlledInput";
import { useBreadCrumbContext } from "@/context/BreadCrumbContext";
import { useLoading } from "@/context/LoadingContext";
import { useSweetAlert } from "@/context/SweetAlertContext";
import { useSignIn } from "@/hooks/queries/auth";
import { ISignInDTO } from "@/interfaces/dto";
import { ILoginResponse } from "@/interfaces/response.interface";
import Auth from "@/utils/auth";
import { signInDefaultValues } from "@/validations/defaults";
import { signInResolver } from "@/validations/resolvers";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {

	const { setBreadCrumb } = useBreadCrumbContext();
	const { showLoading, hideLoading } = useLoading();
	const { showError } = useSweetAlert();
	const { setToken } = Auth;
    const navigate = useNavigate();

	const onSuccess = (values: ILoginResponse) => {
		hideLoading();
		setToken(values.token);
      
		setTimeout(() => {
			navigate('/admin/dashboard');
		}, 1000);
	}

	const onError = (value: string) => {
		hideLoading();
		showError("Attention!!!", value);
	}

	const { control, handleSubmit, formState: { errors }} = useForm<ISignInDTO>({
        defaultValues: signInDefaultValues, 
        resolver: signInResolver
    });

	const { loginMutation, loggingIn } = useSignIn({onSuccess, onError});

	const onSubmit = (values: ISignInDTO) => {
		const payload = values;
		loginMutation({ payload });
	}

	if(loggingIn)
	{
		showLoading();
	}

	useEffect(() => {
        if (setBreadCrumb) {
            setBreadCrumb({
                current: 'Home',
                isBack: true,
                isVisible: false,
            });
        }
    }, [setBreadCrumb])

	return (
		<div className="min-h-screen flex">
			<div className="hidden md:block md:w-1/2 bg-cover bg-center h-screen">
				<img
					src={slider5}
					alt="Background"
					className="w-full h-full object-cover"
				/>
			</div>

			<div 
				className="w-full md:w-1/2 p-6 md:p-12 flex items-center justify-center"
				style={{
					background: `url('${bg}')`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
				
			>
				<div className="w-full max-w-md">
					<div className="text-center mb-8 mt-0">
						<img
							src={logoDark}
							alt="Logo"
							className="w-5/12 h-10 mx-auto mb-4"
						/>
					</div>
					<h1 className="text-xl font-bold text-gray-900">Sign In</h1>
					<form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
						<div className="mb-4">
							<ControlledInput
                                label="Email Address"
                                control={control}
                                name="Email"
                                placeholder="Email Address"
                                type="email"
                                error={errors["Email"]}
                                isRequired
                            />
						</div>
						<div className="mb-6">
							<ControlledInput
                                label="Password"
                                control={control}
                                name="Password"
                                placeholder="*****"
                                type="password"
                                error={errors["Password"]}
                                isRequired
                            />
						</div>
						<button
							type="submit"
							className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
						>
							Sign In
						</button>		
					</form>
					<div className="flex items-center justify-between mt-2">
						<div className="flex items-center">
							<input
								type="checkbox"
								className="form-checkbox text-blue-500"
							/>
							<span className="ml-2 text-gray-700 text-sm font-normal">
								Remember Me
							</span>
						</div>
						<Link to="/forgot-password" className="text-blue-500 text-sm">
							Forgot Password?
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SignIn;