class Answer extends React.Component {

    render() {
        const { answer } = this.props

        return (
            <div className={this.props.selected ? "answer selected" : "answer"}
             onClick={() => this.props.clicked(answer)}>
            </div>
        )
    }
}

export default Answer