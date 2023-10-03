interface Product {
    id: string,
    storeID: string
    categoryID: string
    sizeID: string
    colorID: string
    name: string
    isFeatured: boolean
    isArchived: boolean
    createdAt: Date
    updatedAt: Date
    price: number
}