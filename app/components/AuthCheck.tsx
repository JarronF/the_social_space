"use client";
import { stat } from "fs";
import { useSession } from "next-auth/react";

type Props = {
    children: React.ReactNode;
};

const AuthCheck = ({ children }: Props) => {
    const { data: session, status } = useSession();

    console.log(session, status);

    if (status !== "authenticated") return <></>;

    return <>{children}</>;
};

export default AuthCheck;
