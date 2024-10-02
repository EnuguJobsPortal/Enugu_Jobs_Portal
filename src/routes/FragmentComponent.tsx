import { IChildren, IRoleObject } from "@/interfaces/general";
import React from 'react';

const FragmentComponent = ({
    // eslint-disable-next-line no-unused-vars
    children,
}: { allowedRoles?: Array<IRoleObject[keyof IRoleObject]> } & IChildren) =>{
    return <React.Fragment>{children}</React.Fragment>;
}

export default FragmentComponent;