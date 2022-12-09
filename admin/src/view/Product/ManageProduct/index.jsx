import React from 'react';

import { Route, Switch, useRouteMatch } from 'react-router';
import Header from '../../../components/Header';

import EditProduct from '../EditProduct';
import ContentManageProduct from '../ContentManageProduct';

const ManageProduct = () => {
    const match = useRouteMatch();
    return (
            <Switch>
                <Route path={match.url+'/:id'}>
                    <Header title="Quản lý sản phẩm"/> 
                    <EditProduct/>
                </Route>
                <Route path={match.url}>
                    <Header title="Quản lý sản phẩm"/> 
                    <ContentManageProduct/>
                </Route>
            </Switch>
    );
};

export default ManageProduct;