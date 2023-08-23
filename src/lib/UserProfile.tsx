interface UserProfile{
    name: string,
    surname: string,
    birthDate: Date,
    telephoneNumber: string,
    address: {
        street: string,
        zipCode: string,
        province: string,
        city: string,
    },
    email: string,
    rank: "CUSTOMER",
    id: string,
}