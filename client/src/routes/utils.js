class ButtonClick extends React.Component{
    state = { redirect: null };
    handleClick() {
        let redirect = this.state.redirect;
        redirect = this.props.chemin;
        this.setState({redirect: redirect});
    }
    render() {
        if (this.state.redirect) {
        return <Navigate to={this.state.redirect} />
        }
        return(
        <button id={this.props.idbtn} onClick={() => this.handleClick()}>
            <Icon icon={this.props.iconbtn}/>
        </button>
        );
    }
}