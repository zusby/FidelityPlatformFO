const base_url = import.meta.env.VITE_BACKEND_URL;

export const getProduct = async (productID: string) => {
    try {
        const response = await fetch(base_url + `product/${productID}`);
        const data = await response.json();
        return data;
    } catch (error) {

        console.error("Error fetching total revenue:", error);
        throw error;
    }
}

export const getAllPaidOrderItems = async (storeID: string) => {
    try {
        const response = await fetch(base_url + `order/${storeID}/paid/all`);
        const data = await response.json();
        return data;
    } catch (error) {

        console.error("Error fetching total revenue:", error);
        throw error;
    }
}
export const getTotalRevenue = async (storeID: string) => {
    try {
        const response = await fetch(base_url + `order/${storeID}/revenue/all`);
        const data = await response.json();
        return data;
    } catch (error) {

        console.error("Error fetching total revenue:", error);
        throw error;
    }
}
export const getListedProducts = async (storeID: string) => {
    try {
        const response = await fetch(base_url + `product/${storeID}/available/all`);
        const data = await response.json();
        return data;
    } catch (error) {

        console.error("Error fetching listed products:", error);
        throw error;
    }
}
export const getArchivedProducts = async (storeID: string) => {
    try {
        const response = await fetch(base_url + `product/${storeID}/archived/all`);
        const data = await response.json();
        return data;
    } catch (error) {

        console.error("Error fetching archived products:", error);
        throw error;
    }
}