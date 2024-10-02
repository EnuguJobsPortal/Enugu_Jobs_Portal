import bg from "@/assets/images/bg3.jpg";
import logoDark from "@/assets/images/enugu-jobs-logo-dark.png";
import slider5 from "@/assets/images/slider5.jpg";
import { useBreadCrumbContext } from "@/context/BreadCrumbContext";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
	const { setBreadCrumb } = useBreadCrumbContext();

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
                    <div className="flex justify-center items-center flex-col gap-6">
                        <h1 className="text-lg font-bold text-gray-900">Welcome Back!</h1>
                        <p style={{ textAlign: 'justify', lineHeight: '26px'}} className="text-sm">
                            Welcome back, esteemed administrator. We are honored by your return and the invaluable leadership you bring to our platform. Your dedication and expertise have a lasting impact on our community. Thank you for your unwavering commitment
                        </p>
                        <button
							type="button"
							className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                            onClick={() => navigate("/signin")}
						>
							Sign In
						</button>
                        <button
							type="button"
							className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                            onClick={() => navigate("/forgot-password")}
						>
							Retrieve Password
						</button>
                        {/* <div className="flex justify-center items-center gap-6">
                            <button className="text-blue-500 hover:underline">
                                Sign Me In
                            </button>
                            <button className="text-blue-500 hover:underline">
                                Retrieve Password
                            </button>

                        </div> */}
                    </div>
                    
					{/* <form className="mt-6">
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
						<div className="mb-6">
							<label className="block text-gray-700 text-sm font-bold mb-2">
								Password
							</label>
							<input
								type="password"
								className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
								placeholder="Your password"
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
					</div> */}
				</div>
			</div>
		</div>
	);
}

export default Home;