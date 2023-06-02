import FollowButton from "@/app/components/FollowButton/FollowButton";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import Image from "next/image";

interface Props {
    params: {
        id: string;
    };
}

const getUserById = async (userId: string) => {
    return await prisma.user.findUnique({ where: { id: userId } });
};

export const generateMetadata = async ({
    params,
}: Props): Promise<Metadata> => {
    const user = await getUserById(params.id);
    return { title: `User profile of ${user?.name}` };
};

const UserProfile = async ({ params }: Props) => {
    const user = await getUserById(params.id);

    const { name, bio, image } = user ?? {};

    return (
        <div>
            <h1>{name}</h1>

            <Image
                width={300}
                height={300}
                src={image ?? "/mememan.webp"}
                alt={`${name}'s profile`}
            />

            <h3>Bio</h3>
            <p>{bio}</p>

            {/*@ts-expect-error Server Component */}
            <FollowButton targetUserId={params.id} />
        </div>
    );
};

export default UserProfile;
