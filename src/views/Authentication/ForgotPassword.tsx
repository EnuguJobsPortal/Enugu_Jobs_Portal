import bg from "@/assets/images/bg.jpg";
import logoDark from "@/assets/images/enugu-jobs-logo-dark.png";
import slider5 from "@/assets/images/slider5.jpg";
import { useBreadCrumbContext } from "@/context/BreadCrumbContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {

	const { setBreadCrumb } = useBreadCrumbContext();

	useEffect(() => {
        if (setBreadCrumb) {
            setBreadCrumb({
				current: "Forgot Password",
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
					<h1 className="text-xl font-bold text-gray-900">Forgot Password</h1>
					<form className="mt-6">
						<div className="mb-4">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Email Address
							</label>
							<input
								type="email"
								className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
								placeholder="you@example.com"
							/>
						</div>
						<button
							type="submit"
							className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
						>
							Recover Password
						</button>		
					</form>
					<div className="flex items-center justify-between mt-2">
                        <Link to="/" className="text-blue-500 text-sm">
							Back to Home
						</Link>
						<Link to="/signin" className="text-blue-500 text-sm">
							Sign me back In
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ForgotPassword;