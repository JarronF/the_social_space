"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface Props {
    targetUserId: string;
    isFollowing: boolean;
}

const FollowClient = ({ targetUserId, isFollowing }: Props) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);
    const isMutating = isFetching || isPending;

    const follow = async () => {
        setIsFetching(true);

        const result = await fetch("/api/follow", {
            method: "POST",
            body: JSON.stringify(targetUserId),
            headers: {
                "Content-Type": "application/json",
            },
        });

        setIsFetching(false);
        console.log(result);

        startTransition(() => {
            router.refresh();
        });
    };
    const unFollow = async () => {
        setIsFetching(true);
        const result = await fetch(`/api/follow?targetUserId=${targetUserId}`, {
            method: "DELETE",
        });

        setIsFetching(false);
        startTransition(() => router.refresh());
    };

    if (isFollowing) {
        return (
            <button onClick={unFollow}>
                {!isMutating ? "Unfollow" : "..."}
            </button>
        );
    }

    return <button onClick={follow}>{!isMutating ? "Follow" : "..."}</button>;
};

export default FollowClient;
