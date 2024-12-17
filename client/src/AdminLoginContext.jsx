import React, { createContext, useState } from 'react';

const AdminLoginContext = createContext();

export const AdminLoginContextProvider = ({ children }) => {

    const [isAdminLogin, setIsAdminLogin] = useState(false);

    return (
        <AdminLoginContext.Provider value={{ isAdminLogin, setIsAdminLogin }}>
            {children}
        </AdminLoginContext.Provider>
    );
};

export default AdminLoginContext;
