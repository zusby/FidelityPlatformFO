import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import App from "../App.jsx";
import UsersList from "../routes/users-list.jsx";
import DefaultHeader from "../header.jsx";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/UsersList">
                <UsersList/>
            </ComponentPreview>
            <ComponentPreview path="/DefaultHeader">
                <DefaultHeader/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews