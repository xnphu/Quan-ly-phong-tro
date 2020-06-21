import AsyncStorage from '@react-native-community/async-storage';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { persistReducer } from 'redux-persist';

import token from './token';

const config = {
    key: 'QuanLyPhongTro',
    timeout: 30000,
    storage: AsyncStorage,
    whitelist: ['token'],
    // blacklist: ['form','tokenReducer']
};

const reducers = combineReducers({
    token,
});

export default persistReducer(config, reducers);