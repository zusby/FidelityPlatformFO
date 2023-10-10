/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { User, onAuthStateChanged } from "firebase/auth";
import { Auth } from '@/lib/FireBase';
import { Progress } from '../ui/progress';
import LoginPage from './LoginPage';


interface IProps {
    children: React.ReactNode
}

interface IState {
    user: User | null,
    logged: boolean,
    loading: boolean,
}


class Protected extends React.Component<IProps, IState> {
    removeListener: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            user: null,
            logged: false,
            loading: true,
        };
    }

    

    componentDidMount() {
        this.removeListener = onAuthStateChanged(Auth, (user) => {
            if (user) {
                this.setState({ logged: true, loading: false, user: user });
            } else {
                this.setState({ logged: false, loading: false, user: null })
            }
        })
    }

    componentWillUnmount() {
        this.removeListener();
    }

    render() {
        if (this.state.loading) {
            const progressValue = this.state.loading ? 0 : 100;
            return (
                <>
                    <Progress value={progressValue} max={100}>
                        <Progress style={{ height: '4px' }}>
                            <Progress style={{ backgroundColor: 'var(--accent)' }} />
                        </Progress>
                    </Progress>
                </>);
        }

        if (!this.state.logged) {
            return <LoginPage />
        }
        return this.props.children;
    }
}
export default Protected;