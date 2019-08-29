import React from 'react';
import './App.css';

export default class ImageSelector extends React.Component {

    onImageSelectChange = null;
    state = {
        images: [],
    };

    loadProps = props => {
        const {images = [], value = [], onImageSelectChange} = props;

        const selectIds = value.map(item => item.id);

        images.forEach(image => image.checked = selectIds.includes(image.id));

        console.log("000000000", JSON.stringify(props));
        this.onImageSelectChange = onImageSelectChange;
        this.setState({
            images,
        });
    };

    handleChange = (id, checked) => {
        const {images = []} = this.state;
        const changeItems = images.filter(item => item.id === id);
        if (changeItems.length > 0) {
            const changeItem = changeItems[0];
            changeItem.checked = checked;
            this.setState({
                images
            });
            if (this.onImageSelectChange) {
                this.onImageSelectChange(images);
            }
        }
    };

    componentWillMount() {
        this.loadProps(this.props);
    }

    componentWillReceiveProps(props) {
        this.loadProps(props);
    }

    render() {
        const {images = []} = this.state;
        const items = images.map(image => {
            const {id, name, url, checked} = image;
            return <div>
                <img src={url}/>
                <input type={"checkbox"}
                       defaultChecked={checked}
                       onChange={e => this.handleChange(id, e.target.checked)}/>
                <span>{name}</span>
                <hr/>
            </div>
        });
        return (
            <div>
                {items}
            </div>
        )
    }
}
