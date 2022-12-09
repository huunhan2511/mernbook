import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import Header from "../../../components/Header";
import ContentManageOrder from '../ContentManageOrder';
import OrderDetail from '../OrderDetail';
export default function ManageOrder() {
    const match = useRouteMatch();
    return (
            <Switch>
                <Route path={match.url+'/:id'}>
                    <Header title="Quản lý đơn hàng"/> 
                    <OrderDetail/>
                </Route>
                <Route path={match.url}>
                    <Header title="Quản lý đơn hàng"/> 
                    <ContentManageOrder/>
                </Route>
            </Switch>
    )
}
