    import { createContext, useContext, useEffect, useState } from "react";

    const WishlistContext = createContext();

    export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        const data = localStorage.getItem('wishlist'); // Ensure the localStorage key matches
        if (data) setWishlist(JSON.parse(data));
    }, []);
    
    return (
        <WishlistContext.Provider value={{ wishlist }}>
        {children}
        </WishlistContext.Provider>
    );
    };
    
    export const useWishlist = () => useContext(WishlistContext);
