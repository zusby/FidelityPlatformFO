interface Store{
    id: string;
    vatNumber: string;
    name: string;
    shopOwners: string[];
    prizes?: {
      awards: [];
    };
    space: {
      description: string;
      shopTelephoneNumber: string;
      shopAddress: {
        street: string;
        zipCode: string;
        city: string;
        province: string;
      };
      email: string;
    };
    catalogue?: {
      catalogue?: [];
    };
    employees?: string[];
  }
  