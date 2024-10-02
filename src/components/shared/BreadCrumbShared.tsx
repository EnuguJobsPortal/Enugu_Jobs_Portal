import Breadcrumb from "@/components/shared/BreadCrumb";
//import { useActionButtonContext } from "@/context/ActionButtonContext";
import { useBreadCrumbContext } from "@/context/BreadCrumbContext";
import { IChildren } from "@/interfaces/general";
//import { Button } from "../ui/button";

const BreadcrumbShared = ({ children }: IChildren) => {
    const { breadCrumb } = useBreadCrumbContext();
    //const { actionBtn } = useActionButtonContext();

    return (
        <div>
            <div className="flex justify-between items-center flex-col sm:flex-row">
                {Boolean(breadCrumb?.isVisible) && (
                    <div className="grid">
                        <Breadcrumb
                            current={breadCrumb?.current || ""}
                            isBack={breadCrumb?.isBack}
                            links={breadCrumb?.links}
                        />
                    </div>
                )}
                {/* <div className="self-end md:self-center">
                    {actionBtn?.length && actionBtn?.length > 0 && actionBtn.map((field, idx) => (
                        <Button
                            className="bg-blue-600"
                            variant="default"
                            size="sm"
                            key={`${field.btntext}-${idx}`}
                            onClick={() => {
                                if (field.btnOnAction) {
                                    field.btnOnAction();
                                }
                            }}
                        >
                            {field.btntext}
                        </Button>
                    ))}
                </div> */}
            </div>
            <div className="grid">
                <div>{children}</div>
            </div>
        </div>
    );
};

export default BreadcrumbShared;
