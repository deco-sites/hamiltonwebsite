import Searchbar from "$store/islands/HeaderSearchbar.tsx";
import Buttons from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";

function Navbar({ items, searchbar, logoPositionMobile, orderElement }: {
  items: INavItem[];
  searchbar: SearchbarProps;
  logoPositionMobile?: "left" | "right" | "center";
  orderElement?: {
    menu?: 1 | 2 | 3 | 4
    logo?: 1 | 2 | 3 | 4
    search?: 1 | 2 | 3 | 4
    cart?: 1 | 2 | 3 | 4
  }
}) {
  const logoPosition = logoPositionMobile === "center"
    ? "justify-center"
    : (logoPositionMobile === "right" ? "justify-end" : "");
  
  const orderVariants = {
    1: 'order-1',
    2: 'order-2',
    3: 'order-3',
    4: 'order-4',
  }

  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6 gap-2"
      >
        <Buttons variant="menu" orderElement={orderElement}/>

        <a
          href="/"
          class={`flex-grow inline-flex items-center ${logoPosition} ${orderElement?.logo && orderVariants[orderElement.logo]}`}
          style={{ minHeight: navbarHeight }}
          aria-label="Store logo"
        >
          <div className="w-16 h-16 bg-cover bg-[url('https://merciwithlove.vteximg.com.br/arquivos/logo@2x.png')]"></div>
          {/* <Icon id="Logo" width={126} height={16} /> */}
        </a>

        {/* <div class="flex gap-1"> */}
          <Buttons variant="search" orderElement={orderElement}/>
          <Buttons variant="cart" orderElement={orderElement} />
        {/* </div> */}
      </div>

      {/* Desktop Version */}
      <div class="hidden md:flex flex-row justify-between items-center border-b border-base-200 w-full pl-2 pr-6">
        <div class="flex-none w-44">
          <a href="/" aria-label="Store logo" class="block px-4 py-3 w-[160px]">
            <Icon id="Logo" width={126} height={16} />
          </a>
        </div>
        <div class="flex-auto flex justify-center">
          {items.map((item) => <NavItem item={item} />)}
        </div>
        <div class="flex-none w-44 flex items-center justify-end gap-2">
          <Buttons variant="search" />
          <Searchbar searchbar={searchbar} />
          <a
            class="btn btn-square btn-ghost"
            href="/login"
            aria-label="Log in"
          >
            <Icon id="User" width={20} height={20} strokeWidth={0.4} />
          </a>
          <a
            class="btn btn-square btn-ghost"
            href="/wishlist"
            aria-label="Wishlist"
          >
            <Icon
              id="Heart"
              size={20}
              strokeWidth={2}
              fill="none"
            />
          </a>
          <Buttons variant="cart" />
        </div>
      </div>
    </>
  );
}

export default Navbar;
