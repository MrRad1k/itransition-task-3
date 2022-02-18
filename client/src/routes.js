import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom'
import AuthPage from "./pages/AuthPage/AuthPage";
import MainPage from "./pages/MainPage/MainPage.jsx";


export const useRoutes = (isLogin) => {
    if (isLogin) {
        return (
            <Switch>
                <Route path="/" exact component={MainPage}/>
                <Redirect to="/"  />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/login" exact component={AuthPage}  />
            <Redirect to="/login"/>
        </Switch>
    )
}