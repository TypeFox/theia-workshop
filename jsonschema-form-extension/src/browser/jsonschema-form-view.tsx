import * as React from "react";

export interface Greeting {
    name: string
    at: string
}
export class GreetingView extends React.Component<Greeting> {
    render(): JSX.Element {
        return <h1>Hello {this.props.name} at {this.props.at}!</h1>;
    }
}

export class JsonschemaFormView extends React.Component<{}, Greeting> {

    constructor(props: {}) {
        super(props);
        this.state = {
            name: 'World',
            at: 'Theia Workshop'
        }
    }

    render(): JSX.Element {
        return <React.Fragment>
            <GreetingView name={this.state.name} at={this.state.at} />
            Greet <input value={this.state.name} onChange={this.updateName} /> at <input value={this.state.at} onChange={this.updateAt} />
        </React.Fragment>;
    }

    protected updateName = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({
        name: e.currentTarget.value
    });

    protected updateAt = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({
        at: e.currentTarget.value
    });

}

