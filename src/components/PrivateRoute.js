/* eslint-disable arrow-body-style */
import React from 'react'
import { Redirect, Route } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../context/profile.context';





const PrivateRoute = ({ children, ...routeProps}) => {
    const { profile, isLoading } = useProfile();

// if isloading and no profile then loading occured
    if(isLoading && !profile){
        return <Container>
            <Loader 
            center 
            vertical 
            size = "md" 
            content = "Loading"
             speed = "slow" />
        </Container>
    }

    // if we have no profile and no loading process then redirect to signin page
    if(!profile && !isLoading){
        return <Redirect to = "/signin" />;
    }
    return (
       <Route {...routeProps}>{children}</Route> 
    )
}

export default PrivateRoute
