import { Metadata } from "next";

export const dynamic = "force-static"; // no necessary, just for demonstration

export const metadata: Metadata = {
    title: "About Us",
    description: "About The Social Space Company",
};

const AboutPage = async () => {
    return (
        <main>
            <h1>About</h1>
            <p>We are a social media company!</p>
        </main>
    );
};

export default AboutPage;
