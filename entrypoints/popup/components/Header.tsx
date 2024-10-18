import { logoSvgIcon } from "@/assets";

const Header = () => {
  return (
    <header className="grid place-items-center py-4 gap-3">
      <img
        src={logoSvgIcon}
        alt="LinkedIn AI Reply Logo"
        className="shadow-sm shadow-black/30 hover:shadow-md hover:shadow-black/50 transition-all duration-300 ease-in-out rounded-full h-12 w-12 p-2 bg-slate-50 hover:bg-white"
      />
      <h1 className="text-xl font-semibold tracking-wider">
        LinkedIn AI Reply
      </h1>
    </header>
  );
};

export default Header;
