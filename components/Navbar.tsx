import { motion } from "framer-motion";
import Link from "next/link";
import UserNav from "./UserNav";

interface SessionProp {
  session: any;
}

const Navbar: React.FC<SessionProp> = ({ session }) => {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={`flex flex-col h-max-full fixed top-0 left-0 right-0 z-40 `}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-b-lg shadow-lg shadow-black/20">
        <div className="flex justify-between px-2 md:px-12 py-2">
          <div className="px-4 py-2 text-gray-800 text-lg font-bold">
            <Link href="/">Qwibu</Link>
          </div>
          <div className="flex items-center gap-2">
            {session?.user ? (
              <div className="flex items-center text-sm">
                <UserNav profilna={session} color="gray-800" />
              </div>
            ) : (
              <div className="flex items-center text-sm gap-4">
                <Link
                  className="px-2 py-1 font-bold rounded-full text-gray-900"
                  href="/login"
                >
                  Prijavi se
                </Link>
                <Link
                  className="px-2 py-1 rounded-full bg-gray-900 text-white"
                  href="/register"
                >
                  Registruj se
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
