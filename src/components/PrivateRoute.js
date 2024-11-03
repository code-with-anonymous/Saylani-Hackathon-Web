import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Adjust import as needed
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { currentUser, loading } = useAuth();
  const [isSeller, setIsSeller] = React.useState(true);
  const location = useLocation();

  React.useEffect(() => {
    const checkUserRole = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists) {
            const userRole = userDoc.data().role;
            console.log('User Role:', userRole); // Debugging log
            if (userRole === 'seller') {
              setIsSeller(true);
            } else {
              setIsSeller(false);
            }
          } else {
            console.error('User document does not exist.');
            setIsSeller(false);
          }
        } catch (error) {
          console.error("Error checking user role: ", error);
          setIsSeller(false);
        }
      } else {
        setIsSeller(false);
      }
    };

    checkUserRole();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking authentication
  }

  if (currentUser && isSeller) {
    return Component;
  } else {
    // Redirect to /access-denied with the current location as state
    return <Navigate to="/access-denied" state={{ from: location }} />;
  }
};

export default PrivateRoute;

