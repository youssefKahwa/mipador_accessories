import { create } from "zustand";
import { persist } from "zustand/middleware";
import { products as allProductsData } from "../data/products";
import type { AccessoryType } from "../data/products";
export type { Product } from "../data/products";

type SortBy = "featured" | "price-asc" | "price-desc" | "name";
type GenderFilter = "all" | "men" | "women" | "unisex";

export interface CartItem {
  productId: string;
  quantity: number;
}

interface ProductStore {
  allProducts: typeof allProductsData;

  // Filters
  searchQuery: string;
  selectedAccessoryType: AccessoryType | "All";
  selectedCategory: string;
  selectedCollection: string;
  genderFilter: GenderFilter;
  sortBy: SortBy;
  inStockOnly: boolean;
  currentPage: number;

  // Cart
  cart: CartItem[];
  cartOpen: boolean;

  // Wishlist
  wishlist: string[];

  // Quick view
  quickViewId: string | null;

  // Actions
  setSearchQuery: (q: string) => void;
  setSelectedAccessoryType: (type: AccessoryType | "All") => void;
  setSelectedCategory: (cat: string) => void;
  setSelectedCollection: (col: string) => void;
  setGenderFilter: (g: GenderFilter) => void;
  setSortBy: (s: SortBy) => void;
  setInStockOnly: (v: boolean) => void;
  setCurrentPage: (p: number) => void;
  resetFilters: () => void;

  // Cart actions
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
  setCartOpen: (open: boolean) => void;
  getCartCount: () => number;
  getCartTotal: () => number;

  // Wishlist actions
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  getWishlistProducts: () => typeof allProductsData;
  getWishlistCount: () => number;

  // Quick view
  setQuickViewId: (id: string | null) => void;

  // Derived
  getFilteredProducts: () => typeof allProductsData;
  getTotalPages: (perPage: number) => number;
  getAllAccessoryTypes: () => (AccessoryType | "All")[];
  getAllCategories: () => string[];
  getAllCollections: () => string[];
  hasActiveFilters: () => boolean;
}

const defaultFilters = {
  searchQuery: "",
  selectedAccessoryType: "All" as AccessoryType | "All",
  selectedCategory: "All",
  selectedCollection: "All",
  genderFilter: "all" as GenderFilter,
  sortBy: "featured" as SortBy,
  inStockOnly: false,
  currentPage: 1,
};

export const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      allProducts: allProductsData,
      ...defaultFilters,
      cart: [],
      cartOpen: false,
      wishlist: [],
      quickViewId: null,

      setSearchQuery: (q) => set({ searchQuery: q, currentPage: 1 }),
      setSelectedAccessoryType: (type) => set({ selectedAccessoryType: type, selectedCategory: "All", currentPage: 1 }),
      setSelectedCategory: (cat) => set({ selectedCategory: cat, currentPage: 1 }),
      setSelectedCollection: (col) => set({ selectedCollection: col, currentPage: 1 }),
      setGenderFilter: (g) => set({ genderFilter: g, currentPage: 1 }),
      setSortBy: (s) => set({ sortBy: s }),
      setInStockOnly: (v) => set({ inStockOnly: v, currentPage: 1 }),
      setCurrentPage: (p) => set({ currentPage: p }),
      resetFilters: () => set(defaultFilters),

      addToCart: (productId) => {
        const { cart, allProducts } = get();
        const stock = allProducts.find((p) => p.id === productId)?.stock ?? Infinity;
        if (stock <= 0) return;
        const existing = cart.find((i) => i.productId === productId);
        if (existing) {
          if (existing.quantity < stock) {
            set({ cart: cart.map((i) => i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i) });
          }
        } else {
          set({ cart: [...cart, { productId, quantity: 1 }] });
        }
        set({ cartOpen: true });
      },
      removeFromCart: (productId) =>
        set({ cart: get().cart.filter((i) => i.productId !== productId) }),
      updateQuantity: (productId, qty) => {
        if (qty < 1) { get().removeFromCart(productId); return; }
        const { allProducts } = get();
        const stock = allProducts.find((p) => p.id === productId)?.stock ?? Infinity;
        const cappedQty = Math.min(qty, stock);
        set({ cart: get().cart.map((i) => i.productId === productId ? { ...i, quantity: cappedQty } : i) });
      },
      clearCart: () => set({ cart: [] }),
      setCartOpen: (open) => set({ cartOpen: open }),
      getCartCount: () => get().cart.reduce((sum, i) => sum + i.quantity, 0),
      getCartTotal: () => {
        const { cart, allProducts } = get();
        return cart.reduce((sum, item) => {
          const p = allProducts.find((p) => p.id === item.productId);
          return sum + (p ? p.price * item.quantity : 0);
        }, 0);
      },

      toggleWishlist: (productId) => {
        const { wishlist } = get();
        set({
          wishlist: wishlist.includes(productId)
            ? wishlist.filter((id) => id !== productId)
            : [...wishlist, productId],
        });
      },
      isWishlisted: (productId) => get().wishlist.includes(productId),
      getWishlistProducts: () => {
        const { wishlist, allProducts } = get();
        return allProducts.filter((p) => wishlist.includes(p.id));
      },
      getWishlistCount: () => get().wishlist.length,

      setQuickViewId: (id) => set({ quickViewId: id }),

      getFilteredProducts: () => {
        const { allProducts, searchQuery, selectedAccessoryType, selectedCategory, selectedCollection, genderFilter, sortBy, inStockOnly } = get();
        return allProducts
          .filter((p) => {
            const matchSearch =
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.collection.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.subcategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchAccessoryType = selectedAccessoryType === "All" || p.accessoryType === selectedAccessoryType;
            const matchCategory = selectedCategory === "All" || p.subcategory === selectedCategory;
            const matchCollection = selectedCollection === "All" || p.collection === selectedCollection;
            const matchGender = genderFilter === "all" || p.gender === genderFilter || p.gender === "unisex";
            const matchStock = inStockOnly ? p.inStock : true;
            return matchSearch && matchAccessoryType && matchCategory && matchCollection && matchGender && matchStock;
          })
          .sort((a, b) => {
            if (sortBy === "price-asc") return a.price - b.price;
            if (sortBy === "price-desc") return b.price - a.price;
            if (sortBy === "name") return a.name.localeCompare(b.name);
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return 0;
          });
      },

      getTotalPages: (perPage) => Math.ceil(get().getFilteredProducts().length / perPage),
      getAllAccessoryTypes: () => ["All", ...Array.from(new Set(get().allProducts.map((p) => p.accessoryType)))],
      getAllCategories: () => {
        const { allProducts, selectedAccessoryType } = get();
        const scoped = selectedAccessoryType === "All" ? allProducts : allProducts.filter((p) => p.accessoryType === selectedAccessoryType);
        return ["All", ...Array.from(new Set(scoped.map((p) => p.subcategory)))];
      },
      getAllCollections: () => ["All", ...Array.from(new Set(get().allProducts.map((p) => p.collection)))],
      hasActiveFilters: () => {
        const { searchQuery, selectedAccessoryType, selectedCategory, selectedCollection, genderFilter, inStockOnly } = get();
        return searchQuery !== "" || selectedAccessoryType !== "All" || selectedCategory !== "All" || selectedCollection !== "All" || genderFilter !== "all" || inStockOnly;
      },
    }),
    {
      name: "mipador-store",
      partialize: (state) => ({ cart: state.cart, wishlist: state.wishlist }),
    }
  )
);
