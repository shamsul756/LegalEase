import { roleValidator } from "@/lib/api/session";


const GuestLayout = async ({ children }) => {
    await roleValidator("guest")
    return children
};

export default GuestLayout;