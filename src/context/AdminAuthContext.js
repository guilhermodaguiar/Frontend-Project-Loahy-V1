import React, {createContext, useState} from "react";

export const AdminAuthContext = createContext({

});

function AdminAuthProvider({children}) {
    const [adminAuth, setAdminAuth] = useState(false);

    function authUser() {
        setAdminAuth(adminAuth);
    }

    const data = {
        userAdmin: authUser,
    }

    return(
        <AdminAuthContext.Provider value={data}>
            {children}
        </AdminAuthContext.Provider>
    )
}

export default AdminAuthProvider;