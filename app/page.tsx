import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import styles from "./page.module.css";

const Home = async () => {
    const session = await getServerSession();

    if (!session) {
        redirect("/api/auth/signin");
    }

    return (
        <main className={styles.main}>
            <h1>Home</h1>
            <p>Authenticated!</p>
        </main>
    );
};
export default Home;
