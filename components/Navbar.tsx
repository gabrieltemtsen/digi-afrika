import { ConnectButton } from "@rainbow-me/rainbowkit";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <Head>
        <title>DigiAFrika</title>
        <meta
          content="Buy and Sell Digital Services withiin an Escrow Framework"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <div className="mb-1 mt-2 p-5 navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Digi-Afrika</a>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  width="50"
                  height="20"
                  alt="avatar"
                  src="/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              {/* <li><a>Settings</a></li>
        <li><a>Logout</a></li> */}
            </ul>
          </div>
          <ConnectButton
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
            showBalance={{
              smallScreen: false,
              largeScreen: false,
            }}
            chainStatus="icon"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
