import React, { createContext, useState } from 'react';

// AuthContext definition
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, role: null });
  const [employee, setEmployee] = useState([]);

  return (
    <AuthContext.Provider value={{ auth, setAuth ,employee, setEmployee}}>
      {children}
    </AuthContext.Provider>
  );
};



export default AuthProvider;
// // EmployeeContext definition
// export const EmployeeContext = createContext();

// export const EmployeeProvider = ({ children }) => {
//   const [employees, setEmployees] = useState([]);

//   return (
//     <EmployeeContext.Provider value={{ employees, setEmployees }}>
//       {children}
//     </EmployeeContext.Provider>
//   );
// };

// Combine the providers
// const CombinedProvider = ({ children }) => {
//   return (
//     <AuthProvider>
//       <EmployeeProvider>
//         {children}
//       </EmployeeProvider>
//     </AuthProvider>
//   );
// };

