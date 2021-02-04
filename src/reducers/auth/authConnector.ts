import {connect} from 'react-redux';

import {AuthProps} from '../../models/AuthProps';
import {AuthState} from '../../models/AuthState';

import {signIn, signOut} from './actions';

const mapDispatchToProps: AuthProps = {
  signIn,
  signOut,
};

const mapStateToProps = (state: AuthState) => ({
  state,
});

const provideAuthProps = connect(mapStateToProps, mapDispatchToProps);

export default provideAuthProps;
