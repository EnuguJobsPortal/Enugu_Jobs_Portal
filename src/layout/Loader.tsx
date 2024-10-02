import animation from "@/assets/images/ripple-loader.gif";
import { LoaderProps } from "@/interfaces/layout.interface";

const Loader = (props: LoaderProps) => {
    const { showTitle, title } = props;

    return (
        <div className=" w-full h-screen flex justify-center items-center">
            {showTitle && <h1>{title}</h1>}
            <div className="w-full h-full flex justify-center items-center">
                <img src={animation} alt="loader" className=" w-45 h-45 object-cover" />
            </div>
        </div>
    );
};

export default Loader;