import React from 'react';
import './App.css';
import ImageSelector from "./ImageSelector";

const IMAGES = [
    {
        id: '1',
        name: 'foo',
        url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ'
    },
    {
        id: '2',
        name: 'foo',
        url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ'
    },
    {
        id: '3',
        name: 'foo',
        url: 'https://gw.alipayobjects.com/mdn/rms_d212b7/afts/img/A*LlfeSa8N0WgAAAAAAAAAAABkARQnAQ'
    },
];

export default class App extends React.Component {
    onImageSelectChange = values => {
        console.log("onChange", values.map(item => item.checked).join(", "));
    };

    render() {
        const value = [IMAGES[0], IMAGES[2]];
        return (
            <div>
                <ImageSelector images={IMAGES} value={value} onImageSelectChange={this.onImageSelectChange}/>
            </div>
        )
    }
}
