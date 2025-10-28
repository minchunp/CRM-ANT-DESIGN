import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
   const { theme, toggleTheme } = useTheme();

   return (
      <button
         className="
            mb-2
            cursor-pointer
            w-[125px]
            h-7
            flex
            items-center
            justify-center
            gap-4
            text-[.75em]
            font-extrabold
            tracking-[2px]
            text-white
            bg-[#644dff]
            border-2
            border-[#4836bb]
            rounded-xl
            shadow-[0_8px_0_#4836bb]
            -skew-x-10
            transition-all
            duration-100
            ease-in-out
            filter-[drop-shadow(0_15px_20px_#654dff63)]
            active:tracking-[0px]
            active:translate-y-2
            active:shadow-[0_0_0_#654dff63]
         "
         onClick={toggleTheme}
      >
         {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
   );
};

export default ThemeToggle;
