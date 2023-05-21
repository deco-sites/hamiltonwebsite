import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useCart } from "deco-sites/std/packs/vtex/hooks/useCart.ts";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

function SearchButton({ orderElement }: { orderElement?: string }) {
  const { displaySearchbar } = useUI();

  return (
    <Button
      class={`btn-square btn-ghost ${orderElement}`}
      aria-label="search icon button"
      onClick={() => {
        displaySearchbar.value = !displaySearchbar.peek();
      }}
    >
      <Icon id="MagnifyingGlass" width={20} height={20} strokeWidth={0.1} />
    </Button>
  );
}

function MenuButton({ orderElement }: { orderElement?: string }) {
  const { displayMenu } = useUI();

  return (
    <Button
      class={`btn-square btn-ghost ${orderElement}`}
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <Icon id="Bars3" width={20} height={20} strokeWidth={0.01} />
    </Button>
  );
}

function CartButton({ orderElement }: { orderElement?: string }) {
  const { displayCart } = useUI();
  const { loading, cart, mapItemsToAnalyticsItems } = useCart();
  const totalItems = cart.value?.items.length || null;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );

  const onClick = () => {
    displayCart.value = true;
    sendEvent({
      name: "view_cart",
      params: {
        currency: cart.value ? currencyCode! : "",
        value: total?.value
          ? (total?.value - (discounts?.value ?? 0)) / 100
          : 0,

        items: cart.value ? mapItemsToAnalyticsItems(cart.value) : [],
      },
    });
  };

  return (
    <Button
      class={`btn-square btn-ghost relative ${orderElement && orderElement}`}
      aria-label="open cart"
      data-deco={displayCart.value && "open-cart"}
      loading={loading.value}
      onClick={onClick}
    >
      <div class="indicator">
        {totalItems && (
          <span class="indicator-item badge badge-secondary badge-sm">
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
        <Icon id="ShoppingCart" width={20} height={20} strokeWidth={2} />
      </div>
    </Button>
  );
}

function Buttons(
  { variant, orderElement }: {
    variant: "cart" | "search" | "menu";
    orderElement?: {
      menu?: 1 | 2 | 3 | 4;
      logo?: 1 | 2 | 3 | 4;
      search?: 1 | 2 | 3 | 4;
      cart?: 1 | 2 | 3 | 4;
    };
  },
) {
  const orderVariants = {
    1: "order-1",
    2: "order-2",
    3: "order-3",
    4: "order-4",
  };
  if (variant === "cart") {
    return (
      <CartButton
        orderElement={orderElement?.cart && orderVariants[orderElement.cart]}
      />
    );
  }

  if (variant === "search") {
    return (
      <SearchButton
        orderElement={orderElement?.search &&
          orderVariants[orderElement.search]}
      />
    );
  }

  if (variant === "menu") {
    return (
      <MenuButton
        orderElement={orderElement?.menu && orderVariants[orderElement.menu]}
      />
    );
  }

  return null;
}

export default Buttons;
