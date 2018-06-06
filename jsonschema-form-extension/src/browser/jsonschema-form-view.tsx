import * as React from "react";

export interface Greeting {
    name: string
}
export class GreetingView extends React.Component<Greeting> {
    render(): JSX.Element {
        return <h1>Hello {this.props.name} at EclipseCon France 2018!</h1>;
    }
}

export class JsonschemaFormView extends React.Component<{}, Greeting> {

    constructor(props: {}) {
        super(props);
        this.state = {
            name: 'World'
        }
    }

    render(): JSX.Element {
        return <React.Fragment>
            <GreetingView name={this.state.name} />
            Greet <input value={this.state.name} onChange={this.updateName} />
        </React.Fragment>;
    }

    protected updateName = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({
        name: e.currentTarget.value
    });

}

