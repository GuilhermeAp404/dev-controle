import {DashboardHeader}  from "./components/header";
import { ReactNode } from "react";


export default async function DashboardLayout(
    {children}:{children:ReactNode}
) {

    return (
        <>  
            <DashboardHeader/>
            {children}
        </>
    )
}
