import React from 'react';
import './App.css';
import './ImageSelector.css';

export default class ImageSelector extends React.Component {

    onImageSelectChange = null;
    state = {
        images: [],
        num: 2
    };

    loadProps = props => {
        const {images = [], value = [], onImageSelectChange} = props;

        const selectIds = value.map(item => item.id);

        images.forEach(image => image.checked = selectIds.includes(image.id));

        // console.log("000000000", JSON.stringify(props));
        this.onImageSelectChange = onImageSelectChange;
        this.setState({
            images,
        });
    };

    handleChange = (e, id) => {
        const {images = []} = this.state;
        const changeItems = images.filter(item => item.id === id);
        if (changeItems.length > 0) {
            const changeItem = changeItems[0];
            changeItem.checked = !changeItem.checked;
            this.setState({
                images
            },() => {
                const num = images.filter(item => item.checked === true).length;
                console.log("选中数", num);
                this.setState({
                    num
                })
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

    onCheckAllChange(e) {
        let {images = [], checkAll} = this.state;
        // console.log(images.map(item => item.checked).join(", "));
        const currentIsCheckAll = images.every(item => item.checked);
        if (currentIsCheckAll) {
            images = images.map(item => ({...item, checked: false}));
        } else {
            images = images.map(item => ({...item, checked: true}));
        }
        console.log(images.map(item => item.checked).join(", "));
        this.setState({images},() => {
            const num = images.filter(item => item.checked === true).length;
            console.log("allChange选中数", num);
            this.setState({
                num
            })
        });
    }

    render() {
        const {images = [], num} = this.state;
        const checkAll = images.every(item => item.checked);
        const items = images.map(image => {
            const {id, name, url, checked} = image;
            return <div className={"cell"}>
                <input type={"checkbox"}
                       className={"checkbox"}
                       checked={checked}
                       onChange={e => this.handleChange(e, id)}/>
                <div className={"ver-center"}>
                    <img src={url}/>
                    <div className={"name"}>{name}</div>
                </div>
            </div>
        });
        return (
            <div>
                <input type={'checkbox'} checked={checkAll} onChange={this.onCheckAllChange.bind(this)} />已选中{num}个文件
                <div className={"checkAll"}>
                    {items}
                </div>
            </div>
        )
    }
}
